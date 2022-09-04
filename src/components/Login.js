import React from 'react';
import qs from 'query-string';
import config from '../config';

const Login = () => {
    const url = 'https://accounts.spotify.com/authorize?' + qs.stringify({
        client_id: config.clientId,
        response_type: 'code',
        redirect_uri: config.redirectUri,
        scope: 'user-read-email user-read-private'
    });

    return (
        <a href={url}>Login</a>
    )
}

export default Login;