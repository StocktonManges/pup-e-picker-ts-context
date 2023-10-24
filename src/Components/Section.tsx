import { ReactNode } from "react";
import { UseDogs } from "../Providers/DogsProvider";

export const Section = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  const { allDogs, activeFilter, onClickFunctions } = UseDogs();
  const favDogs = allDogs.reduce(
    (sum, dog) => (dog.isFavorite ? sum + 1 : sum),
    0
  );
  const unfavDogs = allDogs.length - favDogs;
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${
              activeFilter === "favorited" ? "active" : ""
            }`}
            onClick={() => {
              onClickFunctions.toggleActiveFilter("favorited");
            }}
          >
            favorited ( {favDogs} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              activeFilter === "unfavorited" ? "active" : ""
            }`}
            onClick={() => {
              onClickFunctions.toggleActiveFilter("unfavorited");
            }}
          >
            unfavorited ( {unfavDogs} )
          </div>
          <div
            className={`selector ${activeFilter === "create" ? "active" : ""}`}
            onClick={() => {
              onClickFunctions.toggleActiveFilter("create");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
