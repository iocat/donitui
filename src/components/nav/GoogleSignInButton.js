import React from 'react';
import { GOOGLE_CLIENT_ID } from '../../global';
import { GoogleLogin } from 'react-google-login-component';
import {RaisedButton} from 'material-ui';
class Login extends React.Component{

  responseGoogle =  (googleUser) => {
    let id_token = googleUser.getAuthResponse().id_token;
    console.log({accessToken: id_token});
    console.log(googleUser);
    //anything else you want to do(save to localStorage)...
  }

  render(){
    return (
      <div>
        <GoogleLogin socialId={ GOOGLE_CLIENT_ID }
                     class="google-login"
                     scope="profile"
                     responseHandler={this.responseGoogle}
                     buttonText={
                         <RaisedButton label="Sign In With Google"/>
                     }/>
      </div>
    );
  }
}

export default <div><Login/></div>
