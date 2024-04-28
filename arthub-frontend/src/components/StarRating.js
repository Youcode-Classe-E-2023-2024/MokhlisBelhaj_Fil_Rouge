import React, { useState, useEffect } from 'react';
import Star from './button/Stars';
import useApiAxios from '../config/axios';

// This component displays the star rating and handles interaction
const StarRating = ({ totalStars = 5, articleId }) => {
  // Initialize state with the initial rating
  const [rating, setRating] = useState();
  const [averageRating, setAverageRating] = useState(null);

  useEffect(()=>{
    AverageRating()
    articleRating()
  },[]);

  const AverageRating=() => {
    // Fetch the average rating from the backend
    useApiAxios.get(`/article/${articleId}/rating`)
      .then(response => {
        setAverageRating(response.data.average_rating);
      })
      .catch(error => {
        console.error('Error fetching average rating:', error);
      });
  };
  const handleStarClick = (index) => {
    setRating(index);

    // API call to save the rating
    useApiAxios.post('/ratings', {
      article_id: articleId,
      stars: index,
    })
    .then((response) => {
      console.log('Rating submitted:', response.data.message);
      AverageRating();
    })
    .catch((error) => {
      console.error('Error submitting rating:', error);
    });
  };
  const articleRating =()=>{
    useApiAxios.get(`/ratings/${articleId}`)
    .then((response)=>{
      setRating(response.data[0].stars)
    })
    .catch((error)=>console.error(error));
  }

  return (
    <div className='flex flex-col items-center'>
       <h3 className='font-bold items-left'>Average Rating {averageRating}</h3>
       <span className='flex  gap-1'><div className='font-bold'>Your</div> 
      <div>   
      {Array.from({ length: totalStars }).map((_, i) => (
        <Star
          key={i}
          selected={i < rating}
          onClick={() => handleStarClick(i + 1)}
        />
      ))}
      </div>
       </span>
    </div>
  );
};

export default StarRating;
