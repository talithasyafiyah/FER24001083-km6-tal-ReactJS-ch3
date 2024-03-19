import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import Toast from "./components/SuccessToast";
import axios from "axios";
import { IMAGE_API_URL, POKEMON_API_URL } from "./config";
import SuccessToast from "./components/SuccessToast";
import DangerToast from "./components/DangerToast";

function PokemonList() {
  const [pokemonData, setPokemonData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [collection, setCollection] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [toastMessage, setToastMessage] = useState("");
  const [errorToastMessage, setErrorToastMessage] = useState("");
  const [visibleCards, setVisibleCards] = useState(16);
  const [cardsToAdd, setCardsToAdd] = useState(16);
  const [visibleCollectionCards, setVisibleCollectionCards] = useState(16);
  const [collectionCardsToAdd, setCollectionCardsToAdd] = useState(16);

  useEffect(() => {
    axios.get(POKEMON_API_URL + "?limit=200").then((response) => {
      if (response.status >= 200 && response.status < 300) {
        const { results } = response.data;
        let newPokemonData = [];
        results.forEach((pokemon, index) => {
          index++;
          let pokemonObject = {
            id: index,
            url: IMAGE_API_URL + index + ".png",
            name: pokemon.name,
          };
          newPokemonData.push(pokemonObject);
        });
        setPokemonData(newPokemonData);
      }
    });
  }, []);

  const addPokemon = (newName, newImage) => {
    const nextId = pokemonData.length + 1;

    const itemExists = pokemonData.some(
      (item) => item.name.toLowerCase() === newName.toLowerCase()
    );

    if (newName.trim() === "" || newImage.trim() === "") {
      setModalOpen(true);
      handleErrorToastMessage("Pokémon name and image cannot be empty!");
    } else if (itemExists) {
      setModalOpen(true);
      handleErrorToastMessage("Data already exists!");
    } else {
      setPokemonData([
        ...pokemonData,
        { id: nextId, name: newName, url: newImage },
      ]);
      setModalOpen(false);
      handleToastMessage("Pokémon added successfully!");
    }
  };

  const addToCollection = (pokemon) => {
    setCollection([...collection, pokemon]);
  };

  const removeFromCollection = (pokemonId) => {
    const updatedCollection = collection.filter(
      (pokemon) => pokemon.id !== pokemonId
    );
    setCollection(updatedCollection);
  };

  const removeAllFromCollection = () => {
    setCollection([]);
  };

  const filteredCollection = activeTab === "collection" ? collection : [];

  const isInCollection = (pokemonId) => {
    return collection.some((pokemon) => pokemon.id === pokemonId);
  };

  useEffect(() => {
    if (pokemonData) {
      const filtered = pokemonData.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pokemon.id.toString().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [pokemonData, searchTerm]);

  const handleSortOption = (option) => {
    setSortOption(option);
    setIsDropdownOpen(false);
    let sortedData = [...filteredData];
    if (option === "Lowest") {
      sortedData.sort((a, b) => a.id - b.id);
    } else if (option === "Highest") {
      sortedData.sort((a, b) => b.id - a.id);
    }
    setFilteredData(sortedData);
  };

  const handleLoadMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + cardsToAdd);
  };

  const handleCollectionLoadMore = () => {
    setVisibleCollectionCards(
      (prevVisibleCards) => prevVisibleCards + collectionCardsToAdd
    );
  };

  const handleToastMessage = (message) => {
    setToastMessage(message);
  };

  const handleErrorToastMessage = (errorMessage) => {
    setErrorToastMessage(errorMessage);
  };

  const closeSuccessToast = () => {
    setToastMessage("");
  };

  const closeErrorToast = () => {
    setErrorToastMessage("");
  };

  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-[#F8F8F8]">
      <div className="container mt-12 py-12">
        {/* Intro and Add Button */}
        <div className="flex flex-col md:flex-row justify-between text-textcolor items-start md:items-center">
          <p className="text-base font-medium mb-2 md:mb-0">
            Add pokémon to your list and collect them!
          </p>
          <button
            onClick={handleModalToggle}
            className="py-2 px-4 text-base font-medium bg-primary text-white rounded-full items-center hover:bg-[#DDB11B]"
          >
            Add Pokémon
          </button>

          <div
            id="add-modal"
            className={`${
              modalOpen ? "" : "hidden"
            } fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50`}
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* Modal Content */}
              <div className="relative bg-white rounded-lg shadow">
                {/* Modal Header */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-xl font-semibold text-textcolor">
                      Add New Pokémon
                    </h3>
                    <button
                      type="button"
                      onClick={handleModalToggle}
                      className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-textcolor rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                </div>
                {/* Modal Body */}
                <div className="px-4 md:px-5 pb-4 md:pb-6 pt-2 md:pt-3">
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const newName = e.target.elements.name.value;
                      const newImage = e.target.elements.image.value;
                      addPokemon(newName, newImage);
                      e.target.reset();
                    }}
                  >
                    <div>
                      <label className="block mb-2 text-sm font-medium text-textcolor">
                        Pokémon Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Pokémon name.."
                        className="bg-gray-50 border border-gray-300 text-textcolor text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary block w-full p-2.5"
                      />
                    </div>
                    <div className="pb-2">
                      <label className="block mb-2 text-sm font-medium text-textcolor">
                        Image Path
                      </label>
                      <input
                        type="text"
                        name="image"
                        id="image"
                        placeholder="Pokémon image path.."
                        className="bg-gray-50 border border-gray-300 text-textcolor text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary block w-full p-2.5"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-primary hover:bg-[#DDB11B] font-medium rounded-full text-sm px-5 py-2.5 text-center"
                    >
                      Add Pokémon
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 my-4">
          <div className="w-full md:w-3/4">
            <div class="relative w-full">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                id="search"
                class="w-full items-center rounded-full text-base shadow-md px-8 py-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Search by name or number.."
              />

              <svg
                class="items-center absolute right-6 top-5 h-5 w-5 text-primary"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          </div>

          <div className="w-full md:w-1/4">
            <div className="w-full relative">
              <button
                onClick={toggleDropdown}
                className="w-full text-textcolor shadow-md bg-white font-medium rounded-full text-sm py-[18px] text-center items-center focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                type="button"
              >
                <div className="flex justify-between items-center px-7">
                  <p className="text-base">
                    {sortOption !== "" ? sortOption + " Number" : "Sort By"}
                  </p>
                  <svg
                    className={`w-4 h-4 ms-3 text-primary ${
                      isDropdownOpen ? "transform rotate-180" : ""
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                  <ul
                    className="py-2 text-sm text-gray-700"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <button
                        onClick={() => handleSortOption("Lowest")}
                        className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                      >
                        Lowest Number
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleSortOption("Highest")}
                        className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                      >
                        Highest Number
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Toastify */}
        {toastMessage && (
          <SuccessToast message={toastMessage} onClose={closeSuccessToast} />
        )}

        {errorToastMessage && (
          <DangerToast
            errorMessage={errorToastMessage}
            onClose={closeErrorToast}
          />
        )}

        {/* Tabs */}
        <div class="border-b border-gray-200 mb-6">
          <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-text-color">
            <li class="me-2">
              <a
                onClick={() => handleTabClick("all")}
                class={`cursor-pointer inline-flex items-center justify-center p-4 text-base font-semibold border-b-2 rounded-t-lg ${
                  activeTab === "all"
                    ? "text-primary border-primary"
                    : "border-transparent"
                }`}
                aria-current={activeTab === "all" ? "page" : undefined}
              >
                All
              </a>
            </li>
            <li class="me-2">
              <a
                onClick={() => handleTabClick("collection")}
                class={`cursor-pointer inline-flex items-center justify-center p-4 text-base font-semibold border-b-2 rounded-t-lg ${
                  activeTab === "collection"
                    ? "text-primary border-primary"
                    : "border-transparent"
                }`}
              >
                Collection
              </a>
            </li>
          </ul>
        </div>

        {/* Delete Button in Collection */}
        <div className="flex justify-end mb-4">
          {activeTab === "collection" && filteredCollection.length > 0 && (
            <button
              onClick={removeAllFromCollection}
              className="py-2 px-4 text-base font-medium bg-secondary text-white rounded-full items-center hover:bg-red-800"
            >
              Delete all Pokémon
            </button>
          )}
        </div>

        {/* Card */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {activeTab === "all" &&
            filteredData &&
            filteredData
              .slice(0, visibleCards)
              .map((pokemon) => (
                <Card
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.url}
                  addToCollection={() => addToCollection(pokemon)}
                  removeFromCollection={() => removeFromCollection(pokemon.id)}
                  isInCollection={isInCollection(pokemon.id)}
                  handleToastMessage={handleToastMessage}
                />
              ))}
          {activeTab === "collection" &&
            filteredCollection &&
            filteredCollection.map((pokemon) => (
              <Card
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.url}
                addToCollection={addToCollection}
                removeFromCollection={() => removeFromCollection(pokemon.id)}
                isInCollection={true}
                handleToastMessage={handleToastMessage}
              />
            ))}
        </div>

        {/* Load More*/}
        {activeTab === "all" &&
          filteredData &&
          visibleCards < filteredData.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="py-2 px-10 text-base font-medium bg-primary text-white rounded-full items-center hover:bg-[#DDB11B]"
              >
                Load More
              </button>
            </div>
          )}

        {activeTab === "collection" &&
          filteredCollection.length > visibleCollectionCards && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleCollectionLoadMore}
                className="py-2 px-10 text-base font-medium bg-primary text-white rounded-full items-center hover:bg-[#DDB11B]"
              >
                Load More
              </button>
            </div>
          )}
      </div>
    </div>
  );
}

export default PokemonList;
