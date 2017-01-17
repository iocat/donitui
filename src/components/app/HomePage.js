// @flow
import React from 'react';

import GOOGLE_SIGNIN_BUTTON from '../nav/GoogleSignInButton';

export default class HomePage extends React.Component{
    render(){
        return <div style={{height:"100vh"}}>
            {GOOGLE_SIGNIN_BUTTON}
        </div>
    }
}
