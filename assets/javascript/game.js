const bulbasaur = $("#bulbasaur");
const charmander = $("#charmander");
const squirtle = $("#squirtle");
const pikachu = $("#pikachu");
let myPokemon;
let isPokemonChosen = false;

//choose a character
$(".pokemon").click(function() {
  if (isPokemonChosen) return;
  myPokemon = this.id;
  console.log(myPokemon);
  isPokemonChosen = true;
});

//choose an opponent

//attack the opponent
