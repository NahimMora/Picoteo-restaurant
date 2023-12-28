"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const LoginPage = () => {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <section className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center">
      <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[85%] md:w-full lg:w-[60%] 2xl:w-1/2">
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image
            src={"/loginBg.png"}
            alt="Login Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-10 flex flex-col gap-8 md:w-1/2">
          <h1 className="font-bold text-xl xl:text-3xl">Bienvenido!</h1>
          <p>
            Inicie sesión en su cuenta o cree una nueva utilizando los botones.
          </p>
          <button
            className="flex gap-4 p-4 ring-1 ring-orange-100 rounded-md"
            onClick={() => signIn("google")}
          >
            <Image
              src={"/google.png"}
              alt=""
              width={25}
              height={25}
              className="object-contain"
            />
            <span>Inicia sesión con Google</span>
          </button>
          <button
            className="flex gap-4 p-4 ring-1 ring-slate-100 rounded-md"
            onClick={() => signIn("github")}
          >
            <Image
              src={"/github.svg"}
              alt=""
              width={30}
              height={30}
              className="object-contain"
            />
            <span>Inicia sesión con Github</span>
          </button>
          <p className="text-sm">
            Tienes un problema?{" "}
            <Link href={"/"} className="underline">
              Contactanos
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
