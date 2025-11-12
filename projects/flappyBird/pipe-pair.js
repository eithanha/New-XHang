class PipePair {
  static WIDTH = 20;
  static SPEED = 2;

  constructor(
    topPipeImg,
    bottomPipeImg,
    gapHeight,
    topPipeHitImg,
    bottomPipeHitImg
  ) {
    this.topPipeImg = topPipeImg;
    this.bottomPipeImg = bottomPipeImg;
    this.topPipeHitImg = topPipeHitImg;
    this.bottomPipeHitImg = bottomPipeHitImg;
    this.x = width;
    this.gapHeight = gapHeight;
    this.topHeight = random(height / 6, (3 / 4) * height);
    this.bottomHeight = height - this.topHeight - this.gapHeight;
    this.hit = false;
  }

  draw() {
    if (this.hit) {
      image(this.topPipeHitImg, this.x, 0, PipePair.WIDTH, this.topHeight);
      image(
        this.bottomPipeHitImg,
        this.x,
        height - this.bottomHeight,
        PipePair.WIDTH,
        this.bottomHeight
      );
    } else {
      image(this.topPipeImg, this.x, 0, PipePair.WIDTH, this.topHeight);
      image(
        this.bottomPipeImg,
        this.x,
        height - this.bottomHeight,
        PipePair.WIDTH,
        this.bottomHeight
      );
    }
  }

  update() {
    this.x -= PipePair.SPEED;
  }

  isOffScreen() {
    return this.x + PipePair.WIDTH < 0;
  }

  markAsHit() {
    this.hit = true;
  }
}
