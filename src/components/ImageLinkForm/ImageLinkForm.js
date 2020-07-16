import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange, onPushUrl, onRefresh}) =>{
	return(
		<div className="">
			<p className="f3">
				This Magic Brain will detect faces in your picture. Give it a try.
			</p>
			<div className="center">
				<div className="center form pa4 br3 shadow-5">
					<input 
						id="url-input"
						className="f4 pa2 w-60 center" 
						type="text" 
						placeholder="image URL"
						onChange={onInputChange}
						/>
					<button 
						className="w-20 grow f4 link ph3 pv2 dib white bg-light-purple"
						onClick={onPushUrl}
						>Detect</button>
					<button 
						className="w-20 grow f4 link ph3 pv2 dib white bg-light-blue"
						onClick={onRefresh}
						>Refresh</button>	
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;