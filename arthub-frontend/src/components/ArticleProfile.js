import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useApiAxios from '../config/axios';

function ArticleProfile({ onDataFetch, id }) {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchArticles();
    }, []);
    const fetchArticles = () => {
        useApiAxios.get(`/myArticle/${id}`)
            .then((response) => {
                setArticles(response.data);
                if (onDataFetch) {
                    onDataFetch(response.data);
                }
            })
            .catch((error) => console.log(error));
    };
    const truncateDescription = (description) => {
        if (description.length > 150) {
            return description.substring(0, 150) + '...';
        } else {
            return description;
        }
    };
    return (
        <div className="flex flex-wrap">
        {articles.map((article, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-4">
                <Link
                    to={`/article/${article.id}`}
                    className="block h-full" 
                >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                        <img
                            src={article.media[0].mediaUrl}
                            className="w-full h-[300px]" 
                            alt={`Article ${index}`}
                        />
                        <div className="p-4 flex-grow">
                            <div className="flex items-center mb-4">
                                <div>
                                    <Link
                                        to={`/article/${article.id}`}
                                        className="block text-lg font-semibold text-blue-600 hover:underline"
                                    >
                                        {article.title}
                                    </Link>
                                </div>
                            </div>
                            <p className="text-gray-700">
                                {truncateDescription(article.description)}
                            </p>
                        </div>
                        <div className="flex justify-center gap-2 p-3">
                            {/* Optional content in footer */}
                        </div>
                    </div>
                </Link>
            </div>
        ))}
    </div>
    
    );
}

export default ArticleProfile