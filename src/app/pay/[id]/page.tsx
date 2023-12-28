"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/utils/store";
import { ActionType } from "@/types/types";

const PayPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const { clearToCart }: ActionType = useCartStore();

  const handleBuy = async () => {
    try {
      await fetch(`/api/success`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id),
      });
      clearToCart();
      toast.success("Compra realizada!");
      router.push("/orders");
    } catch (error) {}
  };

  return (
    <section className="h-[calc(100vh-9rem)] md:h-[calc(100vh-15rem)] flex flex-col justify-center">
      <div className="flex flex-col items-center justify-center p-10 ring-1 ring-red-500 m-5 md:mx-40 rounded-md">
        <Image src={"/cart.png"} width={20} height={20} alt="Icon" />
        <span className="text-red-500 text-xl p-4 text-center">
          Este es un sitio web ficticio. No se procesarán transacciones reales.
        </span>
      </div>

      <div className="flex justify-around p-5">
        <button
          onClick={handleBuy}
          className="bg-red-500 p-2 w-24 text-center ring-1 ring-red-300 rounded-md text-white cursor-pointer hover:bg-red-400"
        >
          Comprar
        </button>
        <span className="bg-red-500 p-2 w-24 text-center ring-1 ring-red-300 rounded-md text-white cursor-pointer hover:bg-red-400">
          <Link href={"/"}>Continuar comprando</Link>
        </span>
      </div>
    </section>
  );
};

export default PayPage;
