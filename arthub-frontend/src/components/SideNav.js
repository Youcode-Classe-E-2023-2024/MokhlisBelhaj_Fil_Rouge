import React from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../auth/user-context';
import { useContext } from 'react';

function SideNav({ handleComponentChange }) {
  const [currentUser, setCurrentUser] = useContext(UserContext);

  return (
    <div className="w-full   bg-gray-50 border-r border-gray-200 rounded-r-lg  overflow-y-auto">
      <div className="py-4 px-6">
        <Link to="/">
          <span className="ml-2 text-black text-lg font-bold">ArtHub</span>

        </Link>
      </div>

      <div className="mb-10">


        <button onClick={() => handleComponentChange('profile')} className="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group">
          <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          profile
        </button>
        <button onClick={() => handleComponentChange('subscribe')} className="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            viewBox="0 0 256 256"
            xmlSpace="preserve"
            className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500 group hover:fill-white">
            <defs>
            </defs>
            <g style={{ stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', fillRule: 'nonzero', opacity: 1 }} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
              <path d="M 63.706 26.858 c 0.371 -1.872 -0.02 -3.714 -1.099 -5.188 c -1.079 -1.474 -2.718 -2.403 -4.615 -2.614 c -1.869 -0.207 -3.749 0.306 -5.308 1.447 L 21.12 43.616 l 0.155 -8.133 c 0.035 -1.84 -0.664 -3.542 -1.97 -4.794 c -1.352 -1.298 -3.167 -1.949 -5.118 -1.829 c -3.895 0.235 -7.123 3.522 -7.195 7.327 L 6.429 65.864 c -0.121 5.309 1.424 10.31 4.465 14.462 C 15.551 86.685 22.933 90 30.649 90 c 5.704 -0.001 11.592 -1.813 16.691 -5.548 l 13.231 -9.69 c 3.254 -2.382 4.099 -6.785 1.882 -9.813 c -1.072 -1.463 -2.694 -2.387 -4.573 -2.607 l 0.284 -0.208 c 1.558 -1.14 2.618 -2.783 2.982 -4.624 c 0.371 -1.872 -0.02 -3.714 -1.099 -5.188 c -1.313 -1.793 -3.412 -2.7 -5.581 -2.652 c 1.385 -2.353 1.403 -5.287 -0.213 -7.494 c -1.072 -1.463 -2.694 -2.386 -4.572 -2.607 l 11.043 -8.087 C 62.282 30.341 63.341 28.699 63.706 26.858 z M 59.542 29.869 L 44.33 41.01 l -8.899 6.517 c -0.446 0.326 -0.542 0.952 -0.216 1.397 c 0.326 0.445 0.951 0.544 1.397 0.216 l 8.899 -6.517 c 1.154 -0.844 2.548 -1.224 3.905 -1.073 c 1.334 0.149 2.479 0.791 3.224 1.808 c 1.564 2.138 0.914 5.286 -1.451 7.018 l -8.9 6.517 c -0.446 0.326 -0.542 0.952 -0.216 1.397 c 0.091 0.125 0.209 0.215 0.337 0.284 c 0.039 0.021 0.079 0.028 0.12 0.043 c 0.094 0.036 0.188 0.061 0.289 0.068 c 0.021 0.001 0.041 0.014 0.062 0.014 c 0.049 0 0.096 -0.016 0.144 -0.023 c 0.04 -0.006 0.078 -0.008 0.117 -0.018 c 0.115 -0.031 0.227 -0.078 0.328 -0.153 l 7.834 -5.737 c 2.363 -1.729 5.563 -1.402 7.129 0.735 c 0.745 1.017 1.012 2.302 0.751 3.619 c -0.267 1.347 -1.049 2.554 -2.202 3.399 l -7.682 5.626 c -0.445 0.326 -0.542 0.952 -0.216 1.397 c 0.195 0.268 0.499 0.409 0.807 0.409 c 0.205 0 0.412 -0.062 0.59 -0.193 l 3.228 -2.364 c 0.001 0 0.001 0 0.002 -0.001 c 1.153 -0.845 2.544 -1.22 3.905 -1.073 c 1.334 0.149 2.479 0.791 3.224 1.808 c 1.565 2.138 0.914 5.286 -1.451 7.018 l -13.231 9.69 c -11.107 8.133 -26.203 6.477 -33.652 -3.695 c -2.779 -3.794 -4.189 -8.371 -4.079 -13.24 l 0.564 -29.68 c 0.053 -2.787 2.438 -5.195 5.316 -5.369 c 1.388 -0.079 2.669 0.369 3.614 1.276 c 0.898 0.862 1.379 2.038 1.354 3.313 l -0.193 10.151 c -0.007 0.38 0.202 0.731 0.539 0.907 c 0.337 0.174 0.744 0.143 1.052 -0.081 l 33.192 -24.307 c 1.153 -0.844 2.544 -1.224 3.905 -1.073 c 1.334 0.148 2.479 0.791 3.224 1.808 s 1.012 2.302 0.751 3.619 C 61.478 27.817 60.695 29.024 59.542 29.869 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(0,0,0)', fillRule: 'nonzero', opacity: 1 }} transform="matrix(1 0 0 1 0 0)" strokeLinecap="round" />
              <path d="M 61.432 43.549 l -0.486 -0.271 c -1.073 -0.598 -2.295 -1.378 -3.633 -2.319 c -0.452 -0.318 -0.561 -0.942 -0.242 -1.394 c 0.316 -0.45 0.94 -0.561 1.393 -0.242 c 1.08 0.76 2.076 1.407 2.969 1.93 c 4.908 -2.876 12.393 -9.214 15.442 -13.119 c 6.383 -8.17 7.895 -17.626 3.595 -22.485 c -1.983 -2.241 -4.78 -3.534 -7.873 -3.641 c -3.712 -0.137 -7.4 1.462 -10.463 4.474 l -0.701 0.69 l -0.701 -0.69 c -3.063 -3.012 -6.784 -4.609 -10.464 -4.474 c -3.094 0.107 -5.889 1.4 -7.873 3.641 c -3.133 3.541 -3.21 9.788 -0.201 16.304 c 0.232 0.501 0.013 1.096 -0.488 1.327 c -0.501 0.231 -1.096 0.013 -1.327 -0.488 c -3.398 -7.358 -3.205 -14.262 0.519 -18.468 c 2.351 -2.656 5.654 -4.188 9.301 -4.314 c 3.929 -0.137 7.911 1.415 11.234 4.389 c 3.322 -2.974 7.308 -4.523 11.232 -4.389 c 3.647 0.126 6.951 1.658 9.303 4.314 c 4.938 5.581 3.46 16.112 -3.517 25.042 C 75.111 33.639 67.078 40.4 61.92 43.278 L 61.432 43.549 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(0,0,0)', fillRule: 'nonzero', opacity: 1 }} transform="matrix(1 0 0 1 0 0)" strokeLinecap="round" />
            </g>
          </svg>
          subscribe
        </button>
        <button onClick={() => handleComponentChange('communication')} className="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 256 256" xmlSpace="preserve"
            className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500"
          >
            <g style={{ stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', fillRule: 'nonzero', opacity: 1 }} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
              <path d="M 14.972 86.134 c -0.193 0 -0.388 -0.038 -0.574 -0.116 c -0.551 -0.231 -0.909 -0.77 -0.909 -1.368 V 67.853 H 5.177 C 2.322 67.853 0 65.531 0 62.676 V 9.043 c 0 -2.854 2.322 -5.177 5.177 -5.177 h 79.646 C 87.678 3.866 90 6.189 90 9.043 v 53.633 c 0 2.855 -2.322 5.177 -5.177 5.177 H 34.206 L 16.011 85.709 C 15.728 85.987 15.353 86.134 14.972 86.134 z M 5.177 6.833 c -1.218 0 -2.21 0.991 -2.21 2.21 v 53.633 c 0 1.219 0.991 2.21 2.21 2.21 h 9.795 c 0.82 0 1.484 0.664 1.484 1.484 v 14.746 L 32.56 65.311 c 0.278 -0.272 0.65 -0.425 1.039 -0.425 h 51.224 c 1.219 0 2.21 -0.991 2.21 -2.21 V 9.043 c 0 -1.218 -0.991 -2.21 -2.21 -2.21 H 5.177 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(0,0,0)', fillRule: 'nonzero', opacity: 1 }} transform="matrix(1 0 0 1 0 0)" strokeLinecap="round" />
            </g>
          </svg>
          communication
        </button>
        
      
         {currentUser?.role === "acteur" ?<>
          <button onClick={() => handleComponentChange('uplode')} className="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 256 256" xmlSpace="preserve"
            className="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500"
          >
            <g style={{ stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', fillRule: 'nonzero', opacity: 1 }} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
              <path d="M 14.972 86.134 c -0.193 0 -0.388 -0.038 -0.574 -0.116 c -0.551 -0.231 -0.909 -0.77 -0.909 -1.368 V 67.853 H 5.177 C 2.322 67.853 0 65.531 0 62.676 V 9.043 c 0 -2.854 2.322 -5.177 5.177 -5.177 h 79.646 C 87.678 3.866 90 6.189 90 9.043 v 53.633 c 0 2.855 -2.322 5.177 -5.177 5.177 H 34.206 L 16.011 85.709 C 15.728 85.987 15.353 86.134 14.972 86.134 z M 5.177 6.833 c -1.218 0 -2.21 0.991 -2.21 2.21 v 53.633 c 0 1.219 0.991 2.21 2.21 2.21 h 9.795 c 0.82 0 1.484 0.664 1.484 1.484 v 14.746 L 32.56 65.311 c 0.278 -0.272 0.65 -0.425 1.039 -0.425 h 51.224 c 1.219 0 2.21 -0.991 2.21 -2.21 V 9.043 c 0 -1.218 -0.991 -2.21 -2.21 -2.21 H 5.177 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(0,0,0)', fillRule: 'nonzero', opacity: 1 }} transform="matrix(1 0 0 1 0 0)" strokeLinecap="round" />
            </g>
          </svg>
          uplode  
        </button>
        </>:<></>}
        
      </div>
    </div>
  );
}

export default SideNav;
