// Variables to track the game state
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;  // Variable to check if the game has started
var level = 0;  // Variable to track the current level

// Set initial h1 title
$("#level-title").text("Press A Key to Start");

// Detect keypress event
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);  // Update the game level title to Level 0 when game starts
    nextSequence();
    started = true;  // Set the game as started
  }
});

// Function to generate the next sequence
function nextSequence() {
  userClickedPattern = [];  // Reset the userClickedPattern each time nextSequence is called
  level++;  // Increment the level
  $("#level-title").text("Level " + level);  // Update the level title

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Event handler for button clicks
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Call checkAnswer() after a user has clicked and chosen their answer
  checkAnswer(userClickedPattern.length - 1);
});

// Function to play sound
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

// Function to animate button press
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver(){
	level=0;
	gamePattern=[];
	started = false;  


}

// Function to check the user's answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    
    console.log("wrong");
    playSound("./sounds/wrong.mp3");  // Play the wrong sound

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
