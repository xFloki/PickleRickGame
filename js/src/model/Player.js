function Player () {
  this.width = 50;
  this.height = 50;
  this.startingPoint = [256/5 * 2, 256/5*4];
  this.posX = this.startingPoint[0];
  this.posY = this.startingPoint[1];
  this.velX = 0;
  this.velY = 0;
  this.onFloor = false;

  this.trys = 0;

}

Player.prototype.die = function(){
  this.posX = this.startingPoint[0];
  this.posY = this.startingPoint[1];
  this.trys++;

};

// Move the rectangle p along vx then along vy, but only move
// as far as we can without colliding with a solid rectangle
Player.prototype.move = function (obstacles, activated) {
  var p = this;
  var vx = this.velX ;
  var vy = this.velY;
  var x = {};
  var y = {};
  var i = obstacles.length;

  while (i--) {
      var rect = obstacles[i];

      x.x = p.posX + vx;
      x.y = p.posY;
      x.w = p.width;
      x.h = p.height;

      y.x = p.posX;
      y.y = p.posY + vy;
      y.w = p.width;
      y.h = p.height;

      // Move rectangle along x axis
      if (this.collides(x, rect, activated)) {
          if (vx < 0) vx = rect.posX + rect.width - p.posX;
          if (vx > 0) vx = rect.posX - p.posX - p.width;
      }

      // Move rectangle along y axis
      if (this.collides(y, rect, activated)) {
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
      var x = a.x <= b.posX + b.width && a.x + a.w > b.posX ;
      var y = a.y <= b.posYOn + b.heightON  && a.y + a.h > b.posYOn ;
      return  x && y;

    } else {
      var x = a.x <= b.posX + b.width && a.x + a.w > b.posX ;
      var y = a.y <= b.posY + b.height  && a.y + a.h > b.posY ;
      return  x && y;
    }
};
