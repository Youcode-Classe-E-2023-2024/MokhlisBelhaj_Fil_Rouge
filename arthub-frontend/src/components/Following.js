import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
const Unfollower = (followerId) => {
    console.log(followerId);
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

    },{
        name: 'Unfollowe',
        // button: true,
        cell: row => (
            <button onClick={() => Unfollower(row.id)} className='text-red-500'>Unfollower</button>
        ),
    },
];

const userData = [
    {
        id: 1,
        name: 'Alice Johnson'
    },
    {
        id: 2,
        name: 'Bob Smith'
    }
    // Add more user data here
];

export default function Following() {
    const [searchTerm, setSearchTerm] = useState('');
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
        </div>
    );
};
