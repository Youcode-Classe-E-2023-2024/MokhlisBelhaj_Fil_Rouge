import React from 'react';
import { Link } from 'react-router-dom';

const ActiveArticleCard = ({ activeArticle }) => {
  if (!activeArticle) {
    return null; // Avoid rendering if data is not loaded
  }

  // Destructure activeArticle properties
  const {
    id,
    title,
    description,
    user,
    categorie,
    comment_count,
    ratings_count,
    media,
    created_at,
  } = activeArticle;

  
  const hasMedia = media && media.length > 0;
  const mediaType = hasMedia ? media[0].type : null;
  const mediaUrl = hasMedia ? media[0].mediaUrl : null;


  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
        <p className='text-2xl text-center font-bold p-3'>l'article le plus actif</p>
      <div className="flex items-center">
      {hasMedia && mediaType === 'image' && (
          <img
            src={mediaUrl}
            alt="Article image"
            className="w-32 h-32 rounded-lg object-cover mr-4"
          />
        )}
        {hasMedia && mediaType === 'video' && (
          <video
            src={mediaUrl}
            controls
            className="w-32 h-32 rounded-lg object-cover mr-4"
          />
        )}
        <div>
        <Link to={`/article/${id}`}>

          <h2 className="text-xl font-bold">{title}</h2>
          </Link>
          <p className="text-gray-600">{new Date(created_at).toLocaleDateString()}</p>
        </div>
      </div>
    
      <div className="mt-4">
       <Link to={`/profile/${user.id}`}>
         <p className="text-sm text-blue-900">Author: <span className='font-bold text-rose-950'> {user.name}</span></p>
        </Link>
        <p className="text-sm text-blue-900">Category: <span className='font-bold text-rose-950'> {categorie.name}</span></p>
        <p className="text-sm text-blue-900"> Comments: <span className='font-bold text-rose-950'> {comment_count}</span></p>
        <p className="text-sm text-blue-900">Ratings: <span className='font-bold text-rose-950'> {ratings_count}</span>
        </p>
      </div>
    </div>
  );
};

export default ActiveArticleCard;
