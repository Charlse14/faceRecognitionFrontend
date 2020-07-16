import React from 'react';



const Describe = ({numFace, imageUrl, box}) =>{

	if(numFace){
		return(
			<div style={{maxWidth : '400px'}}>

				<p style={{fontSize: '20px'}}>{`No. of human faces detected : ${numFace}`}</p>

				<div className="face-boxes">
				{
					box.map((box, index) => {

						let top = box.topRow;
						let bottom = box.bottomRow;
						let left = box.leftCol;
						let right =  box.rightCol;

						const image = document.getElementById('inputImage');
						const imgWidth = Number(image.width);
						const imgHeight = Number(image.height);


						let curr_size = 80;
						let blue_width = imgWidth - (right+left);
						let blue_height = imgHeight - (top+bottom);

						let bgs1 = curr_size * (imgWidth/blue_width);
						let bgs2 = curr_size * (imgHeight/blue_height);
						let bgp1 = -curr_size * (left/blue_width);
						let bgp2 = -curr_size * (top/blue_height);
                    
						return (
							<div style={{
									width: '80px', 
									height : '80px', 
									border: '2px solid black',
									backgroundImage: `url(${imageUrl})`,
									backgroundSize: `${bgs1}px ${bgs2}px`,
									backgroundPosition: `${bgp1}px ${bgp2}px`,
									backgroundRepeat: 'no-repeat'
									}}
								key={index}>
							</div>
						);
					})
				}
		
				</div>
			</div>
		);
	}
	return <div></div>
	
}

export default Describe;