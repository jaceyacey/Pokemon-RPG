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

//=================================================
//        CHOOSE CHARACTER AND DEFENDER
//=================================================
$(".pokemon").on("click", function() {
  // hide start area
  $("#start-area").css("display", "none");
  //-----------------------
  //  SELECTING CHARACTER
  //-----------------------
  if (!isCharacterChosen) {
    $(this)
      .addClass("character")
      .removeClass("enemy hover");

    //show character and enemies areas
    $("#your-character, #enemies-area").css("display", "block");

    //move character to character area
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
    $(".enemy")
      .appendTo("#enemies-area")
      .addClass("black");
  } else {
    //--------------------
    // SELECTING OPPONENT
    //--------------------
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

      //show defender area and fight section
      $("#defender, #fight-section").css("display", "block");

      //move defender to defender area
      $(".defender").appendTo("#defender");

      //remove comments
      $("#comments").empty();

      //remove hover effects on defender and remaining enemies
      $(".enemy").removeClass("hover");

      //add hover effects to attack button
      $(".button").addClass("hover");
    }
  }
});

//================================================
//                        ATTACK
//================================================
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

  //==========================
  //     WHEN DEFENDER DEAD
  //==========================
  if (defenderHp < 1) {
    //figure disappears
    $(".defender").css("display", "none");

    //adjust enemies left
    enemiesLeft -= 1;

    //remove hover effect on attack button
    $(".button").removeClass("hover");

    //hide defender and fight sections
    $("#defender, #fight-section").css("display", "none");

    //=============================================================
    // if no opponents available                       WIN GAME
    //=============================================================
    if (enemiesLeft < 1) {
      //hide sections
      $("#fight-section").css("display", "none");
      $("#enemies-area").hide();

      $("#comments").html(`
        <p>You attacked ${defender.name} for ${totalAttack} damage.</p><p>${defender.name} attacked you back for ${defender.counter} damage.</p>
        <p><strong>YOU WON!!! GAME OVER!!!</strong></p>`);
      reset();
    } else {
      //---------------------------------------------------------
      // else choose new opponent                  CONTINUE GAME
      //---------------------------------------------------------

      $("#comments").html(
        `<p>You attacked ${defender.name} for ${totalAttack} damage.</p><p>${defender.name} attacked you back for ${defender.counter} damage.</p>
        <p><strong>You have defeated ${defender.name}. You can choose to fight another enemy.</strong></p>`
      );
      isDefenderChosen = false;
      //add hover effects to enemies
      $(".enemy").addClass("hover");
    }
  }
  // ==============================================================
  // if character defeated                            LOSE GAME
  // ==============================================================
  if (characterHp < 1) {
    //loss comment
    $("#comments").html(`
    <p>You attacked ${defender.name} for ${totalAttack} damage.</p><p>${defender.name} attacked you back for ${defender.counter} damage.</p>
    <p><strong>You have been defeated... GAME OVER!!!</strong></p>`);

    //hide attack button
    $("#fight-section").css("display", "none");
    reset();
  }
});

const reset = () => {
  //show reset button
  $("#end-game").css("display", "block");
  $("#restart .button").addClass("hover");

  //  =======================================
  //             GAME RESET
  //  =======================================
  $("#restart").on("click", function() {
    $(".pokemon")
      //make all pokemon visible
      .css("display", "inline-block")

      //reset classes
      .removeClass("character defender")
      .addClass("enemy")

      //move all pokemon back to start area
      .appendTo("#start-area");

    //reset stats
    isCharacterChosen = false;
    isDefenderChosen = false;
    enemiesLeft = 3;

    //reset html hp
    for (let i = 0; i < pokemon.length; i++) {
      $(`#${pokemon[i].name} .hp`).html(`${pokemon[i].hp}`);
    }

    //empty comments
    $("#comments").empty();

    //hide reset button and your character section
    $("#end-game, #your-character").css("display", "none");

    // show start area
    $("#start-area").css("display", "block");

    //change back border style to black
    $("figure").css("border", "1px solid black");

    //add hover effects to pokemon
    $(".pokemon").addClass("hover");
  });
};

//=================================================================
//    ANSWER KEY
//=================================================================
//  B -> C -> P -> S
//  S -> B -> C -> P
//  C -> S -> B -> P
//  P -> B -> S -> C
//==================================================================
