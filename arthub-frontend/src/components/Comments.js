import React, { useContext, useEffect, useState } from 'react';
import useApiAxios from '../config/axios';
import UserContext from '../auth/user-context';
import UpdateComment from './UpdateComment';

const Comments = ({ id }) => {
  const [commentsData, setCommentsData] = useState([]);
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [commentToUpdate, setCommentToUpdate] = useState(null); // Initialize with null to represent no active update

  const [newComment, setNewComment] = useState({
    comment: '',
    article_id: `${id}`,
  });

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    useApiAxios.get(`articles/${id}/comments`)
      .then((response) => {
        setCommentsData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteComment = (id) => {
    useApiAxios.delete(`comments/${id}`)
      .then(() => {
        fetchComments();
      })
      .catch((error) => {
        alert('Comment not deleted');
      });
  };

  const openUpdateComment = (commentId) => {
    setCommentToUpdate(commentId); // Set the comment ID to update
  };

  const closeUpdateComment = () => {
    fetchComments()
    setCommentToUpdate(null); // Reset the state to hide the update component
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setNewComment((prev) => ({ ...prev, comment: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    useApiAxios.post('comments', newComment)
      .then(() => {
        fetchComments();
        setNewComment({ ...newComment, comment: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const Comment = ({ user, avatar, time, text, onDelete, onUpdate, checkUser, userId }) => (
    <div className="flex items-start space-x-4 p-4 border rounded-md border-blue-900 bg-white my-3">
      <img
        src={avatar}
        alt={`${user}'s avatar`}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="w-full">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-lg text-gray-900">{user}</span>
          <span className="text-sm text-gray-400">{new Date(time).toLocaleDateString()}</span>
          <div className="flex flex-col space-y-2 items-end">
            {userId === checkUser && (
              <>
                <button
                  onClick={onDelete}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-1 rounded-full transition duration-200 ease-in-out"
                >
                  Delete
                </button>
                <button
                  onClick={onUpdate}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-1 rounded-full transition duration-200 ease-in-out"
                >
                  Update
                </button>
              </>
            )}
          </div>
        </div>
        <p className="text-gray-600 mt-2 leading-relaxed">{text}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div>
        {commentsData.map((comment) => (
          <Comment
            key={comment.id}
            checkUser={currentUser.id}
            user={comment.user.name}
            userId={comment.user.id}
            avatar={comment.user.imageUrl}
            time={comment.created_at}
            text={comment.comments}
            onDelete={() => deleteComment(comment.id)}
            onUpdate={() => openUpdateComment(comment.id)}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          name="comment"
          value={newComment.comment}
          onChange={handleInputChange}
          placeholder="Add a comment..."
          className="w-full p-3 border rounded"
          required
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
      </form>

      {/* Conditionally render the UpdateComment component only when commentToUpdate is set */}
      {commentToUpdate && (
        <UpdateComment
          commentId={commentToUpdate}
          onClose={closeUpdateComment}
          onUpdate={fetchComments} // Pass fetchComments to refresh comments after update
        />
      )}
    </div>
  );
};

export default Comments;
