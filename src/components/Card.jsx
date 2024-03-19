import { useState, useEffect } from "react";
import "./../App.css";

function Card({
  id,
  name,
  image,
  addToCollection,
  isInCollection,
  removeFromCollection,
  handleToastMessage,
  editPokemon,
  removePokemon,
}) {
  const [isHeartClicked, setIsHeartClicked] = useState(isInCollection);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedImage, setEditedImage] = useState(image);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditedName(name);
    setEditedImage(image);
  }, [name, image]);

  const handleClick = () => {
    if (isHeartClicked) {
      setIsHeartClicked(false);
      removeFromCollection(id);
      handleToastMessage("Successfully removed from collection!");
    } else {
      addToCollection({ id, name, image });
      setIsHeartClicked(true);
      handleToastMessage("Successfully added to collection!");
    }
  };

  const handleEdit = () => {
    editPokemon(id, editedName, editedImage);
    setIsEditing(false);
    setModalOpen(false);
  };

  const handleDelete = () => {
    removePokemon(id);
  };

  const createStringId = (id) => {
    if (id < 10) {
      return "000" + id.toString();
    }
    if (id > 10 && id < 100) {
      return "00" + id.toString();
    }
    if (id > 100 && id < 1000) {
      return "0" + id.toString();
    }
    if (id > 1000) {
      return id.toString();
    }
  };

  function capitalizeFirstLetter(string) {
    return string.substring(0, 1).toUpperCase() + string.substring(1);
  }

  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };

  const handleDeleteModalToggle = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  return (
    <div className="bg-white rounded-xl py-3 px-3 shadow-md">
      <div className="flex justify-between mt-2 mx-2 mb-2 gap-2">
        <div className="flex gap-2">
          {/* Button Edit */}
          <button
            onClick={handleModalToggle}
            className="bg-white rounded-full shadow-sm"
          >
            <svg
              fill="#F4C41E"
              className="w-5 h-5 hover:fill-yellow-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
            </svg>
          </button>

          {/* Button Delete */}
          <button
            onClick={handleDeleteModalToggle}
            className="bg-white rounded-full shadow-sm"
          >
            <svg
              fill="#FF4343"
              className="w-5 h-5 hover:fill-red-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
          </button>
        </div>
        {/* Button Collection */}
        <button
          onClick={handleClick}
          className="bg-white rounded-full shadow-sm"
        >
          <svg
            fill={isHeartClicked ? "#FF0000" : "#a8a8a8"}
            className="w-6 h-6 hover:fill-secondary"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
          </svg>
        </button>
      </div>
      <img src={image} width={300} className="rounded-md" />
      <div className="px-2 mb-2 mt-2">
        <p className="text-primary font-bold text-lg">{createStringId(id)}</p>
        <h1 className="text-xl font-semibold text-textcolor">
          {capitalizeFirstLetter(name)}
        </h1>
      </div>

      {/* Edit Modal */}
      <div
        id="edit-modal"
        className={`${
          modalOpen ? "" : "hidden"
        } fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex flex-col">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-textcolor">
                  Edit Pokémon
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
            <div className="px-4 md:px-5 pb-4 md:pb-6 pt-2 md:pt-3">
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEdit();
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
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-textcolor text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary block w-full p-2.5"
                  />
                </div>
                <div className="pb-2">
                  <label className="block mb-2 text-sm font-medium text-textcolor">
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={(e) =>
                      setEditedImage(URL.createObjectURL(e.target.files[0]))
                    }
                    className="block w-full bg-gray-50 border border-gray-300 text-textcolor text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary p-2.5 cursor-pointer"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary hover:bg-[#DDB11B] font-medium rounded-full text-sm px-5 py-2.5 text-center"
                >
                  Edit Pokémon
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <div
        id="delete-modal"
        className={`${
          deleteModalOpen ? "" : "hidden"
        } fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex flex-col">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-textcolor">
                  Delete Pokémon
                </h3>
                <button
                  type="button"
                  onClick={handleDeleteModalToggle}
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
            <div className="px-4 md:px-5 pb-4 md:pb-6 pt-2 md:pt-3">
              <p className="mb-4 text-base text-text4">
                Are you sure want to{" "}
                <span className="text-secondary font-semibold">delete</span>{" "}
                this Pokémon?
              </p>
              <button
                onClick={handleDelete}
                type="submit"
                className="w-full text-white bg-secondary hover:bg-red-800 font-medium rounded-full text-sm px-5 py-2.5 text-center"
              >
                Delete Pokémon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
