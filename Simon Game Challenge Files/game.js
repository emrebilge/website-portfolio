var started = false;

if(!started){
  $(document).one("keypress", function(){
    $("h1").text("Level 0");
    nextSequence();
    started = true;
  });
}

var level = 0;

var userClickedPattern = [];
var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence(){
  level++;
  $("h1").text("Level " + level);
  var num = Math.floor(( Math.random()*4));
  console.log(num);
  var randomColorChoser = buttonColors[num];
  gamePattern.push(randomColorChoser);
  // console.log(randomColorChoser);
  playSound(randomColorChoser);
  animatePress(randomColorChoser);
  $("."+randomColorChoser).fadeIn(100).fadeOut(100).fadeIn(100);
}

$(".btn").click(function(event){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name){
  switch(name){
    case "red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;
    case "blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;
    case "green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;
    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;
    default:
  }
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed")
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(nextSequence, 100);
      userClickedPattern = [];
    }
    
  }else{
    $("h1").text("Game Over, Press Any Key to Restart");
    console.log("wrong");
    $("body").addClass("game-over")
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
}
}

function startOver(){
  level = 0;
  gamePattern = [];
  started
//left off here.
}