class Ship{

    constructor(image) {
      this.positionVector = createVector(width / 2, height / 2);
      this.halfSize = 20;
      this.heading = 0;
      this.rotation = 0;
      this.velocityVector = createVector(0, 0); 
      this.image = image;
    }
  
    update() {
      this.positionVector.add(this.velocityVector);
      this.velocityVector.mult(0.99); 
      this.screenWrap();
    }
  
  
    draw() {
      push();
      translate(this.positionVector.x, this.positionVector.y);
      rotate(this.heading + PI / 2);
      imageMode(CENTER);
      if (this.image) {
        image(this.image, 0, 0, this.halfSize * 2, this.halfSize * 2);
      } else {
          stroke(255);
          fill(127);
          beginShape();
          vertex(-this.halfSize, this.halfSize);
          vertex(this.halfSize, this.halfSize);
          vertex(0, -this.halfSize);
          endShape(CLOSE);
      }
      pop();
    }
  
    setRotation(angle) {
      this.rotation = angle;
    }
  
    turn() {
      this.heading += this.rotation;
    }
    
    shoot() {
        let laser = new Laser(this.positionVector, this.heading);
        return laser;
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
    }


  }