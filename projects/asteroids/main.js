const FIRE_KEY = 32;
let ship;
let asteroids = [];
let lasers = [];

let laserSound = null;
let explosion = null;
let bg = null;
let shipImage = null;

function preload() {
  shipImage = loadImage("./image/Spaceship01.png");

  laserSound = loadSound("./assets/laser_fire.mp3");
  explosion = loadSound("./assets/ship_explosion.mp3");
  bg = loadImage("./image/Background/Space02.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Wait for classes to load if they're not ready yet
  var attempts = 0;
  var maxAttempts = 50; // Wait up to 5 seconds (50 * 100ms)

  function tryInitialize() {
    attempts++;
    if (
      typeof Ship !== "undefined" &&
      typeof Asteroid !== "undefined" &&
      typeof Laser !== "undefined"
    ) {
      ship = new Ship(shipImage);
      createAsteroids();
      console.log("Game initialized successfully.");
    } else if (attempts < maxAttempts) {
      setTimeout(tryInitialize, 100);
    } else {
      console.error(
        "Failed to initialize game after " + maxAttempts * 100 + "ms."
      );
      console.error("Missing classes:", {
        Ship: typeof Ship !== "undefined",
        Asteroid: typeof Asteroid !== "undefined",
        Laser: typeof Laser !== "undefined",
      });
      console.error(
        "Please check the browser's Network tab to see if ship.js, asteroid.js, and laser.js loaded successfully."
      );
    }
  }

  tryInitialize();
}

function draw() {
  background(bg);
  if (ship && typeof ship.update === "function") {
    ship.update();
    ship.draw();
    ship.turn();
  }

  renderLasers();
  renderAsteroids();
}

function renderShip() {
  if (ship && typeof ship.update === "function") {
    ship.update();
    ship.draw();
    ship.turn();
  }
}

function renderLasers() {
  for (let i = lasers.length - 1; i >= 0; i--) {
    lasers[i].update();
    lasers[i].draw();
    if (lasers[i].isOffscreen()) {
      lasers.splice(i, 1);
    } else {
      checkAsteroidHit(lasers[i], i);
    }
  }
}

function checkAsteroidHit(laser, laserIndex) {
  if (typeof Asteroid === "undefined") {
    return;
  }
  for (let x = asteroids.length - 1; x >= 0; x--) {
    if (laser.hits(asteroids[x])) {
      console.log("Laser Hit");
      if (asteroids[x].radius > Asteroid.SMALLEST_RADIUS) {
        console.log("Astroid large enough to shatter");
        shatterAsteroid(x);
      } else {
        asteroids.splice(x, 1);
      }

      lasers.splice(laserIndex, 1);
      break;
    }
  }
}

function shatterAsteroid(asteroidIndex) {
  if (asteroids[asteroidIndex]) {
    let newAsteroids = asteroids[asteroidIndex].breakup();

    if (newAsteroids.length > 0) {
      asteroids = asteroids.concat(newAsteroids);
    }

    asteroids.splice(asteroidIndex, 1);
  } else {
    console.log("Did not break");
  }
}

function renderAsteroids() {
  for (let i = 0; i < asteroids.length; i++) {
    asteroids[i].update();
    asteroids[i].draw();
  }
}

function createAsteroids() {
  if (typeof Asteroid === "undefined") {
    console.error(
      "Asteroid class is not defined. Make sure asteroid.js is loaded before main.js"
    );
    return;
  }
  for (let i = 0; i < 5; i++) {
    let asteroid = new Asteroid();
    asteroids.push(asteroid);
  }
}

function keyReleased() {
  if (ship && typeof ship.setRotation === "function") {
    ship.setRotation(0);
  }
}

function keyPressed() {
  if (!ship || typeof ship.shoot !== "function") {
    return;
  }

  if (FIRE_KEY == keyCode) {
    if (typeof Laser !== "undefined") {
      lasers.push(ship.shoot());
      if (laserSound) {
        laserSound.play();
      }
    } else {
      console.error(
        "Laser class is not defined. Make sure laser.js is loaded before main.js"
      );
    }
  } else if (RIGHT_ARROW == keyCode) {
    ship.setRotation(0.1);
  } else if (LEFT_ARROW == keyCode) {
    ship.setRotation(-0.1);
  } else if (UP_ARROW === keyCode) {
    ship.setRotation(0.1);
  }
}
