import React, { useContext } from 'react';
import ArticleSection from './ArticleSection';
import UserContext from '../auth/user-context';

const Profile = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);

    return (
        <div className="p-16">
            <div className="p-8 bg-white shadow-lg rounded-xl mt-12 md:mt-24">
                <div className="grid grid-cols-1 md:grid-cols-3 items-center">
                    <div className="relative mx-auto md:mx-0  items-center justify-center">
                        <div className="w-32 h-32 md:w-48  md:h-48 bg-indigo-100 rounded-full shadow-2xl overflow-hidden">
                            <img src={currentUser?.imageUrl || ''} className='w-full h-full object-cover' alt="User Avatar" />
                        </div>
                        <div className="md:text-center  ml-4">
                            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">{currentUser?.name || ''}</h1>
                            <p className="text-sm text-gray-600">{currentUser?.role || ''}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center md:text-left mt-8 md:mt-0">
                        <div>
                            <p className="font-bold text-gray-700 text-xl">23</p>
                            <p className="text-gray-500">Articles</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700 text-xl">10</p>
                            <p className="text-gray-500">Followers</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center md:justify-end items-center space-y-4 md:space-y-0 mt-8 md:mt-0">
                        <button 
                        className="text-white py-2 px-6 md:px-4 uppercase rounded bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 focus:outline-none">Subscribe</button>
                        <button className=" ml-1 text-gray-800 py-2 px-6 md:px-4 uppercase rounded bg-gray-200 hover:bg-gray-300 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 focus:outline-none">Message</button>
                    </div>
                </div>
            </div>


            <ArticleSection />
        </div>
    );
};

export default Profile;
