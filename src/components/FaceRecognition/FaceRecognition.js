import React from 'react';
import './FaceRecognition.css';
import Describe from './Describe';

const FaceRecognition = ({imageUrl, box}) =>{
	return(
		<div className="feature">
			<div style={{width:'500px', height:'500px'}}>
				<div className='absolute mt2'>
					<img id="inputImage" alt='' src={imageUrl} width="500px" height="auto"/>
					{ box.map((box,i) => {
						return(
							<div className="bounding-box" 
								style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}
								key = {i}>
							</div>
						); 
					})}
				</div>
			</div>
			<Describe numFace={box.length} 
					imageUrl={imageUrl} 
					box={box}
			/>
		</div>
	);
}

export default FaceRecognition;