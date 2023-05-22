const PokeAPI = {}


function ConvertPokeAPIDetailToPokemon (PokeDetail) {
    const pokemon = new Pokemon()
    pokemon.name = PokeDetail.name
    pokemon.number = PokeDetail.id

    const types = PokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type1] = types

    pokemon.types = types
    pokemon.type =  types

    pokemon.photo = PokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

PokeAPI.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(ConvertPokeAPIDetailToPokemon)
}


PokeAPI.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    fetch(url)
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(PokeAPI.getPokemonsDetail))
        .then((DetailsRequests) => Promise.all(DetailsRequests))
        .then((pokemonDetails) => pokemonDetails)
}
