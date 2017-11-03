function RatBoss (width, height, x, y) {
  this.name = "RATBOSS";
  this.maxHp = 50;
  this.hp = 50;
  this.width = width;
  this.height = height;
  this.posX = x;
  this.posY = y;

  this.originalX = x;

  this.ratillas = [];
  this.vuelta = false;


}

RatBoss.prototype.attacks = function(){

};

RatBoss.prototype.updatePosition = function(){
  if(this.posX > this.originalX - 200 && this.vuelta === false ){
    this.posX -= 1;
  } else if (this.posX <= this.originalX - 200 && this.vuelta === false ) {
    this.vuelta = true;
  } else if (this.vuelta === true ){
    this.posX +=1;
    if(this.posX >= this.originalX){ this.vuelta = false; }
  }
};

RatBoss.prototype.shootPlayer = function() {
  var ratilla = new Obstacle("RATILLA", 60, 30, this.posX, this.posY + this.height - 30);
  this.ratillas.push(ratilla);
  return ratilla;
};

RatBoss.prototype.updateRatillas = function() {
  if(this.ratillas.length > 0){
    for (var i = 0; i < this.ratillas.length; i++) {
      this.ratillas[i].posX -= 5;
      if(this.ratillas[i].posX < 0){
        this.ratillas.splice(i, 1);
      }
    }
  }
};
