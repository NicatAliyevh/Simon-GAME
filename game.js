let colors = ['red', 'blue', 'green', 'yellow'];

let gamePattern = [];
let userClickedArray = [];

let level = 0;

let gameStarted = false;

document.addEventListener('keydown', ()=>{
  if(!gameStarted){
    gameStarted = true;
    $('h1').text("Level " + level);
    nextSequence();
  }
})

document.querySelector('.restart-button').addEventListener('click', ()=>{
  if(!gameStarted){
    gameStarted = true;
    $('h1').text("Level " + level);
    nextSequence();
  }
})

document.querySelectorAll('[type = "button"]').forEach((element)=>{
  element.addEventListener('click', ()=>{
    userClickedArray.push(element.id);
    addSound(element);
    animatePress(element);
    if(!checkPatterns(level)){
      gameOver();
    }
    else if(userClickedArray.length === gamePattern.length){
      if(checkPatterns(level)){
        userClickedArray = [];
        setTimeout(()=>{
          nextSequence();
        }, 1000);
      }
      else{
        gameOver();
      } 
    }
  })  
})



function nextSequence(){
  const randomNumber = Math.floor(Math.random() * 4)
  
  let randomChosenColor = colors[randomNumber];

  level++;
  $('h1').text('Level ' + level);

  gamePattern.push(randomChosenColor);
  const selectedElement = document.getElementById(`${randomChosenColor}`);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio('sounds/'+ randomChosenColor + '.mp3');
  audio.play();
}

function checkPatterns(){
  for(let i = 0; i < userClickedArray.length; i++){
    if(userClickedArray[i] !== gamePattern[i]) return false;
  }
  return true;
}

function addSound(element){
  var audio = new Audio('sounds/' + element.id + '.mp3');
  audio.play();
}

function animatePress(element){
  element.classList.add('pressed');
  setTimeout(()=>{
    element.classList.remove('pressed');
  }, 100);
}

function gameOver(){
  var audio = new Audio('sounds/wrong.mp3');
  audio.play();
  document.body.classList.add('game-over');
  setTimeout(()=>{
    document.body.classList.remove('game-over');
  }, 200);
  gameStarted = false;
  startOver();
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedArray = [];
  $('h1').text('Game Over, Press Any Key to Start');
}