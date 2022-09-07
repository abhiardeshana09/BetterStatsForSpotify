import { LOGIN_USER, GET_USER, LOGOUT_USER, LOAD_TRACKS, FILTER_TRACKS } from '../constants/actionTypes';
import * as api from '../api';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const loginUser = (code) => async (dispatch, getState) => {
    try {
        const { data } = await api.getToken(code);
        cookies.set('token', data.access_token, { path: '/', maxAge: 3600 });
        const user = await api.getUser(data.access_token);
        dispatch({ type: LOGIN_USER, payload: user.data });
        window.location = '/';
    } catch (error) {
        console.log(error);
    }
}

export const getUser = () => async (dispatch, getState) => {
    try {
        const { user } = getState();
        if (!user) {
            const token = cookies.get('token');
            if (token) {
                const { data } = await api.getUser(token);
                dispatch({ type: GET_USER, payload: data });
            } else if (window.location.pathname !== '/login' && window.location.pathname !== '/auth') {
                window.location = '/login';
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const logoutUser = () => {
    cookies.remove('token');
    return { type: LOGOUT_USER }
}

export const loadTracks = (strings) => {
    return { type: LOAD_TRACKS, payload: strings }
}

export const filterTracks = (startDate, endDate, threshold) => {
    return { type: FILTER_TRACKS, payload: { startDate, endDate, threshold } }
}