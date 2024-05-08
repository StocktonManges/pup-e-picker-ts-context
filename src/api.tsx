import { Dog, dogSchema } from "./types";
import { z } from "zod";

const baseURL = "http://localhost:3000";

export const Requests = {
  getAllDogs: (): Promise<Dog[]> =>
    fetch(`${baseURL}/dogs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch all dogs.");
        }
        return response.json();
      })
      .then((result) => z.array(dogSchema).parse(result)),

  postDog: (dog: Omit<Dog, "id">): Promise<Dog> => {
    const { name, description, image, isFavorite } = dog;
    return fetch(`${baseURL}/dogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, image, isFavorite }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to create ${dog.name}.`);
        }
        return response.json();
      })
      .then((result) => dogSchema.parse(result));
  },

  deleteDog: (id: number): Promise<{ message: string }> =>
    fetch(`${baseURL}/dogs/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to delete dog.");
        }
        return response.json();
      })
      .then(() => ({ message: "Successfully deleted dog" })),

  patchFavoriteForDog: (id: number, moveToFavorite: boolean): Promise<Dog> =>
    fetch(`${baseURL}/dogs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFavorite: moveToFavorite }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to update dog status.");
        }
        return response.json();
      })
      .then((result) => dogSchema.parse(result)),
};
