import React from 'react';

const ArticleSection = () => {
  return (
    <div className="container mx-auto w-full my-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md">
            <div className="relative">
              {/* Image Video */}
              <a href="#">
                <img src={`https://picsum.photos/seed/${i}/300/200`} className="w-full h-auto rounded-t-lg" alt={`Article ${i}`} />
              </a>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2">
                {/* Profile Picture */}
                <a href="#">
                  <img src={`https://picsum.photos/seed/${i}1/40/40`} className="rounded-full w-10 h-10" alt={`Profile ${i}`} />
                </a>

                {/* Description */}
                <div className="flex flex-col">
                  <a href="#" className="text-blue-600 font-semibold">Learn CSS Box Model in 8 Minutes</a>
                  <a href="#" className="text-gray-600 text-sm hover:text-gray-800">Web Dev Simplified</a>
                  <p className="text-gray-600 text-sm">241K views</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticleSection;
