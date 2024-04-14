import React from 'react';

const Filter = () => {
    return (
        <div className="my-4 mx-auto max-w-7xl flex justify-center items-center">
            <div className="container mx-auto bg-indigo-400 rounded-lg p-6">
                <form>
                    <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-4 py-2 justify-between">
                        <input className="text-base text-gray-800 flex-grow outline-none px-4 py-2" type="search"
                            placeholder="Search" />
                        <div className="flex items-center space-x-4">
                            <select className="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg">
                                <option value="" selected>Tous les catégories</option>
                                {/* Add your category options here */}
                            </select>
                            <input type="date" id="myDateInput"
                                className="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg" />
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Search</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Filter;
