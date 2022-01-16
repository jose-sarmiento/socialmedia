import React from 'react'
import Signup from '../components/Signup'
import Introduction from '../components/Introduction'

const RegisterScreen = () => {
  return (
    <div className='auth'>
      <div className='auth-wrapper auth-wrapper--register'>
        <Introduction />
        <Signup />
      </div>
    </div>
  )
}

export default RegisterScreen
