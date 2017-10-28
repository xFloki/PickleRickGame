function Player () {
  this.width = 50;
  this.height = 50;
  this.startingPoint = [50, 50];
  this.posX = this.startingPoint[0];
  this.posX = this.startingPoint[1];
  this.velX = 0;
  this.velY = 0;

  this.moveRight = function() {
    this.posX += 5;
  }
  this.moveLeft = function() {
    this.posX -= 5;
  }

}
