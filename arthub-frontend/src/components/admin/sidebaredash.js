import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../auth/user-context';

function SidebarDash({ handleComponentChange }) {
  const [currentUser, setCurrentUser] = useContext(UserContext);

  return (
    <div className="w-full bg-gray-50 border-r border-gray-200 overflow-y-auto">
      <div className="py-4 px-6">
        <Link to="/">
          <span className="ml-2 text-black text-lg font-bold">ArtHub</span>
        </Link>
      </div>

      <div className="mb-10">
        <button onClick={() => handleComponentChange('statistique')} className="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group">
          <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            {/* Your SVG path */}
          </svg>
          Statistique
        </button>
        <button onClick={() => handleComponentChange('users')} className="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group">
          <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            {/* Your SVG path */}
          </svg>
          Users
        </button>
        <button onClick={() => handleComponentChange('role')} className="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group">
          <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            {/* Your SVG path */}
          </svg>
          Role
        </button>
        <button onClick={() => handleComponentChange('permissions')} className="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group">
          <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            {/* Your SVG path */}
          </svg>
          Permissions
        </button>
        <button onClick={() => handleComponentChange('categorie')} className="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group">
          <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            {/* Your SVG path */}
          </svg>
          Categories
        </button>
        <button onClick={() => handleComponentChange('article')} className="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group">
          <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            {/* Your SVG path */}
          </svg>
          Article
        </button>

        
  
        
       
        
      </div>
    </div>
  );
}

export default SidebarDash;
