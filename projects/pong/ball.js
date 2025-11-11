class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.diameter = this.radius * 2;
        this.xVelocity = 7;
        this.yVelocity = 5;
        this.edgeUpdate();
    }

    edgeUpdate(){
        this.topEdge = this.y - this.radius;
        this.bottomEdge = this.y + this.radius;
        this.rightEdge = this.x + this.radius;
        this.leftEdge = this.x - this.radius;
    }

        
    update() {
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        this.edgeUpdate();

        if (this.y - this.radius < 0 || this.y + this.radius > height) {
            this.yVelocity *= -1;
        }

        
        if (this.x - this.radius < 0 || this.x + this.radius > width) {
            this.reset();
        }
    }
    
    draw() { 
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    }
    
    hits(paddle) {
        const withinVerticalRange = this.y > paddle.y && this.y < paddle.y + paddle.height;

        const withinHorizontalRange = (this.xVelocity > 0 ?
            this.x + this.radius >= paddle.x && this.x + this.radius <= paddle.x + paddle.width
            :
            this.x - this.radius <= paddle.x + paddle.width && this.x - this.radius >= paddle.x);

        return withinVerticalRange && withinHorizontalRange;
    
    
    }
    
    changeXVelocity() {
       this.xVelocity *= -1;
    }
    
    changeYVelocity() {
       this.yVelocity *= -1;
    }

    reset(){
        this.x = width / 2;
        this.y = height / 2;
        this.xVelocity *= -1;
        this.edgeUpdate();
    }
}
      
