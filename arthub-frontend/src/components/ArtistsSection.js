import React from "react";

const ArtistsSection = () => {
  const cards = Array.from({ length: 8 }, (_, index) => (
    <section key={index} className="w-64 mx-auto bg-indigo-400 rounded-xl p-6 shadow-lg mb-6">
     
      <div className="flex items-center justify-center mb-4">
        <img
          src="https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe"
          className="rounded-full w-28"
          alt="profile picture"
        />
      </div>
      <div className="text-center mb-2">
        <h2 className="text-white font-semibold text-xl tracking-wide">Jonathan Smith</h2>
        <p className="text-emerald-400 font-semibold text-sm">profil</p>
        <p>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quibusdam!"</p>
      </div>
     
    
    </section>
  ));

  return (
    <section className=" flex  justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards}
      </div>
    </section>
  );
};

export default ArtistsSection;
