"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";
import { signOut, useSession } from "next-auth/react";

const links = [
  { id: 1, title: "Inicio", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);

  const { status } = useSession();

  const handleSignOut = () => {
    signOut();
    setOpen(false);
  };

  return (
    <section>
      <Image
        src={open ? "/close.png" : "/open.png"}
        alt="MenuIcon"
        width={20}
        height={20}
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      />
      {open && (
        <div className="bg-red-500 text-white absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center p-10 text-3xl z-10">
          {links.map((item) => (
            <Link href={item.url} key={item.id} onClick={() => setOpen(false)}>
              {item.title}
            </Link>
          ))}
          <div>
            {status === "authenticated" ? (
              <div className="flex flex-col gap-8">
                <Link href="/orders" onClick={() => setOpen(false)}>
                  Ordenes
                </Link>
                <span className="ml-4 cursor-pointer" onClick={handleSignOut}>
                  Logout
                </span>
              </div>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
            )}
          </div>
          <Link href={"/cart"} onClick={() => setOpen(false)}>
            <CartIcon />
          </Link>
        </div>
      )}
    </section>
  );
};

export default Menu;
