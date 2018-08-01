var colors = [];
var pickedColor;
var numSquares = 6;
var win = 0;
var lose = 0;
var trys = 3;
var gameOver = false;
var colorDisplay = document.querySelector('#colorDisplay');
var squares = document.querySelectorAll('.squares');
var gameState = document.querySelector('#gameState');
var resetButton = document.querySelector('#reset');
var modeButtons = document.querySelectorAll('.mode');
var h1 = document.querySelector('h1');
var counter = document.querySelectorAll('.winLose');

init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}


function randomColor() {
  var r = Math.floor(Math.random()*256);
  var g = Math.floor(Math.random()*256);
  var b = Math.floor(Math.random()*256);

  return "rgb("+r+", "+g+", "+b+")";
}

function generateRandomColors(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function pickColor() {
  var random = Math.floor(Math.random()*colors.length);
  return colors[random];
}

function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "New Colors";
  gameState.textContent = "";
  h1.style.background = "steelblue";
  trys = Math.floor(numSquares/2);
  gameOver = false;
  counter[0].textContent = trys;
  for (var i = 0; i < squares.length; i++) {
   if(colors[i]){
     squares[i].style.display = "block";
     squares[i].style.background = colors[i];
   }
   else{
     squares[i].style.display = "none";
   }
  }
}

resetButton.addEventListener('click',reset);

function setupSquares() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click',function() {
      if (!gameOver) {
        if(this.style.background === pickedColor){
          gameState.textContent = "You Won!!! Congratulations ";
          resetButton.textContent = "Play Again?";
          h1.style.background = pickedColor;
          changeColors(pickedColor);
          win++;
          counter[1].textContent = win;
          gameOver = true;
        }
        else{
          if (trys===0) {
            gameState.textContent = "You Lose";
            this.style.background = pickedColor;
            h1.style.background = pickedColor;
            resetButton.textContent = "Play Again?";
            changeColors(pickedColor);
            lose++;
            counter[2].textContent = lose;
            gameOver = true;
          } else {
            gameState.textContent = "Try Again";
            this.style.background = "#232323";
            this.style.display = "none";
            trys--;
            counter[0].textContent = trys;
          }
        }
      }
    });
  }
}

function changeColors(color) {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.background = color;
  }
}

function setupModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener('click',function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? numSquares=3:numSquares=6;
      reset();
    });
  }
}
