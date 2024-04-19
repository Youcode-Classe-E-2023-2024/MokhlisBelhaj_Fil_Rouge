import React, { useContext } from 'react';
import ArticleSection from './ArticleSection';
import UserContext from '../auth/user-context';

const Profile = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);

    return (
        <div className="p-16">
            <div className="p-8 bg-white shadow mt-24">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                        <div>
                            <p className="font-bold text-gray-700 text-xl">22</p>
                            <p className="text-gray-400">Articles</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700 text-xl">10</p>
                            <p className="text-gray-400">followers</p>
                        </div>
                        
                    </div>
                    <div className="relative mx-3">
                        <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                           
                            <img src={currentUser?.imageUrl || ''} className='w-48 h-48  mx-auto rounded-full'/>
                        </div>

                    </div>
                    <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                        <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">subscribe</button>
                        <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">Message</button>
                    </div>
                </div>
                <div className="mt-20 text-center pb-12">
                    <h1 className="text-4xl font-medium text-gray-700">{currentUser?.name || ''} <span className="font-light text-gray-500">{currentUser?.role || ''}</span></h1>                   
                </div>
               
            </div>
            <ArticleSection/>
        </div>
    );
};

export default Profile;
