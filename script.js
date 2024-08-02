function app() {
  const inputSearchElement = document.querySelector("#input-search");
  const btnSearchElement = document.querySelector("#btn-search");
  const pokemonSearchResult = document.querySelector("#pokemon-result");
  const btnInventory = document.querySelector("#btn-inventory");
  const pokemonInventoryDisplay = document.querySelector("#pokemon-inventory");
  const mainPokemonDisplayContainer = document.querySelector("#main-container");
  let savePokemons;

  //! Fetch to pokemon API
  async function fetchPokemonData(searchQuery) {
    try {
      //* Make a GET request
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchQuery}`
      );

      //* Check if response is ok
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      //* Parse response blob
      const pokemon = await response.json();

      //* Return pokemon
      return pokemon;
    } catch (error) {
      //! Display Error
      console.error(error, `Error Msg: ${searchQuery} is not a pokemon!`);
    }
  }

  //! Generate HTML template
  function generatePokemonResultHTML(pokemon) {
    return ` 
        <article class="article-card">
            <header>
                <img src="${pokemon.sprites.front_default}" alt="pokemon-front-sprite"/>
                <p>${pokemon.species.name}</p>
            </header>

            <main class="article-main-container">
                <button class="btn-icon" id="btn-save-pokemon">  <i class="fa-regular fa-bookmark fa-lg" ></i></i></button>
            </main>
        </article>
    `;
  }

  //! Get the result and display to UI
  async function getPokemonRequest(pokemon) {
    //* Make a request to pokemon API
    const result = await fetchPokemonData(pokemon);
    //* Generate a HTML
    const html = generatePokemonResultHTML(result);
    //* Display to UI
    pokemonSearchResult.insertAdjacentHTML("afterbegin", html);
  }

  //! First Load
  document.addEventListener("DOMContentLoaded", () => {
    //* Load a default pokemon
    getPokemonRequest("pikachu");

    //* Check local Storage
    if (!localStorage.getItem("pokemons")) {
      savePokemons = [];
    } else {
      savePokemons = JSON.parse(localStorage.getItem("pokemons"));
    }
  });

  //! Pokemon btn search event
  btnSearchElement.addEventListener("click", async (e) => {
    e.preventDefault();

    //? Check element
    if (!inputSearchElement.value) {
      alert("Please fill up the search input!");
    } else {
      //* Empty result container
      pokemonSearchResult.innerHTML = "";

      //* Request and display to UI
      getPokemonRequest(inputSearchElement.value);
    }
  });

  //! Btn inventory
  btnInventory.addEventListener("click", (e) => {
    e.preventDefault();
    //* Toggle Hide
    pokemonInventoryDisplay.classList.toggle("hide");
  });

  //! Save pokemon display
  mainPokemonDisplayContainer.addEventListener("click", (e) => {
    //? Check the event target
    if (e.target.classList.contains("fa-bookmark")) {
      //* Traverse to article card
      const articleCard = e.target.closest(".article-card");

      //* Get the textContent
      const pokemonsName = articleCard.querySelector("p").textContent;

      //* Save it to save pokemons array
      savePokemons.push(pokemonsName);

      //* Save it to localStorage
      localStorage.setItem("pokemons", JSON.stringify(savePokemons));
    }
  });
}

app();
