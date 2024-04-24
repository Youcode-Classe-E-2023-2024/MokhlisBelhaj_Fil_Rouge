import React, { useState } from 'react';
import useApiAxios from '../../config/axios';

function AddCategory({ onClose }) {
    const [CategoryName, setCategoryName] = useState('');

    const handleCategoryNameChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleAddCategory = (e) => {
        e.preventDefault();
        // Check if CategoryName is not empty
        if (CategoryName.trim() !== '') {
            // Call the API to add the Category
            useApiAxios.post('/categories', { name: CategoryName })
                .then(response => {
                    console.log('Category added successfully:', response.data);
                    onClose(); // Close the popup
                })
                .catch(error => {
                    console.error('Error adding Category:', error);
                    alert('not valide', error.error)
                });
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl">
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Add Category</h2>
                    <form onSubmit={handleAddCategory}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Category Name:</label>
                            <input
                                type="text"
                                value={CategoryName}
                                onChange={handleCategoryNameChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                
                            />
                        </div>
                        <div className="flex justify-end">
                            <button type='submit' className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">Add</button>
                            <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md">Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddCategory;
