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

let yourPokemon = {};
let selectedEnemy = {};
let yourHp;
let yourAttack;
let enemyHp;
let isEnemyChosen = false;

//choose a character
$("figure").on("click", function() {
  for (let i = 0; i < pokemon.length; i++) {
    if (pokemon[i].name === $(this).attr("id")) {
      yourPokemon = pokemon[i];
      yourHp = yourPokemon.hp;
      yourAttack = yourPokemon.attack;
    }
  }
  $(this).appendTo("#your-character");
  $(this).removeClass("enemy");
  //move unchosen to enemies
  $(".enemy").appendTo("#enemies-area");
  $("figure").off("click");
  //choose an opponent from enemies
  $(".enemy").on("click", function() {
    for (let i = 0; i < pokemon.length; i++) {
      if (pokemon[i].name === $(this).attr("id")) {
        selectedEnemy = pokemon[i];
        enemyHp = selectedEnemy.hp;
      }
    }
    $(this).appendTo("#defender");
    isEnemyChosen = true;
    $(".enemy").off("click");
  });
});

//attack the opponent
$("#attack").on("click", function() {
  if (!isEnemyChosen) return;
  //display results of attack
  $("#comments").html(
    `<p>You attacked ${selectedEnemy.name} for ${yourAttack} damage.</p><p>${selectedEnemy.name} attacked you back for ${selectedEnemy.counter} damage.</p>`
  );
  //adjust your hp
  yourHp -= selectedEnemy.counter;
  $(`#${yourPokemon.name} .hp`).html(yourHp);
  //adjust enemy hp
  enemyHp -= yourAttack;
  $(`#${selectedEnemy.name} .hp`).html(enemyHp);
  //adjust your attack
  yourAttack += yourPokemon.attack;
});
