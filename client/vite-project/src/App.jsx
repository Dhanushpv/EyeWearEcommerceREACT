import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BuyerPage from './Components/BuyerPage/Buyerpage';
import './Components/BuyerPage/Buyerpage.css'
import Signin from './Components/SigninPage/Signin';
import './Components/SigninPage/Signin.css'
import Login from './Components/Loginpage/Login';
import './Components/LoginPage/Login.css'
import Seller from './Components/SellerPage/Sellerpage';
import './Components/SellerPage/Sellerpage.css'
// import './App.css'


function App() {


  return (
    <>
    <Router>
      <Routes>
      <Route path={'/'} exact element={<BuyerPage />} />
      <Route path={'/BuyerPage'} exact element={<BuyerPage />} />
      <Route path={'/Signin'} exact element={<Signin />} />
      <Route path={'/Login'} exact element={<Login />} />
      <Route path={'/Seller'} exact element={<Seller />} />
      </Routes>
    </Router>
 
    </>
  )
}

export default App
