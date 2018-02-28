import React from 'react';
import * as reactdux from 'react-redux';
import FloatingCard from '../utils/FloatingCard';
import getGapi from 'google-client-api';

class _LoginButton extends React.Component{
    constructor (){
        super();
        this.state = {
            signedIn: false,
        }
    }
    responseGoogle = (googleUser) => {
        this.props.onSignIn(googleUser);
    }

    googleButtonLoad = (gapi)=>{
        // gapi is available after the google API is loaded
        gapi.signin2.render('g-signin2', {
            'scope': 'profile email',
            'width': 250,
            'height': 50,
            'longtitle': true,
            'theme': 'light',
            'onsuccess': this.responseGoogle,
        });
    }
    componentDidMount(){
        getGapi(this.googleButtonLoad);
    }
    render(){
        return <FloatingCard>
                <div id="g-signin2" />
            </FloatingCard>;
    }
}

_LoginButton.propTypes = {
    onSignIn: React.PropTypes.func,
}

import * as thunks from '../../reducers/thunks';

function mapDispatch(dispatch){
    return {
        onSignIn: (googleUser) => {dispatch(thunks.login(googleUser))},
    }
}

export default reactdux.connect(null, mapDispatch)(_LoginButton)
