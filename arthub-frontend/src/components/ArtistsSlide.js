import React from 'react';
import "./ArtistsSlide.css";
import { Link } from 'react-router-dom';

const ArtistsSlide = () => {
    // Generate an array of numbers from 0 to 9
    const slides = Array.from({ length: 5 }, (_, i) => i);

    return (
        <div>
            <h1 className="hero__heading">
                Our Artists
            </h1>

            <div className="container mx-auto w-full overflow-hidden relative bg-gray-200 rounded-lg">
                <div className="carousel-items flex items-center justify-center">

                    {/* Map over the array of numbers and generate a slide for each number */}
                    {slides.map((index) => (
                        <div key={index} className="carousel-focus flex items-center flex-col relative bg-white mx-5 my-10 px-4 py-3 rounded-lg shadow-lg">
                            <p className="text-teal-400 font-bold text-xl mb-3">Sup3r-Us3r</p>
                            <img className="h-16 w-16 rounded-full shadow-2xl"
                                src="https://pbs.twimg.com/profile_images/830533062807191552/TbkWKnnv_400x400.jpg" alt="Img" />
                            <p className="mt-3 text-gray-600 text-center">"Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Quod, quibusdam!"</p>
                            <Link to="/Profile"
                                className="mt-4 mb-2 bg-teal-400 rounded-full px-12 py-1 text-gray-100 font-semibold hover:bg-teal-300 focus:outline-none">profil</Link>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default ArtistsSlide;
