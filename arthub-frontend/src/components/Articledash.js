import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import useApiAxios from '../config/axios';
import { useNavigate } from 'react-router-dom';

const Articledash = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterMode, setFilterMode] = useState('all'); 
  const Navigate = useNavigate();


  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await useApiAxios.get(`/article/all`);
      setArticles(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load articles');
      setLoading(false);
    }
  };
  const updateStatus = (id,status) => {
    console.log(status);
    const data = {
        status: (!status)
    }
    
    useApiAxios.put(`/article/status/${id}`,data)
        .then((response) => {
          fetchArticles();
        })
        .catch((error) => console.log(error));
};

  const columns = [
    {
      name: 'ID',
      selector: (row) => Number(row.id),
      sortable: true,
    },
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Media',
      cell: (row) => (
        <div className="flex flex-wrap gap-2">
          {row.media?.map((mediaItem, index) => (
            <img
              key={index}
              src={mediaItem.mediaUrl || ''}
              alt={`Media ${index + 1} of ${row.title}`}
              className="w-10 h-10 rounded"
            />
          ))}
        </div>
      ),
    },
    {
      name: 'Category',
      selector: (row) => row.categorie.name,
      sortable: true,
    },
    {
      name: 'Status',
      cell: (row) =>
        row.status ? (
          <button onClick={()=>{updateStatus(row.id , row.status)}} className="bg-green-500 text-white px-4 py-2 rounded-md">
            Published
          </button>
        ) : (
          <button onClick={()=>{updateStatus(row.id , row.status)}} className="bg-red-500 text-white px-4 py-2 rounded-md">
            Unpublished
          </button>
        ),
    },
  ];

  const handleRowClick = (row) => {
    Navigate(`/article/${row.id}`); 
   };

  const filteredData = articles.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    switch (filterMode) {
      case 'all':
        return matchesSearch;
      case 'published':
        return matchesSearch && item.status;
      case 'unpublished':
        return matchesSearch && !item.status;
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between"> {/* Add buttons for filtering */}
        <div>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-md ${filterMode === 'all' ? 'bg-blue-500 text-white uppercase' : 'bg-gray-200'}`}
            onClick={() => setFilterMode('all')}
          >
            Show All
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${filterMode === 'published' ? 'bg-green-500 text-white uppercase' : 'bg-gray-200'}`}
            onClick={() => setFilterMode('published')}
          >
            Published
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${filterMode === 'unpublished' ? 'bg-red-500 text-white uppercase' : 'bg-gray-200'}`}
            onClick={() => setFilterMode('unpublished')}
          >
            Unpublished
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          className="rounded-lg"
          onRowClicked={handleRowClick}
        />
      </div>
    </div>
  );
};

export default Articledash;
