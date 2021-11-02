var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var startGameKey = 0;
var started = false;

//detect when a keyboard key has been pressed,
//when that happens for the first time, call nextSequence().
$(document).keydown(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = this.id; //store the id of the button that got clicked.
  //Add the contents of the variable userChosenColour created, to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour); // play the sound for the button selected colour .
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});

function nextSequence() {
  /*Once nextSequence() is triggered, reset the userClickedPattern
  to an empty array ready for the next level*/
  userClickedPattern = [];

  $("h1").text("Level " + level);
  //var randomNumber = 1 + Math.floor(Math.random()*3); (how to calculate random number)
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //Refactor the code in playSound() so that it will work for both playing sound in
  //nextSequence() and when the user clicks a button.
  playSound(randomChosenColour);
  level++;
}

function playSound(name) {
  //the "name" its just to "reserve" space, you can name it whatever you want.
  //inside the function, everthing that has "name" will be replaced.
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function gameOver() {
  $("body").addClass("game-over");

  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}

function startOver() {
  gamePattern = [];
  level = 1;
  started = false;
}

/* The checkAnswer function is called each time a button is clicked and firsts
checks if the clicked button matches the last color in the game pattern
(which is the one color that was added to the pattern for the current level
through the most recent execution of the newSequence function (newSequence
really just adds one color at a time). However just because it matches doesn't
mean one completed the pattern because there can be the same color twice in one
game pattern. So it secondly checks to make sure the userClickedPattern is the
same length as the game pattern which means that the correct color choice was
clicked as the end of the pattern. After this the only way any single click will
pass and won't end the game is if it is the correct one.

It is basically a nested if statement. Firstly it checks if the
gamePattern[currentLevel] === userClickedPattern[currentLevel]) the currentLevel
is passed in by the checkedAnswer function which passes the userClickedPattern.length-1.
Check answer is called every time you press a color, and it is based on the length
of the userClickedPattern which resets every nextSequence, which is triggered
when you press the correct answers.
So in your example, the gamePattern = ["red", "blue", "yellow"], and the
userClickPattern = ["red"], when you clicked red, it basically checked your
choice against gamePattern[0] (userClickedPattern.length-1), and that matches,
then it checks if the userClickedPattern.length === gamePattern.length which it
does not. The function is then done cause the If clause was fulfilled. Then you
press another button, "green"  and the gamePattern=["red", "blue", "yellow"].
the userClickedPattern=["red", "green"] now. This time the if statement checks
if gamePattern[1](blue) === userClickedPattern[1](green). In this case it does
not, so it invokes the else clause and tell you it is wrong */
function checkAnswer(currentLevel) {
  /*check if the most recent user answer is the same as the game pattern.
  If so then log "success", otherwise log "wrong".*/
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    /*If the user got the most recent answer right, then check that
    they have finished their sequence with another if statement.*/
    if (userClickedPattern.length === gamePattern.length) {

      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    gameOver();
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
