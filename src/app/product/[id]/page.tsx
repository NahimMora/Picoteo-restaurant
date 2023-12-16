import Price from '@/Components/Price'
import { singleProduct } from '@/data'
import Image from 'next/image'
import React from 'react'

const SingleProductPage = () => {
  return (
    <section className='p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center'>
      {singleProduct.img && (
        <div className='relative mx-auto w-1/2 h-1/2 md:h-[50vh] md:w-[70vh]'>
          <Image
            src={singleProduct.img}
            alt={singleProduct.title}
            className='objet-contain'
            fill
          />
        </div>
      )}
      <div className='h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8'>
        <h1 className='text-3xl font-bold uppercase xl:text-5xl'>{singleProduct.title}</h1>
        <p>{singleProduct.desc}</p>
        <Price 
          price={singleProduct.price} 
          id={singleProduct.id} 
          options={singleProduct.options}
        />
      </div>
    </section>
  )
}

export default SingleProductPage