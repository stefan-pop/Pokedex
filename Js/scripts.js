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

        // calling the 'addEvent' function.
        addEvent(button, function() {
            showDetails(pokemon);
        });
    }

    // function that takes the 'button' and the 'showDetails' function as arguments.
    // It adds an event listener to the button that is calling the 'showDetails' function.
    function addEvent(button, showDetails) {
        button.addEventListener('click', showDetails);
    }

    function showDetails(pokemon) {
        console.log(pokemon.name);
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