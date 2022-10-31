import { fetchPokemons } from "./index.js";

export const savedPokemons = () =>
  fetchPokemons().then((pokemons) => {
    pokemons.map((pokemon) => {
      let checkbox = document.getElementById(`Captured-${pokemon.id}`);
      checkbox.addEventListener("click", (e) => {
        if (e.target.value == pokemon.id) {
          if (checkbox.checked) {
            localStorage.setItem(pokemon.id, JSON.stringify(pokemon));
          } else {
            localStorage.removeItem(pokemon.id);
          }
        }
      });

      let retrievedObject = localStorage.getItem(pokemon.id);
      let savedData = JSON.parse(retrievedObject);

      if (savedData) {
        checkbox.checked = true;
      }
    });
  });
