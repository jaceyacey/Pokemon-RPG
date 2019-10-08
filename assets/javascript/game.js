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

//choose a character, unchosen move to enemies
$(".pokemon").on("click", function() {
  $("#bulbasaur").appendTo("#enemies-area");
  $("#charmander").appendTo("#enemies-area");
  $("#squirtle").appendTo("#enemies-area");
  $("#pikachu").appendTo("#enemies-area");
  $(this).appendTo("#your-character");
  $(".pokemon").off("click");
});

// //choose an opponent from enemies to defend
// $("#enemies-area #bulbasaur").on("click", function() {
//   $(this).appendTo("#defender");
// });
//attack the opponent
