import React, { useEffect, useState } from 'react'
import NavBar from '../Navbar/NavBar';
import Login from '../Modal/Login';
import Sell from '../Modal/Sell';
import Card from '../Card/Card';
import { ItemContext } from '../Context/Item';
import { fetchFromFirestore } from '../Firebase/Firebase';
import Footer from '../Footer/Footer';



const Home = () => {
  const [openLogin,setOpenLogin] = useState(false);
  const [openSell,setOpenSell] = useState(false);

  let toggleLoginModal = () => setOpenLogin(!openLogin);
  let toggleSellModal = () => setOpenSell(!openSell);

  let itemsCtx = ItemContext();

  useEffect(() => {
    console.log('updated items',itemsCtx.items);
  },[itemsCtx.items])

  return (
    <div>
      <NavBar toggleLoginModal={toggleLoginModal} toggleSellModal={toggleSellModal} />
      <Login toggleLoginModal={toggleLoginModal} status={openLogin} />
      <Sell setItems={(itemsCtx).setItems} toggleSellModal={toggleSellModal} status={openSell} />
      <Card items={itemsCtx.items || []}/>
      <Footer />
    </div>
  )
}

export default Home


