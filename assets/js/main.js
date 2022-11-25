const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const loadPreButton = document.getElementById('loadPreButton')
const pokemonDetailPage = document.getElementById('pokemonDetailPage')
const details = document.getElementById('detailsPage')
const navButtons = document.getElementById('navButtons')
const limit = 12
let offset = 0
let pokemonDetailnumber=0

detailsPage.style.display = 'none'

function loadPokemonItens(offset, limit) {
    if (offset == 0) {
        loadPreButton.style.display = 'none'
    } else {
        loadPreButton.style.display = ''
    }

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML = pokemons.map((pokemon) => `
        <a href="#pokemonDetailPage" style="
        text-decoration: none;" onclick="loadDetails(${pokemon.number})">
    <li class="pokemon ${pokemon.type}">
        <span class="number"># ${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="poketypes">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol><img src="">
            <img src="${pokemon.photo}"
            alt="${pokemon.name} align=right">
        </div>
    </li></a>
    `).join('');
    
    pokemonDetailPage.innerHTML=pokemons.map((pokemon) =>`<div id="pokemonDetailPage2${pokemon.number}"  style="display:none">
    <li class="pokemonpage ${pokemon.type}" id="detailNum${pokemon.number}">

    <div class="detail"><span class="name">${pokemon.name}</span><span></span>
    <span class="name"># ${pokemon.number}</span></div>
    <div class="detail">
    <ol class="poketypes">
    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
    </ol><ol></ol></div>
    <div class="image"><span><br></span><img src="${pokemon.photo}" alt="${pokemon.name} align=right style="max-width: 80%; height: 200px;"><span><br></span>
</div>
<li class=pokemons></li>
<div class=about>
<br>
    About<br><br>
    Height:   ${pokemon.height*10}cm<br>
    Weight:   ${pokemon.weight/10}Kg<br>
    Abilities:   ${pokemon.abilities}<br></div>
         <button class="backToListButton" id="backToList${pokemon.number}" type="backToList" onclick="backToList(${pokemon.number})">
         back
         </button></li></div>`).join('')

        })
         
}

loadPokemonItens(offset, limit)


loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItens(offset, limit)
})

loadPreButton.addEventListener('click', () => {
    offset -= limit
    loadPokemonItens(offset, limit)
})

function loadDetails(detailNumber){
    pokemonDetailnumber='pokemonDetailPage2'+detailNumber
    const pokemonDetailnumberElement=document.getElementById(pokemonDetailnumber)
    pokemonDetailnumberElement.style.display=''
    detailsPage.style.display = ''
    pokemonList.style.display='none'
    navButtons.style.display='none'


}

function backToList(detailNumber) {
    pokemonDetailnumber='pokemonDetailPage2'+detailNumber
    const pokemonDetailnumberElement=document.getElementById(pokemonDetailnumber)
    pokemonDetailnumberElement.style.display='none'
     detailsPage.style.display = 'none'
    pokemonList.style.display=''
    navButtons.style.display=''
    window.scrollTo(0, 0);
    window.history.back();
}
