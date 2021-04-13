let pokemonRepository = (function() {
    let pokemonList = [
        { name: 'Bulbasaur', height: 7, types: ['grass', 'posion'] },
        { name: 'Weedle', height: 3, types: ['bug', 'poison'] },
        { name: 'Golbat', height: 16, types: ['poison', 'flying'] },
        { name: 'Doduo', height: 14, types: ['flying', 'normal'] }
    ];

    function add(pokemon) {
        if (typeof(pokemon) === 'object') {
            let pokeomnProperties = Object.keys(pokemon);
            if (pokeomnProperties.includes('name', 0) && pokeomnProperties.includes('height', 1) && pokeomnProperties.includes('types', 2)) {
                pokemonList.push(pokemon);
                console.log('Pokemon successfully added');
            }
        } else {
            console.warn("The pokemon couldn't be added ! Please insert an object with both the 'name' and the 'height' of the pokemon in this order.");
        }
    }

    // creating the elements of the <ul> with Js.

    function addListItem(pokemon) {
        //select the necessary elements.
        let pokemonUl = document.querySelector('.pokemon-list');
        let liItem = document.createElement('li');
        let button = document.createElement('button');
        //setting the name for the button, the name of the objects in the pokemonList.
        button.innerText = pokemon.name;
        // appending and adding the class that styles the buttons.
        button.classList.add('pokemon-button');
        pokemonUl.appendChild(liItem);
        liItem.appendChild(button);

        // calling the 'addEvent' function.
        addEvent(button, showDetails(pokemon));
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