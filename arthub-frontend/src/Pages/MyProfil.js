import React, { useState } from 'react';
import Profile from '../components/profile';
import Subscribe from '../components/Subscribe';
import Communication from '../components/Communication';
import SideNav from '../components/SideNav';
import Uplode from '../components/uplode';

const MyProfile = () => {
  const [selectedComponent, setSelectedComponent] = useState('profile');

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  let contentComponent;
  switch (selectedComponent) {
    case 'profile':
      contentComponent = <Profile />;
      break;
    case 'subscribe':
      contentComponent = <Subscribe />;
      break;
    case 'uplode':
      contentComponent = <Uplode/>;
      break;
    default:
      contentComponent = <Profile />;
  }

  return (
    <div className='min-h-screen  h-full '>
      <div className="flex  ">
        <div className="w-  fixed overflow-y-auto ">
          <SideNav handleComponentChange={handleComponentChange} />
        </div>
        <div className="w-3/4 ml-64 pl-4 ">
          {contentComponent}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
