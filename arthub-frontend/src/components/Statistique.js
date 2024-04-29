import React, { useEffect, useState } from 'react';
import useApiAxios from '../config/axios';
import ActiveArticleCard from './ActiveArticleCard';
import { GrArticle } from "react-icons/gr";
import { TfiUser } from "react-icons/tfi";
import { CgUser } from "react-icons/cg";



function Statistique() {
  const [key, setKey] = useState([]);
  const [activeArticle, setActiveArticle] = useState(null); // Initialisation à null pour éviter le rendu de données non définies

  useEffect(() => {
    fetchState();
    fetchMostActiveArticle();
  }, []);

  const fetchState = () => {
    useApiAxios
      .get('/dashboard')
      .then((response) => {
        setKey(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchMostActiveArticle = () => {
    useApiAxios
      .get('/mostActiveArticle')
      .then((response) => {
        setActiveArticle(response.data.mostActiveArticle); // Accéder au champ correct de la réponse
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex-grow text-gray-800">
      <main className="p-6 sm:p-10 space-y-6">
        <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16  bg-indigo-200 rounded-full mr-6">
            <CgUser size={40} />

            </div>
            <div>
              <span className="block text-2xl font-bold">{key.userCount}</span>
              <span className="block text-gray-500">users</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16  bg-indigo-200 rounded-full mr-6">
            <GrArticle size={40} />
            </div>
            <div>
              <span className="block text-2xl font-bold">{key.articleCount}</span>
              <span className="block text-gray-500">articles</span>
            </div>
          </div>

          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 bg-indigo-200 rounded-full mr-6">
            <TfiUser size={40} />

            </div>
            <div>
              <span className="block text-2xl font-bold">{key.acteursCount}</span>
              <span className="block text-gray-500">actors</span>
            </div>
          </div>
        </section >

        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {activeArticle && (
            <ActiveArticleCard activeArticle={activeArticle} />
          )}
        </section>
      </main>
    </div>
  );
}

export default Statistique;
