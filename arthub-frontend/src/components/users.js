import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import useApiAxios from '../config/axios';
import RolePopup from './admin/RolePopup'; // Import the popup component

const Users = () => {
    const [data, setData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        useApiAxios.get('/users')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const retireUser = (userId) => {
        useApiAxios.delete(`/users/${userId}`)
            .then(response => {
                console.log('User retired successfully:', response.data);
                fetchUsers();
            })
            .catch(error => {
                console.error('Error retiring user:', error);
            });
    };

    const handleGestionRoleClick = (userId) => {
        setSelectedUserId(userId);
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        setSelectedUserId(null);
        fetchUsers();
    };


    const columns = [
        {
            name: 'ID',
            selector: row => Number(row.id),
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Image',
            cell: row => (
                <div>
                    <img src={row.imageUrl} className="w-10 h-10 rounded-full mr-2" alt={row.name} />
                </div>
            ),
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Role',
            selector: row => row.roles.join(' / '),
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <div className='flex flex-col gap-1 py-1' >
                    <button onClick={() => handleGestionRoleClick(row.id)} className='w-fitt bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out'>Manage Role</button>
                    <button onClick={() => retireUser(row.id)} className='p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition duration-300 ease-in-out'>Retire</button>
                </div>
            ),
        },
    ];

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className=" mx-auto px-4 py-8">
            <div className='flex justify-between py-1'>
                <h2 className="text-2xl mb-4">Users</h2>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                />
            </div>

            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                striped
                noHeader
            />

            {showPopup && <RolePopup userId={selectedUserId} onClose={handlePopupClose} />}

        </div>
    );
};

export default Users;
