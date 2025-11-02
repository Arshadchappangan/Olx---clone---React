import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import NavBar from '../Navbar/NavBar';
import Login from '../Modal/Login';
import Sell from '../Modal/Sell';
import pin from '../../assets/pin.png'
import calendar from '../../assets/calendar.png'
import { ItemContext } from '../Context/Item';
import { userAuth } from '../Context/Auth';
import Footer from '../Footer/Footer';


const Details = () => {

  const location = useLocation();
  const { item } = location.state || {};

  const itemsCtx = ItemContext();
  const auth = userAuth();

  const [openLogin, setOpenLogin] = useState(false);
  const [openSell, setOpenSell] = useState(false);

  const toggleLoginModal = () => setOpenLogin(!openLogin);
  const toggleSellModal = () => setOpenSell(!openSell);

  let dateString = auth?.user?.metadata?.creationTime
  let date = new Date(dateString).toDateString();

  return (
    <div>
      <NavBar toggleLoginModal={toggleLoginModal} toggleSellModal={toggleSellModal} />
      <Login toggleLoginModal={toggleLoginModal} status={openLogin} />

      <div className='grid gap-0 sm:gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 p-10 px-5 sm:px-15 md:px-30 lg:px-40 pt-40'>
        <div className='border-2 w-full rounded-lg flex justify-center overflow-hidden h-96 bg-black'>
          <img className='object-cover' src={item?.imageUrl} alt={item?.title} />
        </div>

        <div className="max-h-screen bg-gray-50 p-4 md:p-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Section - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {item?.title}
                </h1>
                <div className="flex items-center text-gray-600">
                  <span className="text-sm">{item?.category}</span>
                </div>
              </div>

              {/* Overview Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Location */}
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <img className='w-6' src={pin} alt="" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Location</p>
                      <p className="text-lg font-semibold text-gray-900">{item?.location}</p>
                    </div>
                  </div>

                  {/* Posting Date */}
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <img className='w-6' src={calendar} alt="" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Posting date</p>
                      <p className="text-lg font-semibold text-gray-900">{item?.createdAt}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>

                <div className="space-y-3 text-gray-700">
                  <p className="pt-2">
                    {item?.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section - Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Price Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <div className="text-4xl font-bold text-gray-900 mb-4">₹ {item?.price}</div>

                <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-4">
                  Make offer
                </button>

                {/* Seller Info */}
                <div className="border-y pt-6">
                  <div className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="text-sm text-gray-600">Posted By</p>
                        <p className="font-semibold text-gray-900">{item?.userName}</p>
                        <p className="text-xs text-gray-500">Member since {date}</p>
                      </div>
                    </div>
                  </div>


                  <button className="w-full mt-6 border-2 border-blue-700 text-blue-700 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors">
                    Chat with seller
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      
      <Sell setItems={itemsCtx.setItems} toggleSellModal={toggleSellModal} status={openSell} />


    </div>
  )
}

export default Details
