// ArticleSection.js
import React from 'react';

const ArticleSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <ArticleCard key={i} index={i} />
        ))}
      </div>
    </div>
  );
};

const ArticleCard = ({ index }) => {
  return (
    <div className= " mt-4 bg-white rounded-lg shadow-md overflow-hidden">
      <a href="#" className="block">
        <img
          src={`https://picsum.photos/seed/${index}/300/200`}
          className="w-full h-auto"
          alt={`Article ${index}`}
        />
      </a>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img
            src={`https://picsum.photos/seed/${index}1/40/40`}
            className="rounded-full w-10 h-10 mr-2"
            alt={`Profile ${index}`}
          />
          <div>
            <a href="#" className="block text-lg font-semibold text-blue-600 hover:underline">
              Learn CSS Box Model in 8 Minutes
            </a>
            <a href="#" className="text-gray-600 text-sm hover:text-gray-800">
              Web Dev Simplified
            </a>
          </div>
        </div>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
};

export default ArticleSection;
