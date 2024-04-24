import React, { useEffect, useState } from "react";
import useApiAxios from "../config/axios";
import { Link } from "react-router-dom";

const ArtistsSection = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchingArtists();
  }, []);

  const fetchingArtists = () => {
    useApiAxios
      .get('/acteur')
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const renderUserCards = () => {
    // Filter users based on the filter value
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(filter.toLowerCase())
    );

    return filteredUsers.map((user) => (
      <div key={user.id} className="w-full sm:w-64 mx-auto bg-white rounded-xl p-6 shadow-lg mb-6">
        <div className="flex flex-col items-center mb-4">
          <img
            src={user.imageUrl} // Use the imageUrl from the fetched user data
            className="rounded-full w-28 h-28 mb-2"
            alt="profile picture"
          />
          <h2 className="text-gray-800 font-semibold text-lg">{user.name}</h2>
          <Link
            to={`/profile/${user.id}`}
            className="mt-4 mb-2 bg-teal-400 rounded-full px-12 py-1 text-gray-100 font-semibold hover:bg-teal-300 focus:outline-none"
          >
            View Profile
          </Link>
        </div>
      </div>
    ));
  };

  return (
    <div>
       <div className="my-4 mx-auto max-w-64 flex justify-center items-center">
            <div className="container mx-auto bg-indigo-400 rounded-lg p-6">
                
        {/* Filter input field */}
        <input
          type="text"
          placeholder="Search by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
            </div>
        </div>
    <section className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Render filtered user cards */}
        {renderUserCards()}
      </div>
    </section>
    </div>
  );
};

export default ArtistsSection;
