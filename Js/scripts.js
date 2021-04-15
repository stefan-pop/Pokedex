let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150/';

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

        //adding an event to the button to display a pokemon when it is clicked.
        button.addEventListener('click', function(){
            showDetails(pokemon);
        })

        // If statements that adds a <p> element if the height of a pokemon is greater than 16.
        if(pokemon.height >= 16) {
            paragraph = document.createElement('p');
            paragraph.innerText = " Wow, that's big!";
            liItem.appendChild(paragraph);
        }
    }


    function showDetails(x) {
        console.log(x);
    }

    function getAll() {
        return pokemonList;
    }

    function loadList() {
        return fetch(apiUrl).then(function(response) {
            return response.json();
        }).then(function(json) {
            json.results.forEach(function(item) {
                let list = { name: item.name, detailsUrl: item.url}
                add(list);
            })
        }).catch(function(error) {
            console.log(error);
        })
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList
    };
})();

pokemonRepository.getAll().forEach(function(item) {
    pokemonRepository.addListItem(item);
});