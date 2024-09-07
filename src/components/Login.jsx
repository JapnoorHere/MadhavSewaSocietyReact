import React, { useState } from 'react'
import { useRef } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from '../utils/firebase';
import { checkEmail } from '../utils/inputValidate';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login } from '../utils/userSlice';
import { setLoading } from '../utils/loadingSlice';

const Login = () => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const handleFormButtonClick = () => {
        console.log(emailRef.current.value);
        console.log(passwordRef.current.value);

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!checkEmail(email)) {
            toast.error('Email is not valid');
            return;
        }

        if (password === ''){
            toast.error('Password is required');
            return;
        }

        dispatch(setLoading(true));

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                dispatch(setLoading(false));
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if(errorCode === 'auth/invalid-credential'){
                    dispatch(setLoading(false));
                    toast.error('User not found');
                    return;
                }
                else{
                    dispatch(setLoading(false));
                    toast.error('Something went wrong');
                    return;
                }
            });
    }

    return (
        <div className=' flex flex-col py-4 px-12 w-full h-full'>

            <div className='flex items-center gap-2 self-end'>
                <p className='text-slate-400 cursor-pointer'>Don't have an account?</p>
                <button className='border bg-white border-orange-300 rounded-3xl px-6 py-2 hover:bg-orange-300 shadow-md hover:text-white transition-all' onClick={() => navigate('/auth/signup')}>Signup</button>
            </div>

            <h1 className='text-4xl font-bold mt-4'>Madhav Sewa Society</h1>

            <p className='text-slate-500 mt-2 transition-all'>Login to your account</p>

            <form action="" className='flex flex-col gap-4 mt-8' onSubmit={((e) => e.preventDefault())}>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='font-semibold'>Email</label>
                    <input type="email" ref={emailRef} id='email' className='p-2 rounded-md border focus:outline-none focus:outline-orange-300' />
                </div>

                <div className='relative flex flex-col gap-2'>
                    <label htmlFor="password" className='font-semibold'>Password</label>
                    <input type={`${passwordVisibility ? 'text' : 'password'}`} ref={passwordRef} id='password' className='p-2 rounded-md border focus:outline-none focus:outline-orange-300' />
                    {passwordVisibility ? <FaEyeSlash onClick={() => setPasswordVisibility(!passwordVisibility)} className='absolute cursor-pointer self-end top-1/2 mx-4 my-2' /> : <FaEye onClick={() => setPasswordVisibility(!passwordVisibility)} className='absolute cursor-pointer self-end top-1/2 mx-4 my-2' />}

                </div>

                <button onClick={handleFormButtonClick} className='mt-3 border w-1/2 self-center text-white bg-orange-300 rounded-md px-6 py-3 hover:bg-opacity-80 transition-all shadow-md'>Login</button>

                <div className='flex items-center gap-2 mt-4'>
                    <p className='text-slate-400 cursor-pointer hover:text-slate-500 transition-all'>Continue with</p>
                    <button className='border text-white bg-red-600 rounded-3xl px-6 py-2 hover:bg-opacity-90 shadow-md transition-all'>Google</button>
                </div>

            </form>

        </div>
    )
}

export default Login
