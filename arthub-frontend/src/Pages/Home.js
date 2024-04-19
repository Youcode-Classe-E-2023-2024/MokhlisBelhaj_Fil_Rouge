// Pages/Home.js
import React from 'react';
import Carousel from '../components/Carousel';
import Filter from '../components/Filter';
import ArtistsSlide from '../components/ArtistsSlide';
import ArticleSection from '../components/ArticleSection';
import { Link } from 'react-router-dom';



export default function Home ()  {
  return (
    <div>
        <Carousel/>
        <ArtistsSlide/>
        <h1 className="hero__heading">
        Explore Article
    </h1>
    <ArticleSection />
    <div className="flex justify-center">
    <Link to="/article" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
more</Link>
    </div>
    </div>
  );
};

