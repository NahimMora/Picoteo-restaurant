import Image from "next/image";
import React from "react";

const data = {
  id: 1,
  title: "Tu restaurante favorito, a solo un clic de distancia.",
  image:
    "https://res.cloudinary.com/dfwfvvzse/image/upload/v1703364152/Picoteo/i2aucujpfetithpkavgd.png",
};
const Slider = () => {
  return (
    <section className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50">
      {/* CONTENEDOR TEXTO */}
      <div className="flex-1 flex items-center justify-center flex-col gap-8 my-5 text-red-500 font-bold">
        <h1 className="text-4xl text-center uppercase p-4 md:p-10 md:text-6xl xl:text-6xl">
          {data.title}
        </h1>
        <button className="bg-red-500 text-white py-4 px-8">
          Ordenar ahora!
        </button>
      </div>
      {/* CONTENEDOR IMAGEN */}
      <div className="w-full flex-1 relative">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
};

export default Slider;
