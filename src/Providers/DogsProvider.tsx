import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dog, FilterOptions } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

type OnClickFunctions = {
  toggleActiveFilter: (value: FilterOptions) => void;
  deleteDog: (id: number) => void;
  favoriteDog: (id: number) => void;
  unfavoriteDog: (id: number) => void;
  createDog: (dog: Omit<Dog, "id">) => Promise<string | void>;
};

type TypeDogsContext = {
  allDogs: Dog[];
  isLoading: boolean;
  activeFilter: FilterOptions;
  onClickFunctions: OnClickFunctions;
};

export const DogsContext = createContext({} as TypeDogsContext);
export const UseDogs = () => useContext(DogsContext);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<FilterOptions>("all");

  const refetchAllDogs = () => {
    Requests.getAllDogs()
      .then((dogs) => setAllDogs(dogs))
      .catch((error: object) => toast.error(error.toString()));
  };

  const resetAllDogs = (error: object) => {
    setAllDogs(allDogs);
    refetchAllDogs();
    toast.error(error.toString());
  };

  const onClickFunctions = {
    toggleActiveFilter: (selectedFilter: FilterOptions) => {
      setActiveFilter(activeFilter === selectedFilter ? "all" : selectedFilter);
    },

    createDog: (dog: Omit<Dog, "id">) => {
      setIsLoading(true);
      return Requests.postDog(dog)
        .then(() => {
          refetchAllDogs();
          toast.success(`Dog created.`);
        })
        .catch((error: object) => toast.error(error.toString()))
        .finally(() => setIsLoading(false));
    },

    deleteDog: (id: number) => {
      const copyAllDogs = allDogs;
      allDogs.map((dog, i) => (dog.id === id ? copyAllDogs.splice(i, 1) : dog));
      setAllDogs([...copyAllDogs]);
      Requests.deleteDog(id)
        .then(() => toast.success("Successfully deleted dog."))
        .catch((error: object) => resetAllDogs(error));
    },

    favoriteDog: (id: number) => {
      setAllDogs(
        allDogs.map((dog) =>
          dog.id === id ? { ...dog, isFavorite: true } : dog
        )
      );
      Requests.patchFavoriteForDog(id, true).catch((error: object) =>
        resetAllDogs(error)
      );
    },

    unfavoriteDog: (id: number) => {
      setAllDogs(
        allDogs.map((dog) =>
          dog.id === id ? { ...dog, isFavorite: false } : dog
        )
      );
      Requests.patchFavoriteForDog(id, false).catch((error: object) =>
        resetAllDogs(error)
      );
    },
  };

  useEffect(() => {
    refetchAllDogs();
  }, []);

  return (
    <DogsContext.Provider
      value={{
        allDogs,
        isLoading,
        activeFilter,
        onClickFunctions,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};
