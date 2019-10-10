const pokemon = [
  {
    name: "Bulbasaur",
    hp: 204,
    attack: 12,
    counter: 18
  },
  {
    name: "Charmander",
    hp: 146,
    attack: 20,
    counter: 22
  },
  {
    name: "Squirtle",
    hp: 190,
    attack: 14,
    counter: 20
  },
  {
    name: "Pikachu",
    hp: 138,
    attack: 26,
    counter: 26
  }
];

let isCharacterChosen = false;
let isDefenderChosen = false;
let character;
let characterHp;
let totalAttack;
let defender;
let defenderHp;
let enemiesLeft = 3;

//CHOOSE CHARACTER AND DEFENDER
$(".pokemon").on("click", function() {
  //select a character
  if (!isCharacterChosen) {
    $(this)
      .addClass("character")
      .removeClass("enemy");
    $(".character").appendTo("#your-character");
    isCharacterChosen = true;
    //assign stats to character
    for (let i = 0; i < pokemon.length; i++) {
      if (pokemon[i].name === $(this).attr("id")) {
        character = pokemon[i];
        characterHp = character.hp;
        //set base attack level
        totalAttack = character.attack;
      }
    }
    //move unchosen to enemies
    $(".enemy").appendTo("#enemies-area");
  } else {
    //select an opponent
    if (
      !isDefenderChosen &&
      !$(this).hasClass("character") &&
      characterHp > 0
    ) {
      $(this).addClass("defender");

      isDefenderChosen = true;
      //assign stats to defender
      for (let i = 0; i < pokemon.length; i++) {
        if (pokemon[i].name === $(this).attr("id")) {
          defender = pokemon[i];
          defenderHp = defender.hp;
        }
      }
      //move defender to defender area
      $(".defender").appendTo("#defender");
    }
  }
});

//ATTACK
$("#attack").on("click", function() {
  if (!isDefenderChosen || enemiesLeft < 1) return;
  //display results of attack
  $("#comments").html(
    `<p>You attacked ${defender.name} for ${totalAttack} damage.</p><p>${defender.name} attacked you back for ${defender.counter} damage.</p>`
  );
  //adjust character hp
  characterHp -= defender.counter;
  $(`#${character.name} .hp`).html(characterHp);
  //adjust enemy hp
  defenderHp -= totalAttack;
  $(`#${defender.name} .hp`).html(defenderHp);
  //adjust character attack
  totalAttack += character.attack;
  //DEFEATED DEFENDER

  if (defenderHp < 1) {
    //figure disappears
    $(".defender").css("visibility", "hidden");
    //adjust enemies left
    enemiesLeft -= 1;
    //if no opponents available, WIN GAME
    if (enemiesLeft < 1) {
      $("#comments").html("You won!!! GAME OVER!!!");
      reset();
    } else {
      //else choose new opponent
      $("#comments").html(
        `<p>You have defeated ${defender.name}. You can choose to fight another enemy.</p>`
      );
      isDefenderChosen = false;
    }
  }
  // CHARACTER DEFEATED
  if (characterHp < 1) {
    //loss comment
    $("#comments").html("<p>You have been defeated... GAME OVER!!!</p>");
    reset();
  }
});

const reset = () => {
  //show reset button
  $("#end-game").css("display", "block");
  //restart game
  $("#restart").on("click", function() {
    $(".pokemon")
      //make all pokemon visible
      .css("visibility", "visible")
      //reset classes
      .removeClass("character defender")
      .addClass("enemy")
      //move all pokemon back to start area
      .appendTo("#start-area");
    //reset stats
    isCharacterChosen = false;
    isDefenderChosen = false;
    enemiesLeft = 3;
    //reset hp
    for (let i = 0; i < pokemon.length; i++) {
      $(`#${pokemon[i].name} .hp`).html(`${pokemon[i].hp}`);
    }
    //empty comments
    $("#comments").empty();
    //hide reset button
    $("#end-game").css("display", "none");
  });
};

//after game has been reset, when choosing new character
//the one click makes this the character AND the defender
