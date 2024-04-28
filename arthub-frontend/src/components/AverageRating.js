import React, { useEffect, useState } from 'react';
import useApiAxios from '../config/axios';
import { GoStarFill } from 'react-icons/go';

function AverageRating({ articleId }) {
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    // Fetch the average rating from the backend
    useApiAxios.get(`/article/${articleId}/rating`)
      .then(response => {
        setAverageRating(response.data.average_rating);
      })
      .catch(error => {
        console.error('Error fetching average rating:', error);
      });
  }, [articleId]);

  return (
    <div className='flex  gap-1 items-center'>
      <h3 className='font-bold'> <span style={{  color:  'gold'}}>&#9733;</span> Average Rating {averageRating} </h3>     
    </div>
  );
}

export default AverageRating;
