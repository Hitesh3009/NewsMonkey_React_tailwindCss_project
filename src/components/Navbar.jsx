import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
// import PropTypes from "prop-types";
export default function Navbar(props) {
    const [isDropDownOpen, setisDropDownOpen] = useState(false);
    const toggleDropdown = () => {
        setisDropDownOpen(!isDropDownOpen);
    }
    const linkClasses = (isActive, isDropdown) =>
        isActive ? (isDropdown ? 'bg-red-600 w-full block p-2 rounded cursor-pointer no-underline text-[1.12rem]' : 'bg-red-600 p-2 rounded cursor-pointer hover:underline') : 'cursor-pointer hover:underline';

    return (
        <>

            <nav className='bg-gray-600'>
                <div id='hamburger' className='flex items-center p-3 md:hidden space-x-3'>
                    <button onClick={toggleDropdown}>
                        <div className="line mt-1 border-2 border-black w-5"></div>
                        <div className="line mt-1 border-2 border-black w-5"></div>
                        <div className="line mt-1 border-2 border-black w-5"></div>
                    </button>
                    <p className='font-bold text-xl text-white'>NewsMonkey</p>
                </div>
                {
                    isDropDownOpen && (<div className='dropdown md:hidden'>
                        <ul className='bg-gray-700 text-white p-2'>
                            <li className='cursor-pointer hover:underline'><NavLink className={({ isActive }) => linkClasses(isActive, true)} to='/'>General</NavLink></li>
                            <li className='cursor-pointer hover:underline'><NavLink className={({ isActive }) => linkClasses(isActive, true)} to='/business'>Business</NavLink></li>
                            <li className='cursor-pointer hover:underline'><NavLink className={({ isActive }) => linkClasses(isActive, true)} to='/entertainment'>Entertainment</NavLink></li>
                            <li className='cursor-pointer hover:underline'><NavLink className={({ isActive }) => linkClasses(isActive, true)} to='/health'>Health</NavLink></li>
                            <li className='cursor-pointer hover:underline'><NavLink className={({ isActive }) => linkClasses(isActive, true)} to='/science'>Science</NavLink></li>
                            <li className='cursor-pointer hover:underline'><NavLink className={({ isActive }) => linkClasses(isActive, true)} to='/sports'>Sports</NavLink></li>
                            <li className='cursor-pointer hover:underline'><NavLink className={({ isActive }) => linkClasses(isActive, true)} to='/technology'>Technology</NavLink></li>
                        </ul>
                    </div>)
                }

                <ul className='hidden md:flex items-center md:space-x-2.5 lg:space-x-6 p-3 text-white lg:justify-center xl:space-x-14'>
                    <p className='font-bold text-white md:text-xl lg:text-2xl'>NewsMonkey</p>
                    <li className='cursor-pointer hover:underline'><NavLink className={({ isActive }) => linkClasses(isActive, false)} to='/'>General</NavLink></li>
                    <li className='cursor-pointer hover:underline'><NavLink className={({ isActive }) => linkClasses(isActive, false)} to='/business'>Business</NavLink></li>
                    <li className='cursor-pointer hover:underline'><NavLink className={({ isActive }) => linkClasses(isActive, false)} to='/entertainment'>Entertainment</NavLink></li>
                    <li className='cursor-pointer hover:underline'><NavLink className={({ isActive }) => linkClasses(isActive, false)} to='/health'>Health</NavLink></li>
                    <li className='cursor-pointer hover:underline'><NavLink className={({ isActive }) => linkClasses(isActive, false)} to='/science'>Science</NavLink></li>
                    <li className='cursor-pointer hover:underline'><NavLink className={({ isActive }) => linkClasses(isActive, false)} to='/sports'>Sports</NavLink></li>
                    <li className='cursor-pointer hover:underline'><NavLink className={({ isActive }) => linkClasses(isActive, false)} to='/technology'>Technology</NavLink></li>
                </ul>

            </nav>
        </>
    )
}
