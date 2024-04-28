import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ArticleProfile from './ArticleProfile';
import UserContext from '../auth/user-context';
import useApiAxios from '../config/axios';
import Subscribe from './button/subscribe';

const Profile = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [articleCount, setArticleCount] = useState(0); 
  const handleArticleData = (articles) => {
      setArticleCount(articles.length); 
  };
  const { id } = useParams();
  const [user, setUser] = useState();
  useEffect(() => {
    fetchUser();
  }, [id]); 

  const fetchUser = () => {
    useApiAxios.get(`/users/${id}`)
      .then(response => {
        console.log(response);
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  return (
    <div className="min-h-screen p-16">
      <div className="p-8 bg-white shadow mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p className="font-bold text-gray-700 text-xl">{user?.Article}</p>
              <p className="text-gray-400">Articles</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">{user?.followers}</p>
              <p className="text-gray-400">followers</p>
            </div>
          </div>
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <img src={user?.imageUrl || ''} className='w-48 h-48  mx-auto rounded-full'/>
            </div>
          </div>
          {currentUser ? (
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <Subscribe id={id} />
              <button className="
                py-2 px-6 md:px-4 uppercase rounded bg-gray-200 hover:bg-gray-300 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 focus:outline-none
               
               ">Message</button>
            </div>
          ) : null}
        </div>
        <div className="mt-20 text-center  pb-12">
          <h1 className="text-4xl font-medium text-gray-700">{user?.name || ''} <span className="font-light text-gray-500">{user?.role || ''}</span></h1>
        </div>
      </div>
      <ArticleProfile id={id} onDataFetch={handleArticleData} />
    </div>
  );
};

export default Profile;