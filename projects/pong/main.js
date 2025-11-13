let ball;
let leftPaddle;
let rightPaddle;

function setup() {
  createCanvas(1200, 600);

  // Wait for classes to load if they're not ready yet
  var attempts = 0;
  var maxAttempts = 50; // Wait up to 5 seconds (50 * 100ms)

  function tryInitialize() {
    attempts++;
    if (typeof Ball !== "undefined" && typeof Paddle !== "undefined") {
      ball = new Ball(width / 2, height / 2, 12);
      leftPaddle = new Paddle(10, height / 2 - 50, 87, 83);
      rightPaddle = new Paddle(
        width - 20,
        height / 2 - 50,
        UP_ARROW,
        DOWN_ARROW
      );
      console.log("Game initialized successfully.");
    } else if (attempts < maxAttempts) {
      setTimeout(tryInitialize, 100);
    } else {
      console.error(
        "Failed to initialize game after " + maxAttempts * 100 + "ms."
      );
      console.error("Missing classes:", {
        Ball: typeof Ball !== "undefined",
        Paddle: typeof Paddle !== "undefined",
      });
      console.error(
        "Please check the browser's Network tab to see if ball.js and paddle.js loaded successfully."
      );
    }
  }

  tryInitialize();
}

function draw() {
  background(0);

  if (!ball || !leftPaddle || !rightPaddle) {
    return;
  }

  if (typeof leftPaddle.update === "function") {
    leftPaddle.update();
  }
  if (typeof rightPaddle.update === "function") {
    rightPaddle.update();
  }
  if (typeof ball.update === "function") {
    ball.update();
  }

  if (typeof leftPaddle.draw === "function") {
    leftPaddle.draw();
  }
  if (typeof rightPaddle.draw === "function") {
    rightPaddle.draw();
  }
  if (typeof ball.draw === "function") {
    ball.draw();
  }

  if (ball && typeof ball.hits === "function") {
    if (ball.hits(leftPaddle) || ball.hits(rightPaddle)) {
      if (typeof ball.changeXVelocity === "function") {
        ball.changeXVelocity();
      }
    }
  }
}
