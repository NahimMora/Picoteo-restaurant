import Image from "next/image";
import Link from "next/link";
import React from "react";

const Offer = () => {
  return (
    <div
      className={`bg-black w-[90wh] h-screen flex flex-col md:flex-row md:justify-between md:bg-[url(https://res.cloudinary.com/dfwfvvzse/image/upload/v1703364188/Picoteo/gmyp8vk3uoehiwqvfjrb.png)] md:h-[70vh]`}
    >
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-8 p-6">
        <h1 className="text-white text-5xl font-bold xl:text-6xl">
          Deliciosa hamburguesa y papas fritas{" "}
        </h1>
        <p className="text-white xl:text-xl">
          Sumérgete en una experiencia gastronómica única con nuestras
          hamburguesas gourmet, preparadas con ingredientes frescos y sabrosos.
        </p>
        <button className="bg-red-500 text-white rounded-md py-3 px-6">
          <Link href={"/menu"}>Ordenar ahora!</Link>
        </button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="flex-1 w-full relative md:h-full">
        <Image
          src="https://res.cloudinary.com/dfwfvvzse/image/upload/v1703364190/Picoteo/zxzo255dvixppled7mie.png"
          alt=""
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default Offer;
