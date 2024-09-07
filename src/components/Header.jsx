import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { HiOutlineXMark } from 'react-icons/hi2';
import { RxHamburgerMenu } from 'react-icons/rx'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { login, logout } from '../utils/userSlice';


const Header = () => {
    const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation()  

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties

                const uid = user.uid;
                dispatch(login({
                    name: user.displayName,
                    email: user.email,
                    uid: uid,
                }))
                navigate('/home');
                
            } else {
                // User is signed out
                // ...
                dispatch(logout())
                 if (location.pathname !== '/auth/login' && location.pathname !== '/auth/signup') {
                    navigate('/auth/login');
                }
            }
        })
    });

    return (
        <>
            <nav className=''>
                {/* Desktop Navbar */}
                <div className='w-screen h-[60px] hidden md:flex items-center px-8 justify-between bg-orange-300 fixed top-0 z-50'>
                    <h1 className='text-2xl font-bold text-white'>Madhav Sewa Society</h1>

                    <ul className='md:flex gap-8 hidden text-white text-md '>
                        <li><a href='#home'>Home</a></li>
                        <li><a href='#about'>About</a></li>
                        <li><a href='#services'>Services</a></li>
                        <li><a href='#contact'>Contact</a></li>
                    </ul>
                </div>

                {/* Mobile Navbar */}
                <div className='w-screen h-[60px] md:hidden flex items-center px-8 justify-between bg-orange-300 fixed top-0 z-50'>
                    <h1 className='text-2xl font-bold text-white'>Madhav Sewa Society</h1>

                    {isHamburgerMenuOpen ? (<HiOutlineXMark className='text-white text-2xl cursor-pointer' onClick={() => { setIsHamburgerMenuOpen(!isHamburgerMenuOpen); }} />) :
                        (
                            <RxHamburgerMenu className='text-white text-2xl cursor-pointer' onClick={() => { setIsHamburgerMenuOpen(!isHamburgerMenuOpen); }} />
                        )
                        }
                    {isHamburgerMenuOpen &&
                        <div className='fixed h-screen mt-[60px] inset-0 bg-white z-50'>
                            <ul className='flex flex-col gap-4 p-8'>
                                <li className='w-full text-xl hover:bg-slate-100 py-4 px-2 rounded-sm'><a href='#home'>Home</a></li>
                                <li className='w-full text-xl hover:bg-slate-100 py-4 px-2 rounded-sm'><a href='#about'>About</a></li>
                                <li className='w-full text-xl hover:bg-slate-100 py-4 px-2 rounded-sm'><a href='#services'>Services</a></li>
                                <li className='w-full text-xl hover:bg-slate-100 py-4 px-2 rounded-sm'><a href='#contact'>Contact</a></li>
                            </ul>
                        </div>
                    }
                </div>
            </nav>
            {/* Add some padding to the main content so that it doesn't overlap with the fixed navbar */}
            <div className='pt-[60px]'></div>
        </>
    )
}

export default Header
