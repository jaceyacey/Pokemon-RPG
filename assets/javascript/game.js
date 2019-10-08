const pokemon = [
  {
    name: "Bulbasaur",
    hp: 140,
    attack: 8,
    counter: 16
  },
  {
    name: "Charmander",
    hp: 120,
    attack: 12,
    counter: 24
  },
  {
    name: "Squirtle",
    hp: 160,
    attack: 10,
    counter: 20
  },
  {
    name: "Pikachu",
    hp: 100,
    attack: 14,
    counter: 28
  }
];

let isPokemonChosen = false;

//display characters to choose from

//choose a character
$(".pokemon").click(function() {
  if (isPokemonChosen) return;
  isPokemonChosen = true;
  $("#bulbasaur").appendTo("#enemies-area");
  $("#charmander").appendTo("#enemies-area");
  $("#squirtle").appendTo("#enemies-area");
  $("#pikachu").appendTo("#enemies-area");
  $(this).appendTo("#your-character");
});

//choose an opponent

//attack the opponent
