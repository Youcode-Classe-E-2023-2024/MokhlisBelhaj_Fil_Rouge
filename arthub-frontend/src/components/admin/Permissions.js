import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import useApiAxios from '../../config/axios';
import PermissionsPopup from '../PermissionsPopup';

function Permissions() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddPermissions, setShowAddPermissions] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPermissions();
    }, []);

    const fetchPermissions = () => {
        setLoading(true);
        useApiAxios.get('/permissions')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const handleAddpermissionsClose = () => {
        setShowAddPermissions(false);
        fetchPermissions();
    };

    const deletePermission = (permissionId) => {
        useApiAxios.delete(`/permissions/${permissionId}`)
            .then(response => {
                console.log('Permission deleted successfully:', response.data);
                fetchPermissions();
            })
            .catch(error => {
                console.error('Error deleting permission:', error);
            });
    };

    const handleAddPermissionsClick = () => {
        setShowAddPermissions(true);
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
            name: 'Actions',
            cell: row => (
                <div className='flex'>
                    <button onClick={() => deletePermission(row.id)} className='p-2 rounded-md bg-red-500 text-white'>Delete</button>
                </div>
            ),
        },
    ];

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className='flex justify-between py-1'>
                <h2 className="text-2xl mb-4">Permissions</h2>
                <button onClick={handleAddPermissionsClick} className='bg-blue-500 text-white p-2 rounded-md mr-2'>New Permissions</button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                />
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <DataTable
                    columns={columns}
                    data={filteredData}
                    pagination
                    highlightOnHover
                    striped
                />
            )}

            {showAddPermissions && <PermissionsPopup onClose={() => handleAddpermissionsClose()} />}
        </div>
    );
}

export default Permissions;