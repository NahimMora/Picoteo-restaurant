import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <section className='h-12 md:h-24 p-4 lg:px-20 xl:px-40 text-red-500 flex items-center justify-between'>
      <Link href={'/'} className='font-bold text-xl'>
        PICOTEO
      </Link>
      <p>Hecho por Nahim Mora 👾</p>
    </section>
  )
}

export default Footer