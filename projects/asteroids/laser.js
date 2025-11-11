class Laser{
  
    constructor(shipPosVector, angle) {
      this.positionVector = createVector(shipPosVector.x, shipPosVector.y);
      this.velocityVector = p5.Vector.fromAngle(angle);
      this.velocityVector.mult(10);
    } 
  
    update() {
      this.positionVector.add(this.velocityVector);
    }
  
    draw() {
      push();
      stroke(255);
      strokeWeight(4);
      point(this.positionVector.x, this.positionVector.y);
      pop();
    }
  
    hits(asteroid) {
      let distance = dist(this.positionVector.x, this.positionVector.y, asteroid.positionVector.x, asteroid.positionVector.y);
      return distance < asteroid.radius;

    }
  
    isOffscreen() {
      this.positionVector.x < 0 || this.positionVector.x > width || this.positionVector.y < 0 || this.positionVector.y > height
    }
  
  }