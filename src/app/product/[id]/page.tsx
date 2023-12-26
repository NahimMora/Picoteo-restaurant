import DeleteButton from '@/Components/DeleteButton';
import Price from '@/Components/Price'
import { ProductType } from '@/types/types';
import Image from 'next/image'
import React from 'react'

const getData = async (id:string) => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store"
  });
  if (!res.ok) {
    throw new Error("¡Falló!");
  }
  return res.json();
};


const SingleProductPage = async ({params}:{params:{id:string}}) => {

  const singleProduct:ProductType = await getData(params.id)

  return (
    <section className='p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center relative'>
      {singleProduct.img && (
        <div className='relative mx-auto w-1/2 h-1/2 md:w-[30vw] md:h-[50vh]'>
          <Image
            src={singleProduct.img}
            alt={singleProduct.title}
            className='objet-contain'
            fill
          />
        </div>
      )}
      <div className='h-1/2 mt-7 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8'>
        <h1 className='text-3xl font-bold uppercase xl:text-5xl'>{singleProduct.title}</h1>
        <p>{singleProduct.desc}</p>
        <Price product={singleProduct}/>
      </div>
      <DeleteButton id={singleProduct.id}/>
    </section>
  )
}

export default SingleProductPage