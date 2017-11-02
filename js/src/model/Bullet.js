function Bullet (x, y, toX, toY) {
  this.name = "BULLET";
  this.width = 20;
  this.height = 10;
  this.velX = 10;
  this.posX = x;
  this.posY = y;

  this.initialPosX = x;
  this.range = 350;
  this.maxX = this.calculateMaxX();

  this.damage = 50;

  this.destination = { posX: toX, posY: toY };

}

Bullet.prototype.moveBullet = function() {
  this.posX += this.velX;

};

Bullet.prototype.moveToLocation = function() {
  // var movX = (this.posX - this.destination.posX) / this.velX;
  // movY = (this.posY - this.destination.posY) / movX;
  this.posX -= 1;
  // this.posY -= movY;
};

Bullet.prototype.checkDestination = function() {
   return (this.posX == this.destination.posX && this.posY == this.destination.posY) ? true : false;
};

Bullet.prototype.calculateMaxX = function() {
  return this.initialPosX + this.range;
};
