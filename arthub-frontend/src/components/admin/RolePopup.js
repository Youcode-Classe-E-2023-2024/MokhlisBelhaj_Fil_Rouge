import React, { useEffect, useState } from 'react';
import useApiAxios from '../../config/axios';

const RolePopup = ({ userId, onClose }) => {
    const [userData, setUserData] = useState(null);
    const [allRoles, setAllRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await useApiAxios.get(`/users/${userId}`);
                setUserData(userResponse.data);
                
                const rolesResponse = await useApiAxios.get('/roles');
                setAllRoles(rolesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        return () => {
            // Cleanup function
        };
    }, [userId]);

    const removeRole = async (roleId) => {
        try {
            await useApiAxios.delete(`/users/${userId}/roles/${roleId}`);
            const response = await useApiAxios.get(`/users/${userId}`);
            setUserData(response.data);
        } catch (error) {
            console.error('Error removing role:', error);
        }
    };

    const addRoleToUser = async () => {
        try {
            await useApiAxios.post(`/users/${userId}/roles/${selectedRole}`);
            const response = await useApiAxios.get(`/users/${userId}`);
            setUserData(response.data);
            setSelectedRole('');
        } catch (error) {
            console.error('Error adding role:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded-md w-96">
                <h2 className="text-lg font-semibold mb-4">Role Management for User ID: {userId}</h2>
                {userData && (
                    <div>
                        <p className="mb-2"><strong>User Name:</strong> {userData.name}</p>
                        <p className="mb-2"><strong>User Email:</strong> {userData.email}</p>
                        <p className="mb-2"><strong>Roles:</strong></p>
                        <ul className="mb-4">
                            {userData.roles.map((role) => (
                                <li key={role.name} className="flex items-center justify-between mb-2">
                                    <span>{role.name}</span>
                                    <button onClick={() => removeRole(role.pivot.role_id)} className="bg-red-500 text-white px-2 py-1 rounded-md">Remove</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="mb-4">
                    <label htmlFor="roleSelect" className="block mb-2">Select Role:</label>
                    <select id="roleSelect" className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                        <option value="" disabled>Select Role</option>
                        {allRoles.map((role) => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-between">
                    <button onClick={addRoleToUser} className="bg-green-500 text-white px-4 py-2 rounded-md">Add Role</button>
                    <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md">Close</button>
                </div>
            </div>
        </div>
    );
};

export default RolePopup;
