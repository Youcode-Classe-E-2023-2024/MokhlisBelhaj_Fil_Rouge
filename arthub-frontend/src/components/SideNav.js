import React from 'react';

function SideNav({ handleComponentChange }) {
  return (
    <div className="w-full  bg-gray-50 border-r border-gray-200  overflow-y-auto">
      <div className="py-4 px-6">
        <a href="/">
          <svg className="w-full h-10" viewBox="0 0 69 40">
            <path fill="#34D186" fillRule="evenodd" d="M55.26 0v30.07h-7.13V1.5L55.26 0ZM34.94 32.92a3.55 3.55 0 0 1 3.57 3.54c0 1.96-1.6 3.54-3.57 3.54a3.55 3.55 0 0 1-3.56-3.54c0-1.95 1.6-3.54 3.56-3.54Zm0-24.38c6.08 0 11.02 4.89 11.02 10.92s-4.94 10.92-11.02 10.92a10.96 10.96 0 0 1-11-10.92c0-6.03 4.93-10.92 11-10.92Zm0 14.46a3.55 3.55 0 0 0 3.57-3.54c0-1.96-1.6-3.54-3.57-3.54a3.55 3.55 0 0 0-3.56 3.54c0 1.96 1.6 3.54 3.56 3.54ZM12.5 23c1.23 0 2.23-1 2.23-2.21 0-1.22-1-2.22-2.23-2.22H7.15V23h5.35ZM7.15 7.08v4.42h3.96c1.23 0 2.23-1 2.23-2.21 0-1.22-1-2.21-2.23-2.21H7.15Zm11.92 7.1a9.19 9.19 0 0 1 2.78 6.6c0 5.14-4.19 9.3-9.36 9.3H0V0h11.1a9.33 9.33 0 0 1 9.37 9.29c0 1.79-.51 3.47-1.4 4.88Zm49.67 1.84h-3.56v5.55c0 1.68.55 2.92 1.97 2.92a6 6 0 0 0 1.6-.2v5.2s-1.48.89-3.48.89h-.09l-.26-.01h-.06l-.13-.01c-3.99-.2-6.7-2.7-6.7-7V5.03l7.14-1.5v5.4h3.57v7.08Z" clipRule="evenodd" />
          </svg>
        </a>
      </div>

      <div className="mb-10">
        <h3 className="mx-6 mb-2 text-xs text-gray-400 uppercase tracking-widest">
          Main
        </h3>

        <button onClick={() => handleComponentChange('profile')} className="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group">
          {/* You can use an SVG or an icon library for the icon */}
          <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          profile
        </button>
        <button onClick={() => handleComponentChange('subscribe')} className="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group">
          {/* You can use an SVG or an icon library for the icon */}
          <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          subscribe
        </button>
        <button onClick={() => handleComponentChange('communication')} className="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group">
          {/* You can use an SVG or an icon library for the icon */}
          <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          communication
        </button>

      </div>
    </div>
  );
}

export default SideNav;
