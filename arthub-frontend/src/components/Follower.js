import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

// Define the retireFollower function outside of the component
const retireFollower = (followerId) => {
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
    },
    {
        name: 'Retire',
        // button: true,
        cell: row => (
            <button onClick={()=> retireFollower(row.id)}  className='text-red-500'>Retire</button>
        ),
    },
];

const data = [
    {
        id: 1,
        name: 'John Doe'
    },
    {
        id: 2,
        name: 'Jane Smith'
    },
    {
        id: 3,
        name: 'Michael Johnson'
    },
    {
        id: 4,
        name: 'Emily Brown'
    },
    {
        id: 5,
        name: 'David Wilson'
    },
    {
        id: 6,
        name: 'Sarah Miller'
    },
    {
        id: 7,
        name: 'Christopher Davis'
    },
    {
        id: 8,
        name: 'Jessica Martinez'
    },
    {
        id: 9,
        name: 'Daniel Taylor'
    },
    {
        id: 10,
        name: 'Lauren Anderson'
    },
    {
        id: 11,
        name: 'John Doe'
    },
    {
        id: 12,
        name: 'Jane Smith'
    },
    {
        id: 13,
        name: 'Michael Johnson'
    },
    {
        id: 14,
        name: 'Emily Brown'
    },
    {
        id: 15,
        name: 'David Wilson'
    },
    {
        id: 16,
        name: 'Sarah Miller'
    },
    {
        id: 17,
        name: 'Christopher Davis'
    },
    {
        id: 18,
        name: 'Jessica Martinez'
    },
    {
        id: 19,
        name: 'Daniel Taylor'
    },
    {
        id: 20,
        name: 'Lauren Anderson'
    },
    {
        id: 21,
        name: 'John Doe'
    },
    {
        id: 22,
        name: 'Jane Smith'
    },
    {
        id: 23,
        name: 'Michael Johnson'
    },
    {
        id: 24,
        name: 'Emily Brown'
    },
    {
        id: 25,
        name: 'David Wilson'
    },
    {
        id: 26,
        name: 'Sarah Miller'
    },
    {
        id: 27,
        name: 'Christopher Davis'
    },
    {
        id: 28,
        name: 'Jessica Martinez'
    },
    {
        id: 29,
        name: 'Daniel Taylor'
    },
]
export default function Follower() {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8"> 
            <h2 className="text-2xl mb-4">Followers</h2>

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
