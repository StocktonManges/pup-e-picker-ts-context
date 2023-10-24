import { CreateDogForm } from "./Components/CreateDogForm.tsx";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";

export function App() {
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        <Dogs />
        <CreateDogForm />
      </Section>
    </div>
  );
}
