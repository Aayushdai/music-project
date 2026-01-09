import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import BasicExample from './webpage/Navbar';
import Footer from './webpage/Footer';
import Home from './webpage/Home';
import MyProfile from './MyProfile';
import Search from './webpage/Search';

import './index.css';

function MyRoutes() {
  return (
    <BrowserRouter>
      <BasicExample />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/search" element={<Search />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default MyRoutes;
