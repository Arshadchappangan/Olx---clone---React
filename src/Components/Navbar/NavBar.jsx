import React from 'react'
import './NavBar.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

// import images into variables
import logo from '../../assets/symbol.png'
import search from '../../assets/search1.svg'
import arrow from '../../assets/arrow-down.svg'
import searchwt from '../../assets/search.svg'
import addBtn from '../../assets/addButton.png'
import favorite from '../../assets/favorite.svg'
import chat from '../../assets/chat.png'
import notification from '../../assets/notification.png'
import { auth } from '../Firebase/Firebase';
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";


const NavBar = ({ toggleLoginModal, toggleSellModal }) => {

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  let handleChange = (value) => {
    if (value === 'myAds') {
      navigate('/myAds')
    } else if (value === 'logout') {
      Swal.fire({
        title: "Are you sure?",
        text: "You’ll be logged out of your account.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout",
      }).then((result) => {
        if (result.isConfirmed) {
          signOut(auth)
            .then(() => {
              Swal.fire({
                title: "Logged out!",
                text: "You have been successfully signed out.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
              setTimeout(() => navigate('/'), 1500);
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Logout Failed",
                text: error.message,
              });
            });
        }
      });
    }
  }

  return (
    <div>
      <nav className="fixed z-50 w-full overflow-auto p-2 pl-3 pr-3 shadow-md bg-slate-100 border-b-4 border-solid border-b-white">
        <img onClick={() => navigate('/')} src={logo} alt="" className='w-12 ' />
        <div className='relative location-search  ml-5'>
          <img src={search} alt="" className='absolute top-4 left-2 w-5' />
          <input placeholder='Search city, area, or locality...' className='w-[50px] sm:w-[150px] md:w-[250] lg:w-[270px] p-3 pl-8 pr-8 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300' type="text" />
          <img src={arrow} alt="" className='absolute top-4 right-3 w-5 cursor-pointer' />
        </div>

        <div className="ml-5 mr-2 relative w-3/5 main-search">
          <input placeholder='Find Cars, Mobile Phones, and More...' className='w-full p-3 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300' type="text" />
          <div style={{ backgroundColor: '#002f34' }} className="flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12">
            <img className="w-5 filter invert" src={searchwt} alt="Search Icon" />
          </div>
        </div>

        <div className="mx-1 sm:ml-5 sm:mr-5 relative lang">
          <p className="font-bold mr-3" >English</p>
          <img src={arrow} alt="" className='w-5 cursor-pointer' />
        </div>

        <div className='flex gap-2 mx-2'>
          <img className='w-5' src={favorite} alt="heart" />
          <img className='w-5' src={chat} alt="heart" />
          <img className='w-5' src={notification} alt="heart" />
        </div>

        {!user ? (
          <p onClick={toggleLoginModal} className='font-bold underline ml-5 cursor-pointer' style={{ color: '#002f34' }}>Login</p>
        ) : (
          <div className='relative'>
            <select
              onChange={(e) => handleChange(e.target.value)}
              className="appearance-none bg-transparent border border-gray-300 rounded-md px-3 py-2 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
                backgroundImage: 'none',
              }}
            >
              <option hidden value="">
                {user.displayName?.split(' ')[0] || 'User'}
              </option>
              <option value="myAds">My Ads</option>
              <option value="logout">Logout</option>
            </select>
          </div>
        )}

        <img src={addBtn}
          onClick={user ? toggleSellModal : toggleLoginModal}
          className='w-24 mx-1 sm:ml-5 sm:mr-5 shadow-xl rounded-full cursor-pointer'
          alt="" />
      </nav>
    </div>
  )
}

export default NavBar
