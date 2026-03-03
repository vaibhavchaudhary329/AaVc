import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import OauthRedirect from './pages/OauthRedirect';
import Home from './pages/Home/Home';
import ForgetPassword from './components/ForgetPasswrod';
import ResetPassword from './components/ResetPassword';
import EditUser from './components/EditUser';
import Product from './pages/Product/Product';
import Category from './pages/Product/Category';
import ProductDetail from './pages/Product/ProductDetail';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/home/product/:categoryId" element={<Product />} />
        <Route path="/home/search" element={<Product />} />
        <Route path="/home/productdetail" element={<ProductDetail />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/oauth2-redirect" element={<OauthRedirect />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/edituser" element={<EditUser />} /> F
      </Routes>
    </Router >
  );
}

export default App;
