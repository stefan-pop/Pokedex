let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150/';
    let modalContainer = document.querySelector('#modal-container');

    function add(pokemon) {
        if( typeof pokemon === 'object' && 'name' in pokemon) {
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
        button.addEventListener('click', function(event){
            showDetails(pokemon);
        })
    }

    function showDetails(pokemonObject) {
        loadDetails(pokemonObject).then(function() {
            let title = ` Name: ${pokemonObject.name}`;
            let text = ` Height: ${pokemonObject.height}`;
            let image = pokemonObject.imageUrl;
            //adding an if statment that adds some extra text if the height of a pokemon exceeds a size
            let highlightNote = ' --Wow, that\'s big!';
            if (pokemonObject.height > 16) {
                text = ` Height: ${pokemonObject.height}  ${ highlightNote} `;
            }
            showModal(title, text, image);
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

    // Creating the modal that will display details of each pokemon item (name,height,image )
    function showModal(title, text, image) {
        //deleting everything inside the modal container each time the function runs from the beginnig
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        //creating the close button of the modal
        let closeButton = document.createElement('button');
        closeButton.classList.add('modal-close');
        closeButton.innerText = 'Close';
        closeButton.addEventListener('click', hideModal);

        //creating the title of the modal that will hold the name of the pokemon
        modalTitle = document.createElement('h1');
        modalTitle.innerText = title;

        //creating a paragraph that will hold the height of the pokemon
        let modalParagraph = document.createElement('p');
        modalParagraph.innerText = text;

        //creating an image element that will hold the image of the pokemon
        let modalImage = document.createElement('img');
        modalImage.src = image;

        //appending the created elemets accordingly
        modal.appendChild(closeButton);
        modal.appendChild(modalTitle);
        modal.appendChild(modalParagraph);
        modal.appendChild(modalImage);
        modalContainer.appendChild(modal);

        //adding the .is-visible class to show and style the modal
        modalContainer.classList.add('is-visible')
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
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