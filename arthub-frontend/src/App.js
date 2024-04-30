// App.js
import React, { useContext } from 'react';
import './App.css';
import { Routes, Route,Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import NavBar from './components/NavBar';
import Article from './Pages/Article';  
import Artists from './Pages/Artists';
import Footer from './components/Footer';
import Profile from './components/ProfilePage';
import MyProfil  from './Pages/MyProfil';
import Dashboard from './Pages/Dashboard';
import ArtistsDetail from './Pages/ArticleDetail';
const App = () => {
  return (
    <div className='bg-blue-100'>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Articles" element={<Article />} />
        <Route path="/Artists" element={<Artists />} />
        <Route path="/Article/:id" element={<ArtistsDetail />} />
        <Route path= "/Profile/:id" element={<Profile />} />
        <Route path="/Myprofile" element={<MyProfil />} />  
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
      <Footer />
    </div>
  );
};

export default App;
