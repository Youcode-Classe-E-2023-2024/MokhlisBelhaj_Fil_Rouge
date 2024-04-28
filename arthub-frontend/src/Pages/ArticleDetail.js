import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useApiAxios from '../config/axios';
import UserContext from '../auth/user-context';
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import StarRating from '../components/StarRating';
import AverageRating from '../components/AverageRating';



function ArtistsDetail() {
    const [image, setImage] = useState(0); 
    const [article, setArticle] = useState(null);
    const { id } = useParams();
    const [showMore, setShowMore] = useState(false);
    const [currentUser, setCurrentUser] = useContext(UserContext);

    const truncateDescription = (description) => {
        if (description.length > 500 && showMore == false) {
            return description.substring(0, 500) + '...';
        } else {
            return description;
        }
    };

    useEffect(() => {
        fetchArticle();
    }, []);

    const fetchArticle = () => {
        useApiAxios.get(`/articles/${id}`)
            .then((response) => {
                setArticle(response.data);
            })
            .catch((error) => console.log(error));
    };
    const updateStatus = () => {
        const data = {
            status: (!article.status)
        }

        useApiAxios.put(`/article/status/${id}`, data)
            .then((response) => {
                fetchArticle();
            })
            .catch((error) => console.log(error));
    };



    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <div className='min-h-screen'>
            <div className="antialiased">
                <div className="py-6">
                    <div className=" bg-white   max-w-7xl mx-auto px-4 sm:p-6 lg:p-10 rounded-xl mt-6">


                        <div className="flex flex-col md:flex-row -mx-4">
                            <div className="md:flex-1 px-4">
                                <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                                    <img src={article.media[image].mediaUrl} alt="Media" className="h-full w-full object-cover rounded-lg" />
                                </div>

                                {article.media.length > 1 && <div className="flex -mx-2 mb-4">
                                    {article.media.map((mediaItem, index) => (
                                        <div key={mediaItem.id} className="flex-1 px-2">
                                            <button
                                                onClick={() => setImage(index)}
                                                className={`focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center ${image === index ? 'ring-2 ring-indigo-300 ring-inset' : ''
                                                    }`}
                                            >
                                                <img src={mediaItem.mediaUrl} alt={`Media ${mediaItem.id}`} />
                                            </button>
                                        </div>
                                    ))}
                                </div>}
                            </div>

                            <div className="md:flex-1 px-4">
                                <h2 className="mb-4 leading-tight text-center tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                                    {article.title}
                                    {currentUser?.role === 'admin' && (
                                        <span className='p-3'>
                                            {article.status ? (
                                                <button onClick={() => updateStatus()} className="bg-green-500 text-white px-4 py-2 rounded-md">
                                                    Published
                                                </button>
                                            ) : (
                                                <button onClick={() => updateStatus()} className="bg-red-500 text-white px-4 py-2 rounded-md">
                                                    Unpublished
                                                </button>
                                            )}
                                        </span>
                                    )}
                                </h2>
                               
                                <div className="mb-4">
                                    <p className="font-semibold text-xl">
                                        By{' '}
                                        <Link to={`/profile/${article.user.id}`} className="text-indigo-600 hover:underline">
                                            {article.user.name}
                                        </Link>
                                    </p>
                                    <p><span className='font-bold'>created_at : </span>{article.created_at.split('T')[0] }
                                    </p>{article.updated_at &&
                                    <p><span className='font-bold'>created_at : </span>{article.created_at.split('T')[0] }
                                    </p>
                                    }
                                        {currentUser?<div className=' w-40'><StarRating
                                        articleId={article.id}
                                        initialRating={article.initialRating}

                                    /></div>:<>  <AverageRating
                                    articleId={article.id}/></>}
                                  
                                   
                                </div>


                                
                                <div className='flex flex-col'>
                                    <p className="mb-4 font-semibold">Category: {article.categorie.name}</p>
                                    <p>{truncateDescription(article.description)}</p>
                                    {
                                        article.description.length > 500 &&

                                        <button onClick={() => setShowMore(!showMore)} className='border border-spacing-3 bg-indigo-300 p-3 rounded-md  self-center '>
                                            {showMore ? <div className='flex items-center '>back<GoArrowUp /></div>
                                                : <div className='flex items-center '>more<GoArrowDown /></div>}
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArtistsDetail;
