import React, { useState } from 'react';
import useApiAxios from '../config/axios';

function PermissionsPopup({ onClose }) {
    const [permissionsName, setPermissionsName] = useState('');
    const [error, setError] = useState('');

    const handlePermissionsNameChange = (e) => {
        setPermissionsName(e.target.value);
        setError('');
    };

    const handleAddPermissions = (e) => {
        e.preventDefault();
        if (!permissionsName.trim()) {
            setError('Permission name cannot be empty');
            return;
        }

        useApiAxios.post('/permissions', { name: permissionsName })
            .then(response => {
                console.log('Permissions added successfully:', response.data);
                onClose(); // Close the popup
            })
            .catch(error => {
                console.error('Error adding Permissions:', error);
                setError('Error adding permissions');
            });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl">
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Add Permissions</h2>
                    <form onSubmit={handleAddPermissions}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Permissions Name:</label>
                            <input
                                type="text"
                                value={permissionsName}
                                onChange={handlePermissionsNameChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                required
                            />
                            {error && <p className="text-red-500">{error}</p>}
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

export default PermissionsPopup;