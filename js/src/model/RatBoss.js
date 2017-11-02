function RatBoss (width, height, x, y) {
  this.name = "RATBOSS";
  this.maxHp = 500;
  this.hp = 500;
  this.width = width;
  this.height = height;
  this.posX = x;
  this.posY = y;

  this.bullet = [];

}

RatBoss.prototype.shootPlayer = function(player) {
  console.log("RAT ATTACKS");
  this.bullet.push(new Bullet(this.posX, this.posY, player.posX, player.posY));
  console.log(this.bullet);
};


RatBoss.prototype.updateBullets = function() {
  if(this.bullet != ""){
    this.bullet[0].moveToLocation();
    if(this.bullet[0].checkDestination()) console.log("LLEGOOOO");;
    //if(this.bulletposX > this.bullets[i].maxX) this.bullets.splice(i);
  }
};
