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
        <div style={{ height: '90vh' }} className='d-flex flex-column justify-content-center align-items-center'>
            <h1 style={{ marginBottom: '30px' }} className='display-2'>Better Stats for Spotify</h1>
            <a href={url} className='btn btn-primary btn-lg'>Login with Spotify</a>
        </div>
    )
}

export default Login;