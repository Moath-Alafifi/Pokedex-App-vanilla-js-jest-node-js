import { fetchPokemons } from "./index.js";

export const searchPokemons = () =>
  fetchPokemons().then((pokemons) => {
    pokemons.map((pokemon) => {
      let searchButton = document.getElementById("search");
      let cardContainer = document.getElementById(`pokemon-card-${pokemon.id}`);
      let pokemonName = document.getElementById(pokemon.name);
      searchButton.addEventListener("keyup", (e) => {
        if (pokemonName.innerText.includes(e.target.value)) {
          cardContainer.style.display = "flex";
        } else {
          cardContainer.style.display = "none";
        }
      });
    });
  });
