import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react';
import Signup from './Signup';
import Signin from './Signin';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<Home />} />

      </Routes>
    </Router >
  );
}

export default App;
