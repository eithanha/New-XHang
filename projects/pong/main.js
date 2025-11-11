
let ball;
let leftPaddle 
let rightPaddle;

function setup() {
	createCanvas(1200, 600);

	ball = new Ball(width / 2, height / 2, 12);
	leftPaddle = new Paddle(10, height / 2 - 50, 87, 83);
	rightPaddle = new Paddle(width - 20, height / 2 - 50, UP_ARROW, DOWN_ARROW); 
}

function draw() {
  	background(0);
  	
	leftPaddle.update();
	rightPaddle.update();
	ball.update();

	leftPaddle.draw();
	rightPaddle.draw();
	ball.draw();

	if (ball.hits(leftPaddle) || ball.hits(rightPaddle)) {
		ball.changeXVelocity();
	}
}
