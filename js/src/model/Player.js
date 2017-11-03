function Player (context) {
  this.width = 50;
  this.height = 80;
  this.startingPoint = [256/5 * 2, 256/5*4];
  this.posX = this.startingPoint[0];
  this.posY = this.startingPoint[1];
  this.velX = 0;
  this.velY = 0;
  this.onFloor = false;
  this.winner = false;
  this.image = "";
  this.alive = true;

  this.trys = 1;

  this.bullets = [];

  this.context = context;
}

Player.prototype.die = function(){

  this.posX = this.startingPoint[0];
  this.posY = this.startingPoint[1];
  this.trys++;

  console.log("Muere");
  var audio;
  var randomDead = Math.floor(Math.random() * 3);
  switch (randomDead) {
    case 0:
       audio = new Audio('../sounds/die1.mp3');
    break;
    case 1:
      audio = new Audio('../sounds/die2.wav');
    break;
    case 2:
      audio = new Audio('../sounds/die3.wav');
    break;
    default: audio = new Audio('../sounds/die1.mp3');
  }

  audio.play();
  this.alive = false;

};

// Move the rectangle p along vx then along vy, but only move
// as far as we can without colliding with a solid rectangle
Player.prototype.move = function (obstacles, activated) {
  var p = this;
  var vx = this.velX ; //no se está modificando el  valor de velX ni VelY REFACTOR
  var vy = this.velY;
  var x = {};
  var y = {};
  var i = obstacles.length;

  while (i--) {
      var rect = obstacles[i];

      x.posX = p.posX + vx;
      x.posY = p.posY;
      x.width = p.width;
      x.height = p.height;

      y.posX = p.posX;
      y.posY = p.posY + vy;
      y.width = p.width;
      y.height = p.height;

      // Move rectangle along x axis
      if (this.collides(x, rect, activated)) {
          if(rect.name == "GOAL") this.winner = true;
          if (vx < 0) vx = rect.posX + rect.width - p.posX;
          if (vx > 0) vx = rect.posX - p.posX - p.width;
      }

      // Move rectangle along y axis
      if (this.collides(y, rect, activated)) {
        if(rect.name == "GOAL") this.winner = true;
        if(rect.name == "SPIKES" && activated == true){
          // Die and reset to Starting position
          this.die();
        } else {
          if (vy < 0) vy = rect.posY + rect.height - p.posY;
          if (vy > 0) vy = rect.posY  - p.posY - p.height ;
        }
      }
  }

  this.posX += vx;
  this.posY += vy;
};

// Returns true iff a and b overlap
 Player.prototype.collides = function(a, b, activated) {
   if (b.name == "SPIKES" && activated == true) {
      var x = a.posX <= b.posX + b.width && a.posX + a.width > b.posX ;
      var y = a.posY <= b.posYOn + b.heightON  && a.posY + a.height > b.posYOn ;
      return  x && y;

    } else {

      var x = a.posX <= b.posX + b.width && a.posX + a.width > b.posX ;
      var y = a.posY <= b.posY + b.height  && a.posY + a.height > b.posY ;
      return  x && y;
    }
};

Player.prototype.shoot = function() {
    console.log("Shoot AMMO");
    if(this.bullets.length < 1){
        var audio = new Audio('../sounds/laser.wav');
        audio.play();
        this.bullets.push(new Bullet(this.posX, this.posY));
    }

};

Player.prototype.updateBullets = function() {
  for (var i = 0; i < this.bullets.length; i++) {
    this.bullets[i].moveBullet();
    if(this.bullets[i].posX > this.bullets[i].maxX) this.bullets.splice(i);
  }
};

Player.prototype.checkCollisionBullets = function(enemy) {
  for (var i = 0; i < this.bullets.length; i++) {
    if(this.collides(this.bullets[i], enemy)) {
      enemy.hp -= this.bullets[i].damage;
      this.bullets.splice(i);
      // AUDIO RAT GETS HURT
      var audio = new Audio('../sounds/rat.wav');
      audio.play();
      if(enemy.hp === 0) {
        var that = this;
        setTimeout(function(){
          that.winner = true; }, 500);
      }
    };
  }
};
