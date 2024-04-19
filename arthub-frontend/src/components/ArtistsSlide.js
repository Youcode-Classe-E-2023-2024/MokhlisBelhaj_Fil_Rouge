import React, { useState, useEffect } from 'react';
import "./ArtistsSlide.css";
import { Link } from 'react-router-dom';
import useApiAxios from '../config/axios';


const ArtistsSlide = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        useApiAxios.get('/acteur')
            .then(response => {
                setUsers(response.data)
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1 className="hero__heading">
                Our Artists
            </h1>

            <div className="container mx-auto w-full overflow-hidden relative bg-gray-200 rounded-lg">
                <div className="carousel-items flex items-center justify-center">
                    {users.map((user, index) => (
                        <div key={index} className="carousel-focus flex items-center flex-col relative bg-white mx-5 my-10 px-4 py-3 rounded-lg shadow-lg">
                            <p className="text-teal-400 font-bold text-xl mb-3">{user.name}</p>
                            <img className="h-16 w-16 rounded-full shadow-2xl"
                                src={user.imageUrl} alt="User Profile" />
                            <p className="mt-3 text-gray-600 text-center">{user.bio}</p>
                            <Link to={`/profile/${user.id}`} className="mt-4 mb-2 bg-teal-400 rounded-full px-12 py-1 text-gray-100 font-semibold hover:bg-teal-300 focus:outline-none">
                                View Profile
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArtistsSlide;
