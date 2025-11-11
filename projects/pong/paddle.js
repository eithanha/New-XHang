   class Paddle {
    constructor(x, y, upKey = null, downKey = null) {
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.height = 100;
        this.width = 10;
       
        this.sideUpdate();
        this.upKey = upKey;
        this.downKey = downKey;
    }
    
    sideUpdate(){
        this.rightSide = this.x + this.width;
        this.leftSide = this.x;
    }

    update() {
        if (this.upKey && keyIsDown(this.upKey)) {
            this.y = max(0, this.y - this.speed);
        }
        if (this.downKey && keyIsDown(this.downKey)) {
            this.y = min(height - this.height, this.y + this.speed);
        }

        this.sideUpdate();
    }
        
    draw() { 
        rect(this.x, this.y, this.width, this.height);  
    }
}
    
