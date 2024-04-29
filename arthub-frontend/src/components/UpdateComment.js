import React, { useState, useEffect } from 'react';
import useApiAxios from '../config/axios';

const UpdateComment = ({ commentId, onClose, onUpdate }) => {
  const [commentText, setCommentText] = useState();

  useEffect(() => {
    if (commentId) {
      fetchComment();
    }
  }, [commentId]);

  const fetchComment = () => {
    useApiAxios
      .get(`comments/${commentId}`)
      .then((response) => {
        setCommentText(response.data.comment);
      })
      .catch((error) => {
      });
  };

  const handleUpdate = () => {
    useApiAxios
      .put(`comments/${commentId}`, { comment: commentText })
      .then((response) => {
        onUpdate(); // Triggered to refresh comments after update
        onClose();  // Close the update component after update
        setCommentText(response.data.comments);
      })
      .catch((error) => {
      });
  };

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

 

  return (
    <div className="bg-white p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Update Comment</h2>
      <input
        value={commentText}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        rows={4}
      />
      <div className="mt-2">
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        >
          Update
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-black rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateComment;
