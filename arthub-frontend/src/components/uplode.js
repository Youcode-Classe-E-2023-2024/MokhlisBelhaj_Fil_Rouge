import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CloudinaryUpload from '../config/CloudinaryUpload';
import useApiAxios from '../config/axios';

function Upload() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  useEffect(() => {
    fetchCategory()
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await useApiAxios.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleUploadSuccess = (uploadedFileInfos) => {
    console.log('Files uploaded successfully:', uploadedFileInfos);
    setUploadedFiles(uploadedFileInfos);
  };

  const handleUploadError = (error) => {
    console.error('File upload error:', error);
  };

  const handleSubmit = async () => {
    const requestData = {
      title,
      description,
      category_id: selectedCategory,
      mediaData: uploadedFiles,
    };

    try {
      const response = await useApiAxios.post('/articles', requestData);
      console.log('API response:', response.data);

      // Display alert with response message
      alert(response.data.message);

      // Reset form states after successful submission
      setTitle('');
      setDescription('');
      setSelectedCategory('');
      setUploadedFiles([]);
    } catch (error) {
      console.error('API request failed:', error);
    }
  };

  return (
    <div className="mt-10 container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        New Article      </h1>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Title</label>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Description</label>
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <CloudinaryUpload
        cloudName="dgnes9vrh"
        uploadPreset="Arthub"
        onUploadSuccess={handleUploadSuccess}
        onUploadError={handleUploadError}
      />

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="p-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Upload;
