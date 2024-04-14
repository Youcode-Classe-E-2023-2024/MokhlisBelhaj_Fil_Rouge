import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import Subscribe from '../components/Subscribe';
import Communication from '../components/Communication';
import SideNav from '../components/SideNav';

const MyProfile = () => {
  const [selectedComponent, setSelectedComponent] = useState('profile'); // Default component to display

  // Function to handle component selection
  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  let contentComponent;
  switch (selectedComponent) {
    case 'profile':
      contentComponent = <ProfilePage />;
      break;
    case 'subscribe':
      contentComponent = <Subscribe />;
      break;
    case 'communication':
      contentComponent = <Communication />;
      break;
    default:
      contentComponent = <ProfilePage />;
  }

  return (
    <div className=' relative'>
    <div className="flex  ">
      <div className="w-  fixed overflow-y-auto bg-gray-50 border-r border-gray-200">
        <SideNav handleComponentChange={handleComponentChange} />
      </div>
      <div className="w-3/4 ml-64 pl-4 "> {/* Adjust the padding according to your sidebar width */}
        {contentComponent}
      </div>
    </div>
    </div>
  );
};

export default MyProfile;
