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
$("#start-area").prepend("<h2>Your Character</h2>");

//choose a character
$(".pokemon").click(function() {
  if (isPokemonChosen) return;
  isPokemonChosen = true;
  $("#enemies-area").html("<h2>Enemies Available to Attack</h2>");
  $("#bulbasaur").appendTo("#enemies-area");
  $("#charmander").appendTo("#enemies-area");
  $("#squirtle").appendTo("#enemies-area");
  $("#pikachu").appendTo("#enemies-area");
  $(this).appendTo("#start-area");
});

//choose an opponent

//attack the opponent
