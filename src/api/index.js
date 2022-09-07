import axios from 'axios';
import qs from 'query-string';
import config from '../config';

const accountsUrl = 'https://accounts.spotify.com/api';
const apiUrl = 'https://api.spotify.com/v1';

export const getToken = (code) => axios({
    method: 'post',
    url: `${accountsUrl}/token`,
    data: qs.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: config.redirectUri,
        client_id: config.clientId,
        client_secret: config.clientSecret
    })
});

export const getUser = (token) => axios({
    method: 'get',
    url: `${apiUrl}/me`,
    headers: {
        Authorization: `Bearer ${token}`
    } 
});

export const getTracks = (token, ids) => axios({
    method: 'get',
    url: `${apiUrl}/tracks`,
    headers: {
        Authorization: `Bearer ${token}`
    },
    params: {
        ids: ids
    }
});