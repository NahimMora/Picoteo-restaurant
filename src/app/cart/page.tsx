"use client";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const CartPage = () => {
  const { products, totalItems, totalPrice, removeToCart, clearToCart } =
    useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleCheckout = async () => {
    if (totalPrice === 0) {
      return;
    }
    if (!session) {
      router.push("/");
    } else {
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: totalPrice,
            products,
            status: "Not Paid",
            userEmail: session.user.email,
          }),
        });
        const data = await res.json();
        router.push(`/pay/${data}`);
      } catch (error) {}
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-y-auto lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {/* SINGLE ITEM */}
        {products.length === 0 ? (
          <span className="cursor-pointer text-xl">
            <Link href={"/menu"}>🛒 Compra aquí</Link>
          </span>
        ) : (
          products.map((item) => (
            <div
              className="flex items-center justify-between mb-4"
              key={item.id}
            >
              {item.img && (
                <Image src={item.img} alt="" width={100} height={100} />
              )}
              <div className="">
                <h1 className="uppercase text-xl font-bold">
                  {item.title} x {item.quantity}
                </h1>
                <span>{item.optionTitle}</span>
              </div>
              <h2 className="font-bold">${item.price}</h2>
              <span
                className="cursor-pointer"
                onClick={() => removeToCart(item)}
              >
                X
              </span>
            </div>
          ))
        )}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Subtotal ({totalItems} productos)</span>
          <span className="">${totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Costo de servicio</span>
          <span className="">$0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="">Costo de delivey</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">TOTAL</span>
          <span className="font-bold">${totalPrice}</span>
        </div>
        <button
          className="bg-red-500 text-white p-3 rounded-md w-1/2 self-end"
          onClick={handleCheckout}
        >
          PAGAR
        </button>
        <button onClick={() => (clearToCart as any)()}>Vaciar carrito</button>
      </div>
    </div>
  );
};

export default CartPage;
