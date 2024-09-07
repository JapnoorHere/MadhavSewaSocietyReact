import React, { useState } from 'react'
import { useRef } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase'
import { useDispatch } from 'react-redux';
import { login } from '../utils/userSlice';
import { setLoading } from '../utils/loadingSlice';
import { checkEmail } from '../utils/inputValidate'
import toast from 'react-hot-toast';



const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const cPasswordRef = useRef(null);

    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [cPasswordVisibility, setCPasswordVisibility] = useState(false);

    const handleFormButtonClick = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const cPassword = cPasswordRef.current.value;
        const name = nameRef.current.value;
        if (nameRef.current.value.trim() === '') {
            toast.error('Name is required');
            return;
        }
        else if (!checkEmail(email)) {
            toast.error('Email is not valid');
            return;
        }
        else if (password.length < 6) {
            toast.error('Password must be of atleast 6 characters');
            return;
        }
        else if (password !== cPassword) {
            toast.error('Password does not match');
            return;
        }

        dispatch(setLoading(true));

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                updateProfile(user, {
                    displayName: name
                }).then(() => {
                    // Profile updated!
                    dispatch(setLoading(false));
                }).catch((error) => {
                    console.log(error);

                })

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);

                if (errorCode === 'auth/email-already-in-use') {
                    dispatch(setLoading(false));
                    toast.error('Email already in use');
                    return;
                }
                else {
                    dispatch(setLoading(false));
                    toast.error('Something went wrong');
                    return;
                }
            });
    }
    return (
        <>

            <div className=' flex flex-col py-4 px-12 w-full h-full'>

                <div className='flex items-center gap-2 self-end'>
                    <p className='text-slate-400 cursor-pointer'>Already have an account?</p>
                    <button onClick={() => navigate('/auth/login')} className='border bg-white border-orange-300 rounded-3xl px-6 py-2 hover:bg-orange-300 shadow-md hover:text-white transition-all'>Login</button>
                </div>

                <h1 className='text-4xl font-bold mt-4'>Madhav Sewa Society</h1>

                <p className='text-slate-500 mt-2 transition-all'>Register your account</p>

                <form action="" className='flex flex-col gap-4 mt-8' onSubmit={((e) => e.preventDefault())}>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name" className='font-semibold'>Name</label>
                        <input type="text" id='name' ref={nameRef} className='p-2 rounded-md border focus:outline-none focus:outline-orange-300' />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email" className='font-semibold'>Email</label>
                        <input type="email" ref={emailRef} id='email' className='p-2 rounded-md border focus:outline-none focus:outline-orange-300' />
                    </div>

                    <div className='relative flex flex-col gap-2'>
                        <label htmlFor="password" className='font-semibold'>Password</label>
                        <input type={`${passwordVisibility ? 'text' : 'password'}`} ref={passwordRef} id='password' className='p-2 rounded-md border focus:outline-none focus:outline-orange-300' />

                        {passwordVisibility ? <FaEyeSlash onClick={() => setPasswordVisibility(!passwordVisibility)} className='absolute cursor-pointer self-end top-1/2 mx-4 my-2' /> : <FaEye onClick={() => setPasswordVisibility(!passwordVisibility)} className='absolute cursor-pointer self-end top-1/2 mx-4 my-2' />}

                    </div>

                    <div className='relative flex flex-col gap-2'>
                        <label htmlFor="cpassword" className='font-semibold'>Confirm Password</label>
                        <input type={`${cPasswordVisibility ? 'text' : 'password'}`} ref={cPasswordRef} id='cpassword' className='p-2 rounded-md border focus:outline-none focus:outline-orange-300' />

                        {cPasswordVisibility ? <FaEyeSlash onClick={() => setCPasswordVisibility(!cPasswordVisibility)} className='absolute cursor-pointer self-end top-1/2 mx-4 my-2' /> : <FaEye onClick={() => setCPasswordVisibility(!cPasswordVisibility)} className='absolute cursor-pointer self-end top-1/2 mx-4 my-2' />}

                    </div>

                    <button onClick={handleFormButtonClick} className='mt-3 border w-1/2 self-center text-white bg-orange-300 rounded-md px-6 py-3 hover:bg-opacity-80 transition-all shadow-md'>Signup</button>

                    <div className='flex items-center gap-2'>
                        <p className='text-slate-400 cursor-pointer hover:text-slate-500 transition-all'>Create account with</p>
                        <button className='border text-white bg-red-600 rounded-3xl px-6 py-2 hover:bg-opacity-90 shadow-md transition-all'>Google</button>
                    </div>

                </form>

            </div>
        </>
    )
}

export default Signup
