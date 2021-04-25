let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150/';

    function add(pokemon) {
        if( typeof pokemon === 'object' && 'name' in pokemon) {
            pokemonList.push(pokemon);
        }else {
            console.warn('Pokemon introduced incorrectly');
        }
    }

    // creating the elements of the <ul> with Js.

    function addListItem(pokemon) {
        let pokemonUl = document.querySelector('.list-group');
        let liItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = 'Show details';
        let pokemonName = document.createElement('h4');
        pokemonName.innerText = pokemon.name;
        liItem.classList.add('list-group-item');
        button.classList.add('btn');
        button.classList.add('btn-info');
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#exampleModal');
        pokemonUl.appendChild(liItem);
        liItem.appendChild(button);
        liItem.appendChild(pokemonName);

        //adding an event to the button to display a pokemon when it is clicked.
        button.addEventListener('click', function(event){
            showDetails(pokemon);
        })
    }

    function showDetails(pokemonObject) {
        loadDetails(pokemonObject).then(function() {
            let title = pokemonObject.name;
            let text = ` Height: ${pokemonObject.height}`;
            let image = pokemonObject.imageUrl;
            //adding an if statment that adds some extra text if the height of a pokemon exceeds a size
            let highlightNote = ' --Wow, that\'s big!';
            if (pokemonObject.height > 16) {
                text = ` Height: ${pokemonObject.height}  ${ highlightNote} `;
            }
        });
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
    
    // function that loads the details by fetching the url of each pokemon
    function loadDetails(y) {
        let url = y.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            y.imageUrl = details.sprites.front_default;
            y.height = details.height;
            y.types = details.types;
        }).catch(function(error) {
            console.log(error);
        })
    } 

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(item) {
        pokemonRepository.addListItem(item);
    });
})