import { useState } from "react";
import "./../App.css";

function Navbar() {
  return (
    <nav className="py-3 px-3 bg-white fixed top-0 w-full z-10 shadow-md">
      <div className="container flex justify-between items-center">
        <a href="#">
          <img src="/images/logo/logo.png" width={130} />
        </a>
        <div className="hidden md:flex items-center gap-2">
          <img src="/images/logo/pikachu.png" />
          <p className="text-base font-medium text-black">Pokémon</p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
