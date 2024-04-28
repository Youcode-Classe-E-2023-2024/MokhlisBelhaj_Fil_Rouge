import React, { useEffect, useState } from 'react';
import useApiAxios from '../config/axios';
import { Link } from 'react-router-dom';

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const fetchArticles = () => {
    useApiAxios.get('/articles')
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => console.log(error));
  };

  const fetchCategories = () => {
    useApiAxios.get('/categories')
      .then((response) => {
        setCategories(response.data);
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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredArticles = articles.filter(article => {
    if (searchQuery && !article.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    if (selectedCategory && article.categories_id != selectedCategory) {
      console.log(article.categories_id)
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen">
      <div className="my-4 mx-auto max-w-7xl flex justify-center items-center">
        <div className="container mx-auto bg-indigo-400 rounded-lg p-6">
          <form>
            <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-4 py-2 justify-between">
              <input
                className="text-base text-gray-800 flex-grow outline-none px-4 py-2"
                type="search"
                placeholder="Search"
                onChange={handleSearchInputChange}
                value={searchQuery}
              />
              <div className="flex items-center space-x-4">
                <select
                  className="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg"
                  onChange={handleCategoryChange}
                  value={selectedCategory}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  '>
          {filteredArticles.map((article, index) => (
            <div key={index} className="w-full sm:w-64  bg-white rounded-xl  shadow-lg mb-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                <Link
                  to={`/article/${article.id}`} className="block h-48">
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
                        to={`/article/${article.id}`} className="block text-lg font-semibold text-blue-600 hover:underline">
                        {article.title}
                      </Link>
                      <Link
                        to={`/profile/${article.user.id}`} className="text-gray-600 text-sm hover:text-gray-800">
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
    </div>
  );
};

export default Article;
