import { fetchPokemons } from "./index.js";

export const popupContainer = () =>
  fetchPokemons().then((pokemons) => {
    pokemons.map((pokemon) => {
      let pokemonId = pokemon.id;
      let pokemonImg = pokemon.sprites.front_default;
      let pokemonName = pokemon.name;
      let pokemonType = pokemon.types.map((pokemon) => " " + pokemon.type.name);
      let pokemonStat = pokemon.stats
        .map(
          (pokemon) =>
            `<div class="container-progress">
      <p class="stat-name">${pokemon.stat.name}:</p>
      <div id="progress">
      <div id="bar" style="width:${pokemon.base_stat}%"><span id="percent">${pokemon.base_stat}%</span></div>
      </div>
      </div>
     `
        )
        .join("");

      let pokemonMove = pokemon.moves
        .map((pokemon) => `<li>${pokemon.move.name}</li>`)
        .slice(0, 15)
        .join("");
      let popupContainer = document.getElementById("popup-container");

      popupContainer.innerHTML += `
        <div id='modal-${pokemonId}' class='modal pokemon-card'>
        <button data-close-button class="close-button" >&#10006;</button>
        <img  src=${pokemonImg} />
        <h1>${pokemonName}</h1>
        <hr>
        <h3>type(s)</h3>
        <p class="pokemon-type">${pokemonType}</p>
        <hr>
        <h3>Stats</h3>
        <div class="pokemon-stat">${pokemonStat}</div>
        <hr>
        <h3>Moves</h3> 
        <ul>${pokemonMove}</ul>
        </div>`;

      const openModalButtons = document.querySelectorAll("[data-modal-target]");
      const closeModalButtons = document.querySelectorAll(
        "[data-close-button]"
      );
      let overlay = document.getElementById("overlay");

      overlay.addEventListener("click", () => {
        const modals = document.querySelectorAll(".modal.active");
        modals.forEach((modal) => {
          closeModal(modal);
        });
      });

      openModalButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const modal = document.querySelector(button.dataset.modalTarget);
          const captured = document.getElementById(`Captured-${pokemonId}`);

          if (
            e.target.tagName == "SPAN" ||
            e.target.tagName == captured.tagName ||
            e.target.tagName == "H5"
          )
            return;
          openModal(modal);
        });
      });

      closeModalButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const modal = button.closest(".modal");
          closeModal(modal);
        });
      });
    });

    function openModal(modal) {
      if (modal == null) return;
      modal.classList.add("active");
      overlay.classList.add("active");
    }

    function closeModal(modal) {
      if (modal == null) return;
      modal.classList.remove("active");
      overlay.classList.remove("active");
    }
  });
