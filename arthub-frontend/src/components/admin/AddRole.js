import React, { useState } from 'react';
import useApiAxios from '../../config/axios';

function AddRole({ onClose }) {
    const [roleName, setRoleName] = useState('');

    const handleRoleNameChange = (e) => {
        setRoleName(e.target.value);
    };

    const handleAddRole = (e) => {
        e.preventDefault();
        // Check if roleName is not empty
        if (roleName.trim() !== '') {
            // Call the API to add the role
            useApiAxios.post('/roles', { name: roleName })
                .then(response => {
                    console.log('Role added successfully:', response.data);
                    onClose(); // Close the popup
                })
                .catch(error => {
                    console.error('Error adding role:', error);
                    alert('not valide', error.error)
                });
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl">
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Add Role</h2>
                    <form onSubmit={handleAddRole}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Role Name:</label>
                            <input
                                type="text"
                                value={roleName}
                                onChange={handleRoleNameChange}
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

export default AddRole;
