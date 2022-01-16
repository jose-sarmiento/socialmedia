import React from 'react'
import {Introduction, Login} from '../components'

const LoginScreen = () => {

	return (
		<div className="auth">
			<div className="auth-wrapper auth-wrapper--login">
				<Introduction/>
				<Login />
			</div>
		</div>
	)
}

export default LoginScreen