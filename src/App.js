import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';
import Particles from 'react-particles-js';



const ParticlesOptions = {
            		particles:{
            			number : {
            				value : 100,
            				density: {
            					enable: true,
            					value_area: 800
            				}
            			}
            		}
            	}

const initialState = {

	input: '',
	imageUrl:'',
	box:[],
	route:'signin',
	isSignedIn: false,
	user : {
		id:'',
		name:'',
		email:'',
		entries:0,

	}
}


class App extends Component {

	constructor(){
		super();
		this.state = initialState;
	}

	calFaceRegion = (data) =>{
		let arr = [];
		data.outputs[0].data.regions.forEach(item => {

			const face = item.region_info.bounding_box;
			const image = document.getElementById('inputImage');
			const width = Number(image.width);
			const height = Number(image.height);

			let obj =  {
				leftCol : face.left_col * width,
				topRow : face.top_row * height,
				rightCol : width - (face.right_col * width),
				bottomRow : height - (face.bottom_row * height) 
			}

			arr.push(obj);
		})
		

		
		return arr;
	}

	displayFaceBox = (box) =>{
		this.setState({box : box});
	}

	onInputChange = (event) => {
		this.setState({input:event.target.value});
	}

	onPushUrl = () => {
		this.setState({imageUrl: this.state.input});

		fetch('https://facenum.herokuapp.com/imageurl', {
			method : 'post',
			headers : {'Content-Type':'application/json'},
			body : JSON.stringify({
				input : this.state.input
			})
		})
		.then(response => response.json())
		.then(response => {
			if(response === 'bad api call'){
				//do something
			}else{
				fetch('https://facenum.herokuapp.com/image', {
				method : 'put',
				headers : {'Content-Type':'application/json'},
				body : JSON.stringify({
					id : this.state.user.id
				})
				})
				.then(res => res.json())
				.then(newEntry => {
					this.setState(Object.assign(this.state.user, {entries:newEntry}))
				})
				this.displayFaceBox(this.calFaceRegion(response))
			}
			
		})
		.catch(err => console.log(err));	    
		
	}

	onRefresh = () => {
		let input = document.getElementById("url-input")
		input.value = '';
		this.setState({
			input:'',
			imageUrl:'',
			box:[]
		});
	}

	onRouteChange = (route) => {
		if(route === 'home'){
			this.setState({isSignedIn:true})
		}else {
			this.setState(initialState)
		}
		this.setState({route:route});
	}

	onLoadData = (data) => {
		this.setState({
			user : {
				id : data.id,
				name : data.name,
				email : data.email,
				entries : data.entries

			}
		})
	}

	render(){
		const {route, isSignedIn, box, imageUrl, user} = this.state;
		return (
		    <div className="App">
		    	<Particles className="particle" params={ParticlesOptions}/>
		    	<Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>

		    	{
		    		route === 'home' 
		    		?	<div>
						    <Logo/>
						    <Rank user={user}/>
						    <ImageLinkForm 
						    	onInputChange={this.onInputChange} 
						    	onPushUrl={this.onPushUrl} 
						    	onRefresh={this.onRefresh}/>
						    <FaceRecognition box={box} imageUrl={imageUrl}/>
				    	</div>
			    	:   (
			    			route === 'signin'
			    			?	<Signin onLoadData={this.onLoadData} onRouteChange={this.onRouteChange}/>
			    			:	<Register onLoadData={this.onLoadData} onRouteChange={this.onRouteChange}/>
			    		)
				     
		    	}
		    </div>
	    );	
	}
 
}

export default App;
