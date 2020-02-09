var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var keyPress = false;
var keyStart = "a";
var countPress = 1;
var level = 0;

$(document).keypress(function(event) {
  var keyEvent = event.key;

  if (keyEvent === keyStart) {
    countPress--;

    if (keyEvent === keyStart && countPress == 0) {
      keyPress = true;
      detectButton();
    } else {
      keyPress = false;
      console.log(event.key);
    }
  } else {
    console.log(keyPress);
  }
});

$("h1").click(function(event){
countPress--;

if(countPress===0)
{
  keyPress = true;
  detectButton();
  console.log("click");
}
else{
  keyPress = false;
}
});

function detectButton() {

  if (keyPress === true) {
    nextSequence();
    $("h1").text("Level " + level);
  } else {
    console.log("keyPress");
  }
}


$(".btn").click(function() {
  var userChoosenColour = $(this).attr("id");
  userClickedPattern.push(userChoosenColour);
  playSound(userChoosenColour);
  animatePress(userChoosenColour);
  // console.log(userChoosenColour);



  checkAnswer(userClickedPattern.length - 1);

});


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    // console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {



    $("h1").text("Game Over, Press HERE or 'A' Key to Restart");

    $("body").addClass("game-over");
    playSound("wrong");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }

}

function startOver(){

  level = 0;
  gamePattern = [];
  countPress = 1;
  keyPress=false;

}


function nextSequence() {

  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  // create random number between 0 -3
  var randomNumber = Math.floor(Math.random() * 4);
  // select random colour
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // console.log(randomNumber);

  playSound(randomChosenColour);
  checkAnswer(randomChosenColour);

}


function playSound(name) {

  $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}


function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
