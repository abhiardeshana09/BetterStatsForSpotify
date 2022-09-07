import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import qs from 'query-string';
import { loginUser } from '../actions';

const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = qs.parse(window.location.search);
        if (params.code) {
            dispatch(loginUser(params.code));
        } else {
            navigate('/');
        }
    }, []);

    return null;
}

export default Auth;