var slider = document.getElementById("myRange");
var goButton = document.getElementById("goBtn");
var resetButton = document.getElementById("resetBtn");
var kickButton = document.getElementById("kickBtn");

slider.oninput = function () {
  force = this.value;
};

let size = 80;
let movement = 400;
let speed;
let moving = false;
let button;
let force = 125;
let counter = 0;
let kickoff = true;
let fieldGoal = 51;
let score = 0;
let downs = 4;
let fieldGoalInt;
let newGame = false;

function setup() {
  kickButton.disabled = true;
  size = diskSize();
  createCanvas(300, 400);
  goButton.addEventListener("click", launchFootball);
  resetButton.addEventListener("click", restart);
  kickButton.addEventListener("click", bonusPoints);
  resetBtn.disabled = true;
}

function draw() {
  background(0, 170, 0);
  ellipse(200, movement, size);
  text(size, 193, movement);
  text("End Zone", 120, 25);
  line(0, 40, 300, 40);
  if (moving) {
    movement = movement - speed;
    background(0, 170, 0);
    ellipse(200, movement, size);
    text(size, 193, movement);
    text("End Zone", 120, 25);
    line(0, 40, 300, 40);
    counter++;
    if (counter > 42) {
      moving = false;
      resetBtn.disabled = false;
      keepScore();
      //fieldGoalFcn();
      //restart()
    }
  }
}

function launchFootball() {
  goButton.disabled = true;
  speed = (force / size) * 4;
  moving = true;
}

function diskSize() {
  let temp = Math.floor(Math.random() * 80) + 20;
  // Returns a random integer from 20 to 100:
  return temp;
}

function fieldGoalFcn() {
  kickButton.disabled = false;
  resetBtn.disabled = true;

  fieldGoalInt = setInterval(function () {
    if (kickoff) {
      fieldGoal++;
    } else {
      fieldGoal--;
    }
    if (fieldGoal == 199 || fieldGoal == 51) {
      kickoff = !kickoff;
    }
    slider.value = fieldGoal;
  }, 3);
}

function keepScore() {
  downs = downs - 1;
  document.getElementById("downs").innerHTML = downs;

  let points = 0;

  if (movement + size / 2 >= 0) {
    points = 400 - movement;
    points = points / 4;
    score = score + points;
  }
  document.getElementById("demo").innerHTML = Math.floor(score);
  if (movement + size / 2 >= 0 && movement - size / 2 <= 40) {
    fieldGoalFcn();
    console.log("touchdown");
  } else if (downs <= 0) {
    gameOver();
    newGame = true;
  }
}

function restart() {
  if (newGame) {
    score = 0;
    document.getElementById("demo").innerHTML = score;
    downs = 4;
    document.getElementById("downs").innerHTML = downs;
    newGame = false;
  }

  slider.disabled = false;
  goButton.disabled = false;
  resetBtn.disabled = true;
  kickButton.disabled = true;
  
  movement = 400;
  speed = 0;
  moving = false;
  counter = 0;
  kickoff = true;
  fieldGoal = 51;

  size = diskSize();
  goButton.addEventListener("click", launchFootball);

  background(0, 170, 0);
  ellipse(200, movement, size);
  text(size, 193, movement);
}

function bonusPoints() {
  if (fieldGoal >= 100 && fieldGoal <= 147) {
    score = Math.floor(score * 2);
    document.getElementById("demo").innerHTML = score;
    restart();
  } else {
    restart();
  }
  clearInterval(fieldGoalInt);
  downs = 4;
  document.getElementById("downs").innerHTML = downs;
}

function gameOver() {
  goButton.disabled = true;
  kickButton.disabled = true;
  slider.disabled = true;
  document.getElementById("downs").innerHTML = "Game Over";
}


