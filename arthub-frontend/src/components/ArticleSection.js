import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useApiAxios from '../config/axios';
import UpdateArticle from './updateArticle';

const Article = ({ onDataFetch }) => {
  const [articles, setArticles] = useState([]);
  const [showUpdateArticle, setUpdateArticle] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);


  useEffect(() => {
    fetchArticles();
  }, []);

  const handleUpdateArticleClose = () => {
    setUpdateArticle(false);
    setSelectedArticle(null);
    fetchArticles();
  };

  const fetchArticles = () => {
    useApiAxios.get('/myArticle')
      .then((response) => {
        setArticles(response.data);
        if (onDataFetch) {
          onDataFetch(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const deleteArticle = (id) => {
    useApiAxios.delete(`/article/${id}`)
      .then((response) => {
        fetchArticles();
      })
      .catch((error) => console.log(error));
  };

  const truncateDescription = (description) => {
    if (description.length > 150) {
      return description.substring(0, 150) + '...';
    } else {
      return description;
    }
  };

  const handleUpdateClick = (article) => {
    setUpdateArticle(true);
    setSelectedArticle(article);
  };

  return (
    <div className="flex flex-wrap">
      {articles.map((article, index) => (
        <div key={index} className="  w-full md:w-1/2 lg:w-1/3 p-4">
          <div className="flex flex-col justify-between bg-white h-full rounded-lg shadow-md overflow-hidden">
          <div>
          <Link
              to={`/article/${article.id}`} className="block">
              <img
                src={article.media[0].mediaUrl}
                className="w-full h-auto max-h-[250px]"
                alt={`Article ${index}`}
              />
            </Link>
           
              <div className='p-4'> 
                <div className="flex justify-center mb-4">
                <div>
                  <Link
                    to={`/article/${article.id}`} className="block text-lg font-semibold text-blue-600 hover:underline">
                    {article.title}
                  </Link>
                </div>
              </div>
                <p className="text-gray-700">
                  {truncateDescription(article.description)}
                </p>
                </div>
          </div>

              <div className='flex justify-center  gap-2 p-3'>
                <button onClick={() => deleteArticle(article.id)} className='bg-red-600 hover:bg-red-900 hover:uppercase hover:animate-bounce text-white font-bold py-2 px-4 rounded'>
                  delete
                </button>
                <button onClick={() => handleUpdateClick(article)} className='bg-blue-600 hover:bg-blue-900 hover:uppercase hover:animate-bounce text-white font-bold py-2 px-4 rounded'>
                  update
                </button>
              </div>
            </div>

          </div>
      ))}

      {showUpdateArticle && <UpdateArticle article={selectedArticle} onClose={handleUpdateArticleClose} />}
    </div>
  );
};

export default Article;
