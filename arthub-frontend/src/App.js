// App.js
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import NavBar from './components/NavBar';
import Article from './Pages/Article';  
import Artists from './Pages/Artists';
import Footer from './components/Footer';
import Profile from './Pages/ProfilePage';
import MyProfil  from './Pages/MyProfil';

const App = () => {
  return (
    <div className='bg-blue-100'>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Article" element={<Article />} />
        <Route path="/Artists" element={<Artists />} />
        <Route path= "/Profile" element={<Profile />} />
        <Route path="/Myprofile" element={<MyProfil />} />   
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
