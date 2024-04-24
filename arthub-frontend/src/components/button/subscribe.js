import React, { useEffect, useState } from 'react';
import useApiAxios from '../../config/axios'; 

const Subscribe = ({ id }) => {
  const [follower, setFollower] = useState(null);
  
  useEffect(() => {
    const fetchFollowingStatus = async () => {
      try {
        const response = await useApiAxios.get(`/following/${id}`); 
        setFollower(response.data[0]);
      } catch (error) {
        console.error('Error fetching following status:', error);
      }
    };

    fetchFollowingStatus();
  }, [id]); 

  const toggleFollow = (action) => {
    useApiAxios.post(`/users/${id}/${action}`)
      .then((response) => {
        console.log(response);
        setFollower(!follower);
      })
      .catch((error) => {
        console.error('Error updating following status:', error);
      });
  };

  return (
    <>
      {follower === null ? (
        <p>Loading...</p>
      ) : follower ? (
        <button
          className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
          onClick={() => toggleFollow('unfollow')}
        >
          Unfollow
        </button>
      ) : (
        <button
          className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
          onClick={() => toggleFollow('follow')}
        >
          Follow
        </button>
      )}
    </>
  );
};

export default Subscribe;
