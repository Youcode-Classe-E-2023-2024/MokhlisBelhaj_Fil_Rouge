// Pages/Home.js
import React from 'react';
import Carousel from '../components/Carousel';
import ArtistsSlide from '../components/ArtistsSlide';
import { Link } from 'react-router-dom';
import HomeArticle from '../components/homeArticle';



export default function Home ()  {
  return (
    <div>
        <Carousel/>
        <ArtistsSlide/>
        <h1 className="hero__heading">
        Explore Article
    </h1>
    <HomeArticle />
    <div className="flex justify-center">
    <Link to="/articles" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
more</Link>
    </div>
    </div>
  );
};

