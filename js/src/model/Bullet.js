function Bullet (x, y) {
  this.name = "BULLET";
  this.width = 20;
  this.height = 10;
  this.velX = 10;
  this.posX = x;
  this.posY = y;

  this.damage = 50;

}

Bullet.prototype.moveBullet = function() {
  this.posX += this.velX;

};
