let pokemonList = [
    {
        name: 'Bulbasaur',
        height: 7,
        types: ['grass','posion']
    },
    {
        name: 'Weedle',
        height: 3,
        types: ['bug','poison']
    },
    {
        name: 'Golbat',
        height: 16,
        types: ['poison','flying']
    },
    {
        name: 'Doduo',
        height: 14,
        types: ['flying','normal'] 
    }
]

// 'for' loop that iterates through the list and returns the 'name' and the 'height' of each object in the list. If the height of an object is greater
// than 16, it will also add the 'highlightNote' variable.

let highlightNote = " -Wow that's big!";

for(i=0; i < pokemonList.length; i++) {
    document.write('<ul class="pokemon-list">');  // created a <ul> that will contain the <li> created by if else statements
    if(pokemonList[i].height >= 16){
        document.write('<li>'+pokemonList[i].name +' (height:'+ pokemonList[i].height +')' + `${highlightNote}`+ '</li>');
    }else{
        document.write('<li>' + pokemonList[i].name +' (height:'+ pokemonList[i].height +')' +'</li>');
    }
    document.write('</ul');  // closed the </ul> here so that it will wrap all the <li> elements
}
