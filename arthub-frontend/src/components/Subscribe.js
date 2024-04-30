
import React, { useContext } from 'react';
import Follower from './Follower';
import Following from './Following';
import UserContext from '../auth/user-context';
function Subscribe() {
  const [currentUser, setCurrentUser] = useContext(UserContext);
    
  return (
    <div className=''>
      {currentUser.role=='acteur'&&(
        <Follower/>
      )}
      <Following/>
      </div>
  );
}

export default Subscribe;
