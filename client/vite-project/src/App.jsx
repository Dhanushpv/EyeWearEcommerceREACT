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
import SingleView from './Components/SingleViewPage/SingleView';
import './Components/SingleViewPage/SingleView.css'
import AcountPage from './Components/AccountPage/AcountPage';
import './Components/AccountPage/AcountPage.css'
import SellerDashboard from './Components/SellerDashboard/Sellerdasborad';

import ContactPage from './Components/ContactPage/ContactPage';
import './Components/ContactPage/ContactPage.css'
import AddressPage from './Components/AddressPage/AddressPage';
import AddProductPage from './Components/AddProductPage/AddProductPage';
import './Components/AddProductPage/AddProductPage.css'
import SellerProducts from './Components/SellerProducts/SellerProducts';
import UpdateProduct from './Components/UpdateProduct/UpdateProduct';
import AddtoCartPage from './Components/AddtoCartPage/AddtoCartPage';
import './Components/AddtoCartPage/AddtoCartPage.css'
import WishList from './Components/WishList/Wishlist';
import CheckoutPage from './Components/CheckoutPage/CheckoutPage';
import AdminPanel from './Components/AdminPanel/AdminPanel';



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
      <Route path={'/SingleView/:productId'} exact element={<SingleView />} />
      <Route path={'/AcountPage'} exact element={<AcountPage />} />
      <Route path={'/SellerDashboard'} exact element={<SellerDashboard />} />
      <Route path={'/ContactPage'} exact element={<ContactPage />} />
      <Route path={'/AddressPage'} exact element={<AddressPage />} />
      <Route path={'/AddProductPage'} exact element={<AddProductPage />} />
      <Route path={'/SellerProducts'} exact element={<SellerProducts />} />
      <Route path={'/UpdateProduct'} exact element={<UpdateProduct />} />
      <Route path={'/AddtoCartPage'} exact element={<AddtoCartPage />} />
      <Route path={'/WishList'} exact element={<WishList />} />
      <Route path={'/CheckoutPage'} exact element={<CheckoutPage />} />
      <Route path={'/AdminPanel'} exact element={<AdminPanel />} />











      </Routes>
    </Router>
 
    </>
  )
}

export default App
