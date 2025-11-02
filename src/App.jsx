import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Pages/Home'
import Details from './Components/Details/Details'
import MyAds from './Components/Pages/MyAds'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details' element={<Details />} />
        <Route path='/myAds' element={<MyAds />} />
      </Routes>
    </>
  )
}

export default App

