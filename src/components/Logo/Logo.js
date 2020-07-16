import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './logo.png';

const Navigation = () =>{
	return(
		<div className="ma4 mt0">
			<Tilt className="Tilt br2 shadow-2" option={{max: 55}} style={{height: '100px', width:'100px'}}>
				<div className="tilt-inner"><img style={{height: '100px'}} alt="logo" src={brain}/></div>
			</Tilt>
		</div>
	);
}

export default Navigation;