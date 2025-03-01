
const pokeApi={}

function convertPokeapiDetailToPokemon(pokeDetail){
    const pokemon=new Pokemon()
    pokemon.number=pokeDetail.id
    pokemon.name=pokeDetail.name
    const types= pokeDetail.types.map((typeSlot)=>typeSlot.type.name)
    const [type]=types
    pokemon.types=types
    pokemon.type=type
    pokemon.photo=pokeDetail.sprites.other.dream_world.front_default
    pokemon.height=pokeDetail.height
    pokemon.weight=pokeDetail.weight
    const abilities= pokeDetail.abilities.map((abilitySlot)=>abilitySlot.ability.name)
    const [ability]=abilities
    pokemon.abilities=abilities
    pokemon.ability=ability
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon)=>{
    return fetch(pokemon.url)
    .then((response)=>response.json())
    .then(convertPokeapiDetailToPokemon)
}

pokeApi.getPokemons = (offset=0,limit=10)=>{
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons)=> pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequest)=>Promise.all(detailRequest))
    .then((pokemonDetails)=>pokemonDetails)
    .catch((error) => console.log(error))
}



