import React, { useState } from 'react';
import useApiAxios from '../../config/axios';

function UpdateCategory({ onClose, Categorie }) {
    const [CategoryName, setCategoryName] = useState(Categorie.name);
    
    const handleCategoryNameChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleUpdateCategory = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        // Use API to update category
        useApiAxios.put(`/categories/${Categorie.id}`, { name: CategoryName })
            .then((response) => {
                // Handle response if needed
                console.log('Category updated successfully');
                onClose(); // Close modal after successful update
            })
            .catch((error) => {
                // Handle error if needed
                console.error('Error updating category:', error);
            });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl">
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Update Category</h2>
                    <form onSubmit={handleUpdateCategory}>
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
                            <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">Close</button>
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateCategory;
