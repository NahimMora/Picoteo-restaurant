"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import iconEmpty from "@/../public/empty.png";

type inputs = {
  title: string;
  desc: string;
  color: string;
  price: number;
  catSlug: string;
};

type Option = {
  title: string;
  additionalPrice: number;
};

const categorys = [
  { id: 1, name: "burgers" },
  { id: 2, name: "pizzas" },
  { id: 3, name: "pastas" },
];

const sizes = [
  { id: 1, name: "pequeño" },
  { id: 2, name: "mediano" },
  { id: 3, name: "grande" },
];

const NewProductPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // if (!session?.user.isAdmin) {
  //   router.push("/");
  // }

  const [inputs, setInputs] = useState<inputs>({
    title: "",
    color: "white",
    desc: "",
    price: 0,
    catSlug: "",
  });

  const [option, setOption] = useState<Option>({
    title: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState<Option[]>([]);

  const [fileUrl, setFileUrl] = useState<File>();

  const [url, setUrl] = useState<string>();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeOption = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setOption((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFileUrl(item);
    const url = await upload();
    setUrl(url);
    console.log("Foto subida: ", url);
  };

  const upload = async () => {
    const data = new FormData();
    data.append("image", fileUrl!);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });
    const resData = await res.json();
    return resData.url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: JSON.stringify({
          img: url,
          ...inputs,
          options,
        }),
      });

      setInputs({
        title: "",
        color: "white",
        desc: "",
        price: 0,
        catSlug: "",
      });

      setOption({
        title: "",
        additionalPrice: 0,
      });

      setFileUrl(undefined);

      setOptions([]);

      const data = await res.json();

      router.push(`/product/${data.id}`);
    } catch (error) {}
  };

  return (
    <div className="p-6">
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <h1 className="text-2xl uppercase font-extrabold text-red-500">
          Crear nuevo producto
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-items-center mx-auto">
          {" "}
          <div className="flex flex-col w-3/4 p-10">
            <label>Nombre</label>
            <input
              className="mt-2 ring-1 ring-red-200 rounded-sm selection:ring-red-500 p-2 w-full"
              onChange={handleChange}
              type="text"
              name="title"
              placeholder="Nombre"
              value={inputs.title}
            />
          </div>
          <div className="flex flex-col w-3/4 p-10">
            <label>Descripcion</label>
            <textarea
              className="mt-2 ring-1 ring-red-200 rounded-sm selection:ring-red-500 p-2 w-full"
              onChange={handleChange}
              name="desc"
              placeholder="Descripcion"
              value={inputs.desc}
            />
          </div>
          <div className="flex flex-col w-3/4 p-10">
            <label>Precio</label>
            <input
              className="mt-2 ring-1 ring-red-200 rounded-sm selection:ring-red-500 p-2 w-full"
              onChange={handleChange}
              type="number"
              name="price"
              placeholder="Precio"
              value={inputs.price === 0 ? "" : inputs.price}
            />
          </div>
          <div className="flex flex-col w-3/4 p-10">
            <label>Categoria</label>
            <select
              name="catSlug"
              value={inputs.catSlug}
              onChange={handleChange}
              className="mt-2 ring-1 ring-red-200 rounded-sm selection:ring-red-500 p-2 w-full"
            >
              <option value="" disabled hidden>
                Categoría
              </option>
              {categorys.map((cat) => (
                <option key={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-3/4 p-10">
            <label className="text-lg font-semibold mb-2">Imagen</label>
            <label className="relative cursor-pointer bg-red-500 text-white rounded-md py-2 text-center">
              <span className="items-center">
                {/* Icono u otro elemento decorativo aquí */}
              </span>
              Seleccionar Archivo
              <input
                className="opacity-0 hidden cursor-pointer"
                onChange={handleChangeImage}
                type="file"
              />
            </label>
          </div>
          <div className="bg-red-200 h-32 w-32 border-2 border-red-500 rounded-md flex justify-center items-center">
            {url && (
              <div>
                <Image src={url} alt={url} width={100} height={100} />
              </div>
            )}
            {!url && (
              <div>
                <Image src={iconEmpty} alt="vacio" width={75} height={75} />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col w-3/4 mt-5">
          <label>Opciones</label>
          <div className="flex mt-2 justify-between w-full">
            <select
              onChange={handleChangeOption}
              name="title"
              value={option.title}
              className="w-1/3 m-2 ring-1 ring-red-200 rounded-sm selection:ring-red-500 p-2"
            >
              <option value="" disabled hidden>
                Tamaño
              </option>
              {sizes.map((size) => (
                <option key={size.id}>{size.name}</option>
              ))}
            </select>
            <input
              className="w-1/3 m-2 ring-1 ring-red-200 rounded-sm selection:ring-red-500 p-2"
              onChange={handleChangeOption}
              type="number"
              name="additionalPrice"
              placeholder="Precio adicional"
              value={option.additionalPrice === 0 ? "" : option.additionalPrice}
            />
            <div
              onClick={() => setOptions((prev) => [...prev, option])}
              className="w-1/3 m-2 self-center bg-red-500 text-center rounded-sm text-white hover:bg-red-600 hover:text-red-100 p-2 cursor-pointer"
            >
              Añadir opcion
            </div>
          </div>

          {options.map((item) => (
            <div
              key={item.title}
              onClick={() =>
                setOptions(options.filter((opt) => opt.title !== item.title))
              }
              className="ring-1 p-3 mt-5 w-40 ring-red-500 rounded-sm cursor-pointer"
            >
              <span>{item.title}</span>
              <span> ${item.additionalPrice}</span>
            </div>
          ))}
        </div>
        <button className="w-full bg-red-500 p-2 rounded-sm text-white hover:bg-red-600 hover:text-red-100 mt-5">
          Crear producto
        </button>
      </form>
    </div>
  );
};

export default NewProductPage;
