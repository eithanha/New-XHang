class Bird {
    static WIDTH = 32;
    static X_POSITION = 64;
    static GRAVITY = 0.4;
    static LIFT = -12;

    constructor(image) {
        this.image = image;
        this.y = height / 2;
        this.velocity = 0;
    }
    
    draw() {
        image(this.image, Bird.X_POSITION, this.y, Bird.WIDTH, Bird.WIDTH);
    }
    
    update() {
        this.velocity += Bird.GRAVITY;
        this.y += this.velocity;

       
        if (this.y > height - Bird.WIDTH) {
            this.y = height - Bird.WIDTH;
            this.velocity = 0;
        }

        
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }
    
    up() {
        this.velocity += Bird.LIFT;
    }
  }