import React, { useEffect, useState } from 'react';
import useApiAxios from '../config/axios';

const GestionRole = ({ RoleId, onClose }) => {
    console.log(RoleId);
    const [roleData, setRoleData] = useState(null);
    const [allPermissions, setAllPermissions] = useState([]);
    const [selectedPermission, setSelectedPermission] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const roleResponse = await useApiAxios.get(`/roles/${RoleId}`);
                setRoleData(roleResponse.data);

                const permissionsResponse = await useApiAxios.get(`/roles/${RoleId}/permissions`);
                setAllPermissions(permissionsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        return () => {
            // Cleanup function
        };
    }, [RoleId]);

    const removePermission = async (permissionId) => {
        try {
            await useApiAxios.delete(`/roles/${RoleId}/permissions/${permissionId}`);
            const response = await useApiAxios.get(`/roles/${RoleId}/permissions`);
            setAllPermissions(response.data);
        } catch (error) {
            console.error('Error removing permission:', error);
        }
    };

    const addPermissionToRole = async () => {
        try {
            await useApiAxios.post(`/roles/${RoleId}/permissions/${selectedPermission}`);
            const response = await useApiAxios.get(`/roles/${RoleId}/permissions`);
            setAllPermissions(response.data);
            setSelectedPermission('');
        } catch (error) {
            console.error('Error adding permission:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded-md w-96">
                <h2 className="text-lg font-semibold mb-4">Permission Management for Role ID: {RoleId}</h2>
                {roleData && (
                    <div>
                        <p className="mb-2"><strong>Role Name:</strong> {roleData.name}</p>
                        <p className="mb-2"><strong>Description:</strong> {roleData.description}</p>
                        <p className="mb-2"><strong>Permissions:</strong></p>
                        <ul className="mb-4">
                            {allPermissions.map((permission) => (
                                <li key={permission.id} className="flex items-center justify-between mb-2">
                                    <span>{permission.name}</span>
                                    <button onClick={() => removePermission(permission.id)} className="bg-red-500 text-white px-2 py-1 rounded-md">Remove</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="mb-4">
                    <label htmlFor="permissionSelect" className="block mb-2">Select Permission:</label>
                    <select id="permissionSelect" className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value={selectedPermission} onChange={(e) => setSelectedPermission(e.target.value)}>
                        <option value="" disabled>Select Permission</option>
                        {allPermissions.map((permission) => (
                            <option key={permission.id} value={permission.id}>{permission.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-between">
                    <button onClick={addPermissionToRole} className="bg-green-500 text-white px-4 py-2 rounded-md">Add Permission</button>
                    <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md">Close</button>
                </div>
            </div>
        </div>
    );
};

export default GestionRole;
