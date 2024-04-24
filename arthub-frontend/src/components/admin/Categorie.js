import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import useApiAxios from '../../config/axios';
import AddCategory from './AddCategory';
import UpdateCategory from './UpdateCategory';




function Categorie() {
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddCategory, setShowAddCategory] = useState( false);
    const [showUpdateCategory, setShowUpdateCategory] = useState( false);


    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchCategory = () => {
        // Assuming useApiAxios is correctly configured
        useApiAxios.get('/categories')
            .then(response => {
                setData(response.data); // Assuming response contains data property
            })
            .catch(error => {
                console.error(error);
            });
    };
    const handleAddCategoryClick = () => {
        setShowAddCategory(true);
    };
    const handleAddCategoryClose = () => {
        setShowAddCategory(false);
        fetchCategory();
    };
    const handleEditeCategorieClick = (row)=>{
        setSelectedCategory(row)
        console.log(row)
        setShowUpdateCategory(true);
    }
    const handleEditeCategorieClose = ()=>{
        setShowUpdateCategory(false);
        fetchCategory();
    }
    const retireCategorie = (Id) => {
        useApiAxios.delete(`/categories/${Id}`)
            .then(response => {
                console.log('User categorie successfully:', response.data);
                fetchCategory(); 
            })
            .catch(error => {
                console.error('Error retiring categorie:', error);
            });
    };
    const columns = [
        {
            name: 'ID',
         selector: row =>Number(row.id),
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        }, {
            name: 'Actions',
            cell: row => (
                <div className='flex '>
                    <button onClick={() => handleEditeCategorieClick(row)} className='bg-green-500 text-white p-2 rounded-md mr-2'>edite Categorie</button>
                    <button onClick={() => retireCategorie(row.id)} className='p-2 rounded-md bg-red-500 text-white'>Retire</button>
 
                </div>
            ),
        },
    ];

    // Filter data based on search term
    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className='flex justify-between py-1'>
                <h2 className="text-2xl mb-4">Categories</h2>
                <button onClick={() => handleAddCategoryClick()} className='bg-blue-500 text-white p-2 rounded-md mr-2'>New Category</button> 

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
                        {showAddCategory && <AddCategory onClose={handleAddCategoryClose} />}
                        {showUpdateCategory && <UpdateCategory onClose={handleEditeCategorieClose} Categorie={selectedCategory} />}

        </div>
    );
}

export default Categorie;
