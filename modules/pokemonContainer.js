import { fetchPokemons } from "./index.js";

export const pokemonContainer = () =>
  fetchPokemons().then((pokemons) => {
    pokemons.map((pokemon) => {
      let pokemonId = pokemon.id;
      let pokemonImg = pokemon.sprites.front_default;
      let pokemonName = pokemon.name;
      let pokemonType = pokemon.types.map((pokemon) => " " + pokemon.type.name);
      let pokemonContainer = document.getElementById("pokemon-container");

        pokemonContainer.innerHTML += `
        <div id="pokemon-card-${pokemonId}" data-modal-target="#modal-${pokemonId}"
        class="pokemon-card">
        <h6>${pokemonId}</h6> 
        <img class='card-img' src=${pokemonImg} />
        <h1 id="${pokemonName}">${pokemonName}</h1>
        <p>${pokemonType}</p>
        <div class='checkbox'>
        <label class="switch" for="Captured-${pokemonId}"> 
        <h5>Captured</h5>
        <input type="checkbox" id="Captured-${pokemonId}" name="Captured" 
        value='${pokemonId}'/> 
        <span class="slider round"></span>
        </label>
        </div>
        </div>` ;
    });
  });
