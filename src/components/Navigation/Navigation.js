import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) =>{

	if(isSignedIn){
		return(
			<div style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign Out</p>
			</div>
		);
	}
	return(
			<div style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign In</p>
				<p onClick={() => onRouteChange('Register')} className="f3 link dim black underline pa3 pointer">Register</p>
			</div>
		);
}

export default Navigation;