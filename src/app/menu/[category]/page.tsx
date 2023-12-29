"use client";
import { ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  params: { category: string };
};

const CategoryPage = ({ params }: Props) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const getData = async (category: string) => {
    try {
      const res = await fetch(`/api/products?cat=${category}`, {
        cache: "no-store",
      });
      return res.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Propagar el error para que sea manejado más arriba
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getData(params.category);
        setProducts(data);
      } catch (error) {
        // Manejar errores aquí, si es necesario
      }
    };

    fetchProducts();
  }, [params.category]); // Asegúrate de incluir params.category como dependencia para que useEffect se ejecute cuando cambie.

  return (
    <section className="flex flex-wrap text-red-500">
      {products.map((item) => (
        <Link
          className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4 flex flex-col justify-between group odd:bg-fuchsia-50"
          href={`/product/${item.id}`}
          key={item.id}
        >
          {item.img && (
            <div className="relative h-[80%]">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <div className="flex flex-col h-36 items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">${item.price}</h2>
            <button className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md">
              Añadir al carrito
            </button>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default CategoryPage;
