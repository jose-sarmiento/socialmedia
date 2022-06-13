import React from 'react';
import {Introduction, Signup} from '../../components';

function RegisterScreen() {
  return (
    <div className="auth">
      <div className="auth-wrapper auth-wrapper--register">
        <Introduction />
        <Signup />
      </div>
    </div>
  );
}

export default RegisterScreen;
