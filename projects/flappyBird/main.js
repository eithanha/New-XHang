let bird;
const pipes = [];
const SPACE_BAR = 32;
const FRAME_AMOUNT = 100;
const RESET_KEY = 82;

let bg = null;
let birdImg = null;

let topPipeImg = null;
let bottomPipeImg = null;

let topPipeHitImg = null;
let bottomPipeHitImg = null;

let gameOver = false;

function preload() {
  birdImg = loadImage("./image/bird.png");
  bg = loadImage("./image/flappy_bird_environment.png");
  topPipeHitImg = loadImage("./image/top_pipe_hit.png");
  bottomPipeHitImg = loadImage("./image/bottom_pipe_hit.png");
  topPipeImg = loadImage("./image/top_pipe.png");
  bottomPipeImg = loadImage("./image/bottom_pipe.png");
}

function setup() {
  createCanvas(400, 700);

  // Wait for classes to load if they're not ready yet
  var attempts = 0;
  var maxAttempts = 50; // Wait up to 5 seconds (50 * 100ms)

  function tryInitialize() {
    attempts++;
    if (typeof Bird !== "undefined" && typeof PipePair !== "undefined") {
      bird = new Bird(birdImg);
      console.log("Game initialized successfully.");
    } else if (attempts < maxAttempts) {
      setTimeout(tryInitialize, 100);
    } else {
      console.error(
        "Failed to initialize game after " + maxAttempts * 100 + "ms."
      );
      console.error("Missing classes:", {
        Bird: typeof Bird !== "undefined",
        PipePair: typeof PipePair !== "undefined",
      });
      console.error(
        "Please check the browser's Network tab to see if bird.js and pipe-pair.js loaded successfully."
      );
    }
  }

  tryInitialize();
}

function draw() {
  background(bg);

  if (!bird || typeof bird.update !== "function") {
    return;
  }

  if (!gameOver) {
    bird.update();
    bird.draw();

    if (frameCount % FRAME_AMOUNT === 0) {
      addPipes();
    }

    renderPipes();

    for (let pipe of pipes) {
      if (collision(bird, pipe)) {
        console.log("Collision detected!");
        pipe.markAsHit();
        gameOver = true;
        break;
      }
    }
  } else {
    renderPipes();
    bird.draw();
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Game Over! Press 'R' to restart.", width / 2, height / 2);
  }
}

function addPipes() {
  if (typeof PipePair === "undefined") {
    console.error(
      "PipePair class is not defined. Make sure pipe-pair.js is loaded before main.js"
    );
    return;
  }
  const gapHeight = 150;
  pipes.push(
    new PipePair(
      topPipeImg,
      bottomPipeImg,
      gapHeight,
      topPipeHitImg,
      bottomPipeHitImg
    )
  );
}

function removePipe(pipeIndex) {
  pipes.splice(pipeIndex, 1);
}

function renderPipes() {
  for (let x = pipes.length - 1; x >= 0; x--) {
    let pipe = pipes[x];
    if (!gameOver) {
      pipe.update();
    }
    pipe.draw();

    if (pipe.isOffScreen()) {
      removePipe(x);
    }
  }
}

function collision(bird, pipe) {
  if (typeof Bird === "undefined" || typeof PipePair === "undefined") {
    return false;
  }
  const birdTop = bird.y - Bird.WIDTH / 2;
  const birdBottom = bird.y + Bird.WIDTH / 2;
  const birdLeft = Bird.X_POSITION - Bird.WIDTH / 2;
  const birdRight = Bird.X_POSITION + Bird.WIDTH / 2;

  const withinVerticalRange =
    birdTop < pipe.topHeight || birdBottom > height - pipe.bottomHeight;
  const withinHorizontalRange =
    birdRight > pipe.x && birdLeft < pipe.x + PipePair.WIDTH;

  return withinVerticalRange && withinHorizontalRange;
}

function keyPressed() {
  if (!bird || typeof bird.up !== "function") {
    return;
  }

  if (keyCode === SPACE_BAR && !gameOver) {
    bird.up();
  } else if (keyCode === RESET_KEY && gameOver) {
    resetGame();
  }
}
function resetGame() {
  if (typeof Bird !== "undefined") {
    bird = new Bird(birdImg);
    pipes.length = 0;
    gameOver = false;
  } else {
    console.error("Bird class is not defined. Cannot reset game.");
  }
}
