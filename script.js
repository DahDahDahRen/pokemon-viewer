function app() {
  const inputSearchElement = document.querySelector("#input-search");
  const btnSearchElement = document.querySelector("#btn-search");
  const pokemonSearchResult = document.querySelector("#pokemon-result");

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
    getPokemonRequest("pikachu");
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
}

app();
