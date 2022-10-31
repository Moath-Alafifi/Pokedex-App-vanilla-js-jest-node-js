jest.mock("./index.js");

import { pokemonContainer } from "./pokemonContainer.js";
import { fetchPokemons } from "./index";
import { popupContainer } from "./popupContainer";
import { savedPokemons } from "./savedPokemons";
test("works with async/await", async () => {
  return fetchPokemons().then((pokemons) => {
    expect(pokemons.length).toEqual(1);
  });
});

test(" test the dom of pokemonContainer", async () => {
  document.body.innerHTML = `
  <div id="pokemon-container"></div>
  <div id="overlay"></div>
  `;

  return pokemonContainer().then(() => {
    let pokemonContainer = document.getElementById("pokemon-container");
    expect(pokemonContainer.innerHTML).toBe(`
        <div id="pokemon-card-1" data-modal-target="#modal-1" class="pokemon-card">
        <h6>1</h6> 
        <img class="card-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png">
        <h1 id="bulbasaur">bulbasaur</h1>
        <p> grass, poison</p>
        <div class="checkbox">
        <label class="switch" for="Captured-1"> 
        <h5>Captured</h5>
        <input type="checkbox" id="Captured-1" name="Captured" value="1"> 
        <span class="slider round"></span>
        </label>
        </div>
        </div>`);
  });
});

test("test the dom of popupContainer", async () => {
  document.body.innerHTML = `
  <div id="popup-container"></div>
  <div id="overlay"></div>
  `;

  return popupContainer().then(() => {
    let popupContainer = document.getElementById("popup-container");

    expect(popupContainer.innerHTML).toBe(`
        <div id=\"modal-1\" class=\"modal pokemon-card\">
        <button data-close-button=\"\" class=\"close-button\">✖</button>
        <img src=\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png\">
        <h1>bulbasaur</h1>
        <hr>
        <h3>type(s)</h3>
        <p class=\"pokemon-type\"> grass, poison</p>
        <hr>
        <h3>Stats</h3>
        <div class=\"pokemon-stat\"><div class=\"container-progress\">
      <p class=\"stat-name\">hp:</p>
      <div id=\"progress\">
      <div id=\"bar\" style=\"width:45%\"><span id=\"percent\">45%</span></div>
      </div>
      </div>
     <div class=\"container-progress\">
      <p class=\"stat-name\">attack:</p>
      <div id=\"progress\">
      <div id=\"bar\" style=\"width:49%\"><span id=\"percent\">49%</span></div>
      </div>
      </div>
     <div class=\"container-progress\">
      <p class=\"stat-name\">defense:</p>
      <div id=\"progress\">
      <div id=\"bar\" style=\"width:49%\"><span id=\"percent\">49%</span></div>
      </div>
      </div>
     <div class=\"container-progress\">
      <p class=\"stat-name\">special-attack:</p>
      <div id=\"progress\">
      <div id=\"bar\" style=\"width:65%\"><span id=\"percent\">65%</span></div>
      </div>
      </div>
     <div class=\"container-progress\">
      <p class=\"stat-name\">special-defense:</p>
      <div id=\"progress\">
      <div id=\"bar\" style=\"width:65%\"><span id=\"percent\">65%</span></div>
      </div>
      </div>
     <div class=\"container-progress\">
      <p class=\"stat-name\">speed:</p>
      <div id=\"progress\">
      <div id=\"bar\" style=\"width:45%\"><span id=\"percent\">45%</span></div>
      </div>
      </div>
     </div>
        <hr>
        <h3>Moves</h3> 
        <ul><li>razor-wind</li><li>swords-dance</li><li>cut</li><li>bind</li><li>vine-whip</li><li>headbutt</li><li>tackle</li><li>body-slam</li><li>take-down</li><li>double-edge</li><li>growl</li><li>strength</li><li>mega-drain</li><li>leech-seed</li><li>growth</li></ul>
        </div>`);
  });
});

test("local storage test", async () => {
  document.body.innerHTML = `
  <input type="checkbox" id="Captured-1" name="Captured" 
  value='1'/> 
  `;
  return savedPokemons().then(() => {
    let checkbox = document.getElementById(`Captured-1`);
    const spy = jest.spyOn(Storage.prototype, "setItem");
    checkbox.click();
    expect(spy).toHaveBeenCalled();
    const spyRemove = jest.spyOn(Storage.prototype, "removeItem");
    checkbox.click();
    expect(spyRemove).toHaveBeenCalled();
  });
});
