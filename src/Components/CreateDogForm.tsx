import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { UseDogs } from "../Providers/DogsProvider";

export const CreateDogForm = () => {
  const [selectedImage, setSelectedImage] = useState<string>(
    dogPictures.BlueHeeler
  );
  const [nameInput, setNameInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const { isLoading, onClickFunctions, activeFilter } = UseDogs();

  const resetForm = () => {
    setNameInput("");
    setDescriptionInput("");
    setSelectedImage(dogPictures.BlueHeeler);
  };

  return activeFilter !== "create" ? null : (
    <form
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        void onClickFunctions
          .createDog({
            name: nameInput,
            description: descriptionInput,
            image: selectedImage,
            isFavorite: false,
          })
          .then(() => resetForm());
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
        disabled={isLoading}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name="description"
        id="description"
        cols={80}
        rows={10}
        value={descriptionInput}
        onChange={(e) => setDescriptionInput(e.target.value)}
        disabled={isLoading}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id="picture"
        name="picture"
        value={selectedImage}
        onChange={(e) => {
          setSelectedImage(e.target.value);
        }}
        disabled={isLoading}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" value="Submit" disabled={isLoading} />
    </form>
  );
};
