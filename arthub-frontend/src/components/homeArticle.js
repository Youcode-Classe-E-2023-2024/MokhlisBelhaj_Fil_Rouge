import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useApiAxios from '../config/axios';

const HomeArticle = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchArticles(); 
  }, []);

  const fetchArticles = () => {
    useApiAxios.get('/articles/home')
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => console.log(error));
  };

 

  const truncateDescription = (description) => {
    return description.length > 150 ? description.substring(0, 150) + '...' : description;
  };
  return (
<div className="flex justify-center">
  <div className="flex gap-3">
    {articles.map((article, index) => (
      <div
        key={index}
        className="w-full sm:w-64 bg-white rounded-xl shadow-lg mb-6"
      >
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
          <Link to={`/article/${article.id}`} className="block h-48">
            <img
              src={article.media[0].mediaUrl}
              className="w-full h-full object-cover"
              alt={`Article ${index}`}
            />
          </Link>
          <div className="p-4">
            <div className="flex items-center mb-4">
              <img
                src={article.user.imageUrl}
                className="rounded-full w-10 h-10 mr-2"
                alt={`Profile ${index}`}
              />
              <div>
                <Link
                  to={`/article/${article.id}`}
                  className="block text-lg font-semibold text-blue-600 hover:underline"
                >
                  {article.title}
                </Link>
                <Link
                  to={`/profile/${article.user.id}`}
                  className="text-gray-600 text-sm hover:text-gray-800"
                >
                  {article.user.name}
                </Link>
              </div>
            </div>
            <p className="text-gray-700">
              {truncateDescription(article.description)}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
     
  );
};

export default HomeArticle;
