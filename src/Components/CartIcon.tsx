"use client";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const CartIcon = () => {
  const { data: session, status } = useSession();

  const { totalItems } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <>
      {!session?.user.isAdmin ? (
        <Link href={"/cart"} className="flex items-center gap-4">
          <span>Carrito ({totalItems})</span>
        </Link>
      ) : (
        <Link href={"/newProduct"}>
          <span>Crear producto</span>
        </Link>
      )}
    </>
  );
};

export default CartIcon;
