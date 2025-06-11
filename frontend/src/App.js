import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import Home from './pages/Home/Home';
import ForgetPassword from './components/ForgetPasswrod';
import ResetPassword from './components/ResetPassword';
import EditUser from './components/EditUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
         <Route path="/edituser" element={<EditUser />} />

      </Routes>
    </Router >
  );
}

export default App;
