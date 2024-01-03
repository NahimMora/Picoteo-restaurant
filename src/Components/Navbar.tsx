"use client";
import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import CartIcon from "./CartIcon";
import UserLinks from "./UserLinks";

const Navbar = () => {
  return (
    <section className="h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40">
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">Inicio</Link>
        <Link href="/menu">Menu</Link>
        <CartIcon />
      </div>
      {/* LOGO */}
      <div className="text-xl md:font-bold flex-1 md:text-center">
        <Link href="/">Picoteo</Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <UserLinks />
      </div>
    </section>
  );
};

export default Navbar;
