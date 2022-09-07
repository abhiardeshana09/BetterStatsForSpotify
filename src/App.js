import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from './actions';
import Login from './components/Login';
import Auth from './components/Auth';
import Homepage from './components/Homepage';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/auth' element={<Auth/>}/>
                <Route path='/' element={<Homepage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;