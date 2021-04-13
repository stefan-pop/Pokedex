let pokemonRepository = (function() {
    let pokemonList = [
        {name: 'Bulbasaur', height: 7, types: ['grass','posion']},
        {name: 'Weedle', height: 3, types: ['bug','poison']},
        {name: 'Golbat', height: 16, types: ['poison','flying']},
        {name: 'Doduo', height: 14, types: ['flying','normal'] }
    ];

    function add(pokemon) {
        if( typeof(pokemon) === 'object') {
            let pokeomnProperties = Object.keys(pokemon);
            if( pokeomnProperties.includes('name', 0) && pokeomnProperties.includes('height', 1) && pokeomnProperties.includes('types', 2)){
                pokemonList.push(pokemon);
                console.log('Pokemon successfully added');
            }
        }else{
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
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };
})();

// 'forEach' loop that iterates through the list and returns the 'name' and the 'height' of each object in the list. If the height of an object is greater
// than 16, it will also add the 'highlightNote' variable.

let highlightNote = " -Wow that's big!";

document.write('<ul class="pokemon-list">');  // created a <ul> that will contain the <li> created by if else statements

pokemonRepository.getAll().forEach(function(item) {
    if(item.height >= 16){
        document.write('<li>'+'<h1>'+ item.name +'</h1>' + '<p>' + ' Height: '+ item.height +  `${highlightNote}`+ '</p>' + '</li>');
    }else{
        document.write('<li>'+'<h1>' + item.name +'</h1>' + '<p>' +' Height: '+ item.height + '</p>' +'</li>');
    }
});

document.write('</ul');  // closed the </ul> here so that it will wrap all the <li> elements
