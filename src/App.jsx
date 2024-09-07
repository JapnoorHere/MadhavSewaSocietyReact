import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Authentication from './components/Authentication'
import Home from './components/Home'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './utils/firebase';
import { useDispatch } from 'react-redux';
import { logout } from './utils/userSlice';
import Header from './components/Header';

const App = () => {

    

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/auth/*' element={<Authentication />} />
                    <Route path='/home' element={<Home />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
