import { useState } from "react";
import "./../App.css";

function HeroSection() {
  return (
    <div className="container mt-32">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 flex items-center justify-center mr-0 md:mr-8">
          <div className="text-left">
            <h1 className="text-4xl font-bold text-textcolor mb-4">
              Pokévault
            </h1>
            <p>
              Welcome to Pokévault! Dive into the enchanting
              world of Pokémon as you manage and organize your personal
              collection.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/3 my-16 md:my-0">
          <div
            className="bg-white rounded-full flex justify-center items-cente"
            style={{ boxShadow: "0 0px 20px 8px rgba(118, 161, 209, 0.9)" }}
          >
            <img src="/images/pokemon/wartortle.gif" className="w-[200px] md:w-[280px]" />
          </div>
        </div>
        <div className="w-full md:w-1/3 flex items-center justify-center ml-0 md:ml-10">
          <div className="text-left">
            <p className="mb-4">
              Keep track of the Pokémon you're eager to catch, and mark the
              Pokémon you've already caught.
            </p>
            <button className="py-2 px-4 inline-flex text-base font-medium bg-primary text-white rounded-full items-center hover:bg-[#DDB11B]">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
