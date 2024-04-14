// Pages/Home.js
import React from 'react';
import Carousel from '../components/Carousel';
import Filter from '../components/Filter';
import ArtistsSlide from '../components/ArtistsSlide';
import ArticleSection from '../components/ArticleSection';
import { Link } from 'react-router-dom';



const Home = () => {
  return (
    <div>
        <Carousel/>
        <ArtistsSlide/>
        <h1 class="hero__heading">
        Explore Article
    </h1>
    <ArticleSection />
    <div class="flex justify-center">
    <Link to="/article" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
  Button
</Link>
    </div>
    </div>
  );
};

export default Home;
