let pokemonRepository = (function() {
    let pokemonList = [
        { name: 'Bulbasaur', height: 7, types: ['grass', 'posion'] },
        { name: 'Weedle', height: 3, types: ['bug', 'poison'] },
        { name: 'Golbat', height: 16, types: ['poison', 'flying'] },
        { name: 'Doduo', height: 14, types: ['flying', 'normal'] }
    ];

    function add(pokemon) {
        if( typeof pokemon === 'object' && 'name' in pokemon && 'height' in pokemon && 'types' in pokemon) {
            pokemonList.push(pokemon);
        }else {
            console.warn('Pokemon introduced incorrectly');
        }
    }

    // creating the elements of the <ul> with Js.

    function addListItem(pokemon) {
        let pokemonUl = document.querySelector('.pokemon-list');
        let liItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        pokemonUl.appendChild(liItem);
        liItem.appendChild(button);

        button.addEventListener('click', function() {
            console.log(pokemon.name);
        })
        // If statements that adds a <p> element if the height of a pokemon is greater than 16.
        if(pokemon.height >= 16) {
            paragraph = document.createElement('p');
            paragraph.innerText = " Wow, that's big!";
            liItem.appendChild(paragraph);
        }
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})();

pokemonRepository.getAll().forEach(function(item) {
    pokemonRepository.addListItem(item);
});