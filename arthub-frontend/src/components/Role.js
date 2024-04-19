import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import useApiAxios from '../config/axios';
import RolePopup from './RolePopup';
import GestionRole from './GestionRole';
import AddRole from './AddRole';

function Role() {
    const [data, setData] = useState([]);
    const [showGestionRole, setShowGestionRole] = useState(false);
    const [ShowAddRole, setShowAddRole] = useState(false);
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchRole();
    }, []);

    const fetchRole = () => {
        useApiAxios.get('/roles')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const retireRole = (RoleId) => {
        useApiAxios.delete(`/roles/${RoleId}`)
            .then(response => {
                console.log('User retired successfully:', response.data);
                fetchRole(); 
            })
            .catch(error => {
                console.error('Error retiring user:', error);
            });
    };

    const handleGestionRoleClick = (RoleId) => {
        setSelectedRoleId(RoleId);
        setShowGestionRole(true);
    };
    const handleAddRoleClick = () => {
        setShowAddRole(true);
    };

    const handleGestionRoleClose = () => {
        setShowGestionRole(false);
        setSelectedRoleId(null);
        fetchRole();

    };
    const handleAddRoleClose = () => {
        setShowAddRole(false);
        fetchRole();

    };

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
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
                <div className='flex '>
                    <button onClick={() => handleGestionRoleClick(row.id)} className='bg-green-500 text-white p-2 rounded-md mr-2'>Gestion Role</button> 
                    <button onClick={() => retireRole(row.id)} className='p-2 rounded-md bg-red-500 text-white'>Retire</button>
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
            <h2 className="text-2xl mb-4">Roles</h2>
            <button onClick={() => handleAddRoleClick()} className='bg-blue-500 text-white p-2 rounded-md mr-2'>New Role</button> 
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
            />

            {showGestionRole && <GestionRole RoleId={selectedRoleId} onClose={handleGestionRoleClose} />}
            {ShowAddRole && <AddRole RoleId={selectedRoleId} onClose={handleAddRoleClose} />}

        </div>
    );
}

export default Role