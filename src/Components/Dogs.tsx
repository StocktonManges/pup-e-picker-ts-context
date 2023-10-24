import { UseDogs } from "../Providers/DogsProvider";
import { DogCard } from "./DogCard";

export const Dogs = () => {
  const { allDogs, activeFilter, onClickFunctions } = UseDogs();
  return (
    <>
      {allDogs.map((dog) => {
        const shouldDisplay = () => {
          switch (activeFilter) {
            case "all":
              return true;
            case "create":
              return false;
            case "favorited":
              return dog.isFavorite;
            case "unfavorited":
              return !dog.isFavorite;
          }
        };
        if (!shouldDisplay()) {
          return;
        }
        return (
          <DogCard
            dog={dog}
            onEmptyHeartClick={() => onClickFunctions.favoriteDog(dog.id)}
            onHeartClick={() => onClickFunctions.unfavoriteDog(dog.id)}
            onTrashIconClick={() => onClickFunctions.deleteDog(dog.id)}
            key={dog.id}
          />
        );
      })}
    </>
  );
};
