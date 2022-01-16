import React from 'react'
import svg from '../assets/img/social.svg'

const Introduction = () => {
	return (
		<div className="welcome welcome--register">
			<div className="welcome__register">
				<h2 className="welcome__greet">Howdy!</h2>
				<h2 className="welcome__sub-greet">
					Join & <br/> Meet Awesome Friends</h2>
				<img src={svg} alt="social" className="welcome__social" />
			</div>
		</div>
	)
}

export default Introduction