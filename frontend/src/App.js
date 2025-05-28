import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react';
import Signup from './Signup';
import Signin from './Signin';
import Home from './Home';
import ForgetPassword from './ForgetPasswrod';
import ResetPassword from './ResetPassword';

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

      </Routes>
    </Router >
  );
}

export default App;
