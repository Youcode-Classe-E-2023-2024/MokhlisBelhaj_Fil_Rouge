import React, { useState, useEffect } from 'react';
import useApiAxios from '../config/axios';
import CloudinaryUpload from '../config/CloudinaryUpload';
function renameTypeKey(media) {
  return media.map(item => {
    const { type, ...rest } = item; // Extract the 'type' key and the rest of the object
    return { resourceType: type, ...rest }; // Rename 'type' to 'resourceType'
  });
}


function UpdateArticle({ onClose, article }) {
  const [articleData, setArticleData] = useState({
    title: article?.title || '',
    description: article?.description || '',
    categorie: article?.categories_id || '',
    media:  renameTypeKey(article?.media || []), // Consolidated media
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    useApiAxios
      .get('/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUploadSuccess = (uploadedFiles) => {
    setArticleData((prevState) => ({
      ...prevState,
      media: [...prevState.media, ...uploadedFiles], // Append new media
    }));
  };

  const handleRemoveMedia = (index) => {
    setArticleData((prevState) => ({
      ...prevState,
      media: prevState.media.filter((_, i) => i !== index), // Filter by index
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      title: articleData.title,
      description: articleData.description,
      category_id: articleData.categorie,
      mediaData: articleData.media, 
    };

    useApiAxios
      .put(`/articles/${article.id}`, requestData)
      .then((response) => {
        console.log('Article updated:', response.data);
        
          onClose(); 
      
      })
      .catch((error) => {
        console.error('Error updating article:', error);
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="w-full md:w-1/3 bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Update Article</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-semibold mb-2">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={articleData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-semibold mb-2">Description:</label>
            <textarea
              id="description"
              name="description"
              value={articleData.description}
              onChange={handleChange}
              className="w-full h-32 p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Media:</label>
            <div>
              <CloudinaryUpload
                cloudName="dgnes9vrh"
                uploadPreset="Arthub"
                onUploadSuccess={handleUploadSuccess}
                onUploadError={(error) => console.error('Upload error:', error)}
              />
              <div className="flex flex-wrap gap-2">
                {articleData.media.map((media, index) => (
                  <div key={index} className="relative">
                    <img
                      src={media.mediaUrl}
                      alt=""
                      className="w-32 h-32 object-cover border border-gray-300 rounded"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                      onClick={() => handleRemoveMedia(index)} // Using index for removal
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="categorie" className="block text-sm font-semibold mb-2">Category:</label>
            <select
              id="categorie"
              name="categorie"
              value={articleData.categorie}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update
            </button>
            <button
              type="button"
              class="bg-red-500 text-white px-4 py-2 rounded ml-2"
              onClick={onClose} // Close button functionality
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateArticle;
