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
$("figure").on("click", function() {
  $(this).removeClass("pokemon");
  $(".pokemon").addClass("enemy");
  $(".enemy").appendTo("#enemies-area");
  $(this).appendTo("#your-character");
  $("figure").off("click");
  //choose an opponent
  $(".enemy").on("click", function() {
    $(this).appendTo("#defender");
    $(".enemy").off("click");
  });
  //attack the opponent
});
