const FIRE_KEY = 32; 
let ship;
let asteroids = [];
let lasers = [];



let laserSound = null;
let explosion = null;
let bg = null;


function preload(){
  ship = loadImage('./image/Spaceship01.png');

  laserSound = loadSound('./assets/laser_fire.mp3');
  explosion = loadSound('./assets/ship_explosion.mp3');
  bg = loadImage('./image/Background/Space02.png');
  

}
function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship(ship);
  createAsteroids();
}

function draw() {
  background(bg);
  ship.update();
  ship.draw();
  ship.turn();

  renderLasers();
  renderAsteroids();
 
}

function renderShip(){
  ship.update();
  ship.draw();
  ship.turn();
}

function renderLasers(){
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

function checkAsteroidHit(laser, laserIndex){
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

function shatterAsteroid(asteroidIndex){
  if(asteroids[asteroidIndex]){
    let newAsteroids = asteroids[asteroidIndex].breakup();

    if(newAsteroids.length > 0){
      asteroids = asteroids.concat(newAsteroids);
    }

    asteroids.splice(asteroidIndex, 1);
  } else {
    console.log("Did not break");
  }
}



function renderAsteroids(){
  for (let i = 0; i < asteroids.length; i++) {
    asteroids[i].update();
    asteroids[i].draw();
  }
}


function createAsteroids(){
  for (let i = 0; i < 5; i++) {
    let asteroid = new Asteroid();
    asteroids.push(asteroid);
}

}

function keyReleased() {
  ship.setRotation(0);
}

function keyPressed() {
  if (FIRE_KEY == keyCode) {
		lasers.push(ship.shoot());
    laserSound.play();

  } else if (RIGHT_ARROW == keyCode) {
    ship.setRotation(0.1);

  } else if (LEFT_ARROW == keyCode)  {
    ship.setRotation(-0.1);

  } else if(UP_ARROW === keyCode){
    ship.setRotation(0.1);
  }
}