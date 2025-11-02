import React, { useState } from 'react'
import NavBar from '../Navbar/NavBar';
import Login from '../Modal/Login';
import Sell from '../Modal/Sell';
import MyAd from '../MyAd/MyAd';
import Footer from '../Footer/Footer';
import { ItemContext } from '../Context/Item';


const MyAds = () => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openSell, setOpenSell] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedAd, setSelectedAd] = useState(null);

    const itemsCtx = ItemContext();

    let toggleLoginModal = () => setOpenLogin(!openLogin);
    let toggleSellModal = () => setOpenSell(!openSell);
    let toggleEditModal = () => setOpenEdit(!openEdit);

    return (
        <div>
            <NavBar toggleLoginModal={toggleLoginModal} toggleSellModal={toggleSellModal} />
            <Login toggleLoginModal={toggleLoginModal} status={openLogin} />
            <Sell setItems={(itemsCtx).setItems} toggleSellModal={toggleSellModal} status={openSell} />
            <MyAd toggleEditModal={toggleEditModal} status={openEdit} selectedAd={selectedAd} setSelectedAd={setSelectedAd}/>
            <Footer />
        </div>
    )
}

export default MyAds
