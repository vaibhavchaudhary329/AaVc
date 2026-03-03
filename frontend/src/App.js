import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
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
      <AppRoutes />
    </Router>
  );
}


function AppRoutes() {
  const location = useLocation();

  // Routes where header should NOT appear
  const hideHeaderRoutes = [
    "/",
    "/signin",
    "/signup",
    "/forgetpassword",
    "/auth/reset-password",
    "/oauth2-redirect",
    "/edituser"
  ];

  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);
  return (
    <>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/oauth2-redirect" element={<OauthRedirect />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/edituser" element={<EditUser />} />
        <Route path="/home" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/home/product/:categoryId" element={<Product />} />
        <Route path="/home/search" element={<Product />} />
        <Route path="/home/productdetail" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default App;
