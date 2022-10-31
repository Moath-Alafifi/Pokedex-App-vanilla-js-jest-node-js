import { pokemonContainer } from "./pokemonContainer.js";
import { savedPokemons } from "./savedPokemons.js";
import { popupContainer } from "./popupContainer.js";
import { searchPokemons } from "./searchPokemon.js";
export const fetchPokemons = async () => {
  const rangeInt = Math.floor(Math.random() * 150);
  try {
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=8&offset=0`);
    let data = await res.json();
    let pokemonData = data.results.map(async (pokemon) => {
      let res = await fetch(pokemon.url);
      let data = await res.json();
      return data;
    });

    return Promise.all(pokemonData);
  } catch (err) {
    let pokemonContainer = document.getElementById("pokemon-container");
    pokemonContainer.innerHTML = "server err";
    pokemonContainer.style.height = "80vh";
    pokemonContainer.style.fontWeight = "800";
    pokemonContainer.style.color = "#fff";
    pokemonContainer.style.fontSize = "50px";
    window.alert("fff");
  }
};

pokemonContainer();
popupContainer();
savedPokemons();
searchPokemons();
