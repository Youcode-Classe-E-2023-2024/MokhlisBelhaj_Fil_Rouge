import React, { useContext, useState } from 'react';
import ArticleSection from './ArticleSection';
import UserContext from '../auth/user-context';

const Profile = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);

    const [articleCount, setArticleCount] = useState(0); 
    const handleArticleData = (articles) => {
        setArticleCount(articles.length); 
    };
   
        console.log(currentUser);
   
    return (
        <div className="p-16">
            
            <div className="p-8 bg-white shadow-lg rounded-xl mt-12 md:mt-24">
                <div className="grid grid-cols-1 md:grid-cols-3 items-center">
                    <div className="relative mx-auto md:mx-0 items-center ">
                        <div className="w-32 h-32 md:w-48 md:h-48 bg-indigo-100 rounded-full shadow-2xl overflow-hidden">
                            <img 
                                src={currentUser?.imageUrl || ''} 
                                className='w-full h-full object-cover' 
                                alt="User Avatar" 
                            />
                        </div>
                    </div>
                        <div className="md:text-center ml-4">
                            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
                                {currentUser?.name || 'Guest'}
                            </h1>
                            <p className="text-sm text-gray-600">{currentUser?.role || 'Role not specified'}</p>
                        </div>
                    <div className="grid grid-cols-2 gap-4 text-center  mt-8 md:mt-0">
                        <div>
                            <p className="font-bold text-gray-700 text-xl">{currentUser?.countArticles}</p>
                            <p className="text-gray-500">Articles</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700 text-xl">{currentUser?.countfollow}</p>
                            <p className="text-gray-500">Followers</p>
                        </div>
                    </div>
                </div>
            </div>
            <ArticleSection onDataFetch={handleArticleData}/>
        </div>
    );
};

export default Profile;
