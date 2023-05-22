
const pokemonList = document.getElementById('pokemonList');
const LoadMoreButton = document.getElementById('LoadMoreButton');
const maxRecords = 1000
const limit = 50;
let offset = 0;

function LoadPokemonItens(offset, limit) {

    PokeAPI.getPokemons(offset, limit)
    .then((PokeList = []) => {
        const NewHTML = PokeList.map((pokemon) => `

            <li class="Pokemon ${pokemon.type}">
        
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
            
                    <div class="Detail">
                        <ol>
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
        
            </li>

        `).join('');

        pokemonList.innerHTML += NewHTML
    })
}

LoadPokemonItens(offset, limit)

LoadMoreButton.addEventListener('click', () => {
    offset += limit
    LoadPokemonItens(offset, limit)

    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        LoadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        LoadPokemonItens(offset, limit)
    }
})
