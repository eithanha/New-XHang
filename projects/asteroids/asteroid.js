class Asteroid {
    // If the Asteroid's radius is smaller than this, we will not break
    // it up further - we will just destroy it.
    static SMALLEST_RADIUS = 10;
    
    constructor(positionVector, radius) {
      if (positionVector) {
        this.positionVector = positionVector.copy();
      } else {
        this.positionVector = createVector(random(width), random(height));
      }
      
      if (radius) {
        this.radius = radius * 0.5;
      } else {
        this.radius = random(10, 50);
      }


      this.velocity = p5.Vector.random2D();
      this.total = floor(random(5, 50));
      this.offset = [];
      for (let i = 0; i < this.total; i++) {
          this.offset[i] = random(-this.radius * 0.5, this.radius * 0.5);
      }

      
    }
  
      update() {
        this.positionVector.add(this.velocity);
        this.screenWrap();
      }
  
      draw() {
        push();
        stroke(255);
        noFill();
        translate(this.positionVector.x, this.positionVector.y);
        this.#createShape();
        this.#wrapSideOfScreen();
        this.#wrapTopBottomScreen();
        pop();
      }
  
      #createShape(){
        beginShape();
        for (let i = 0; i < this.total; i++) {
          let angle = map(i, 0, this.total, 0, TWO_PI);
          let radius = this.radius + this.offset[i];
          let x = radius * cos(angle);
          let y = radius * sin(angle);
          vertex(x, y);
        }
        endShape(CLOSE);
      }
  
      breakup() {
        let newAsteroids = [];
        if (this.radius > Asteroid.SMALLEST_RADIUS) {
          newAsteroids.push(new Asteroid(this.positionVector, this.radius));
          newAsteroids.push(new Asteroid(this.positionVector, this.radius));
        }
        return newAsteroids;
      }
  
      #wrapSideOfScreen(){
        if (this.positionVector.x > width) {
          this.positionVector.x = 0;
        } else if (this.positionVector.x < 0) {
          this.positionVector.x = width;
        }
      }
  
      #wrapTopBottomScreen(){
        if (this.positionVector.y > height) {
          this.positionVector.y = 0;
        } else if (this.positionVector.y < 0) {
          this.positionVector.y = height;
        }
      }
  
      screenWrap() {

        if (this.positionVector.x > width) {
          this.positionVector.x = 0;
        } else if (this.positionVector.x < 0) {
            this.positionVector.x = width;
        }
        if (this.positionVector.y > height) {
            this.positionVector.y = 0;
        } else if (this.positionVector.y < 0) {
            this.positionVector.y = height;
        }

        this.#wrapSideOfScreen();
        this.#wrapTopBottomScreen();
      
      }
}