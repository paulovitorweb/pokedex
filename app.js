const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(250).fill().map((_, index) =>
  fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => {
  // Função responsável por criar os lis
  return pokemons.reduce((accumulator, pokemon) => {
    const types = pokemon.types.map(typeInfo => typeInfo.type.name)
    
    accumulator += `
      <li class="card ${types[0]}">
        <img class="card-image" alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" />
        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
        <p class="card-subtitle">${types.join(' | ')}</p>
      </li>
    `
    return accumulator
  }, '')
}

const insertPokemonsIntoPage = pokemons => {
  // Função responsável por inserir os lis na pokedex
  const ul = document.querySelector('[data-js="pokedex"]')
  ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(insertPokemonsIntoPage)