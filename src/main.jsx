import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import PokemonList from "./PokemonList.jsx";
import Temporary from "./Temporary.jsx";
import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/HeroSection.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <Navbar />
    <HeroSection />
    <PokemonList />
  </div>
);
