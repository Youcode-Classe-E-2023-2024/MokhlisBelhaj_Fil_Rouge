import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import useApiAxios from '../config/axios';
import { useNavigate } from 'react-router-dom';





const Following = () => {
    const [userData, setUserData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const Navigate = useNavigate();
    const columns = [
       
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: (row) => row.email,
        },
        {
            name: 'Image',
            cell: (row) => (
                <img
                    src={row.imageUrl}
                    alt={row.name}
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                />
            ),
        },
        {
            name: 'Unfollow',
            cell: (row) => (
                <button
                    onClick={() => handleUnfollow(row.id)}
                    className='text-red-500'
                >
                    Unfollow
                </button>
            ),
        },
    ];

    useEffect(() => {
       

        fetchData(); // Fetch data when the component is mounted
    }, []); // Run effect only once
    const fetchData = async () => {
        try {
            const response = await useApiAxios.get('/following'); // Use correct API endpoint
            setUserData(response.data.following); // Set state with the 'following' array
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleUnfollow = (followerId) => {
        useApiAxios.post(`/users/${followerId}/unfollow`)
        .then(() => {
            fetchData()
        })
        .catch((error) => {
          console.error('Error updating following status:', error);
        });
       
    };
  
    const handleRowClick = (row) => {
       Navigate(`/Profile/${row.id}`); 
      };

    const filteredData = userData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-2xl mb-4">Following</h2>
            <div className="mb-4">
                <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                />
            </div>
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                striped
                onRowClicked={handleRowClick}
            />
        </div>
    );
};

export default Following;
