import React from 'react';
import './Carousel.css'; // Import the CSS file with component styles

const Carousel = () => {
    return (
        <div>
            <div className="containerr">
                <div className="carouselll">
                    <div className="carouselll__face"><span></span></div>
                    <div className="carouselll__face"><span></span></div>
                    <div className="carouselll__face"><span></span></div>
                    <div className="carouselll__face"><span></span></div>
                    <div className="carouselll__face"><span></span></div>
                    <div className="carouselll__face"><span></span></div>
                    <div className="carouselll__face"><span></span></div>
                </div>
            </div>
            <div className="py-32 text-center">
                <h2 className="hero__heading">The world’s destination for artists</h2>
            </div>
            
        </div>
    );
}

export default Carousel;
