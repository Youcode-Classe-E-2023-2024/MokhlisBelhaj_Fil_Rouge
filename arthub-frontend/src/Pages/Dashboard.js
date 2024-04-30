import React, { Profiler, useContext, useEffect, useState } from 'react';
import Sidebaredash from '../components/admin/sidebaredash';
import Statistique from '../components/Statistique';
import Users from '../components/users';
import Articledash from '../components/Articledash';
import Role from '../components/admin/Role';
import Permissions from '../components/admin/Permissions';
import Categorie from '../components/admin/Categorie';
import UserContext from '../auth/user-context';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [selectedComponent, setSelectedComponent] = useState('profile');
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
     
      if (currentUser.role != 'admin') {
        navigate('/');  
      }
    }, [currentUser, navigate]);


    const handleComponentChange = (component) => {
      setSelectedComponent(component);
    };
  
    let contentComponent;
    switch (selectedComponent) {
      case 'statistique':
        contentComponent = <Statistique />;
        break;
      case 'users':
        contentComponent = <Users />;
        break;
      case 'article':
        contentComponent = <Articledash />;
        break;
      case 'categorie':
        contentComponent = <Categorie />;
        break;
      case 'role':
        contentComponent = <Role />;
        break;
      case 'permissions':
        contentComponent = <Permissions />;
        break;
      default:
        contentComponent = <Statistique />;
    }
  return (
   
       <div className='min-h-screen h-fit '>
       <div className="flex  ">
         <div className="w-  fixed overflow-y-auto bg-gray-50 border-r border-gray-200">
           <Sidebaredash handleComponentChange={handleComponentChange} />
         </div>
         <div className="md:w-3/4 ml-36 pl-4 ">
           {contentComponent}
         </div>
       </div>
     </div>
    )
}

export default Dashboard