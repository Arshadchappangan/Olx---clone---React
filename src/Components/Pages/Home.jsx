import React, { useState } from 'react'
import NavBar from '../Navbar/NavBar';
import Login from '../Modal/Login';
import Sell from '../Modal/Sell';



const Home = () => {
  const [openLogin,setOpenLogin] = useState(false);
  const [openSell,setOpenSell] = useState(false);

  let toggleLoginModal = () => setOpenLogin(!openLogin);
  let toggleSellModal = () => setOpenSell(!openSell);

  return (
    <div>
      <NavBar toggleLoginModal={toggleLoginModal} toggleSellModal={toggleSellModal} />
      <Login toggleLoginModal={toggleLoginModal} status={openLogin} />
      <Sell toggleSellModal={toggleSellModal} status={openSell} />
    </div>
  )
}

export default Home


