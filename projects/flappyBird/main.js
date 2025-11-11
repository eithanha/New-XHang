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
    birdImg = loadImage('./image/bird.png');
    bg = loadImage('./image/flappy_bird_environment.png');
    topPipeHitImg = loadImage('./image/top_pipe_hit.png');
    bottomPipeHitImg = loadImage('./image/bottom_pipe_hit.png');
    topPipeImg = loadImage('./image/top_pipe.png');
    bottomPipeImg = loadImage('./image/bottom_pipe.png');
}  
  
function setup() {
  createCanvas(400, 700);
  bird = new Bird(birdImg);
}

function draw() {
    background(bg);  

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


function addPipes(){
    const gapHeight = 150;  
    pipes.push(new PipePair(topPipeImg, bottomPipeImg, gapHeight, topPipeHitImg, bottomPipeHitImg));
}



function removePipe(pipeIndex){
    pipes.splice(pipeIndex, 1);
}


function renderPipes(){  
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

function collision(bird, pipe){

    const birdTop = bird.y - Bird.WIDTH / 2;
    const birdBottom = bird.y + Bird.WIDTH / 2;
    const birdLeft = Bird.X_POSITION - Bird.WIDTH / 2;
    const birdRight = Bird.X_POSITION + Bird.WIDTH / 2;

    const withinVerticalRange = birdTop < pipe.topHeight || birdBottom > height - pipe.bottomHeight;
    const withinHorizontalRange = birdRight > pipe.x && birdLeft < pipe.x + PipePair.WIDTH;

    return withinVerticalRange && withinHorizontalRange;
}

function keyPressed() {
    if (keyCode === SPACE_BAR && !gameOver) {
        bird.up();
    } else if (keyCode === RESET_KEY && gameOver) {
        resetGame();
    }
}
function resetGame(){
    bird = new Bird(birdImg);
    pipes.length = 0;
    gameOver = false;
    
}

