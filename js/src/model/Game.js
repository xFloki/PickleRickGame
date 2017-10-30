function Game(canvas, player) {
  this.canvas = canvas;
  this.context = canvas.getContext('2d');

  this.width = canvas.width = 1200;
  this.height = canvas.height = 600;

  this.scale = 5;
  this.obstacles = [];
  this.firstMap = new Lvl1();

  this.currentMap = this.firstMap.tiles;
  this.currentMapArray = this.firstMap.atlas.TextureAtlas.SubTexture;

  this.trys = 0;

  // Weapons start activated
  this.activado = true;
  this.player = player;
  this.keys = [];
}

var sprite = new Image();
sprite.src = './img/Platfor_Tiles_Free.png'

Game.prototype.update = function() {
  // Gravity
  this.player.velY += 1;
  // Right - Left movement
  this.player.velX = 6 * (!!this.keys[39] - !!this.keys[37]); //

  // Move the player and detect collisions
  var expectedY = this.player.posY + this.player.velY;
  this.player.move(this.obstacles, this.activado);

  this.player.onFloor = expectedY > this.player.posY;

  if (expectedY !== this.player.posY) this.player.velY = 0;

  // PLAYER ONLY CAN JUMP IS HE IS ON THE FLOOR
  if (this.player.onFloor && this.keys[38]) {
    this.player.velY = -14;
  }
};


Game.prototype.drawPlayer = function() {
  var image = this.currentMapArray[22];
  var width = image['-width'] / this.scale;
  var height = image['-height'] / this.scale;
  this.context.drawImage(sprite, image['-x'], image['-y'], image['-width'], image['-height'],
    this.player.posX, this.player.posY, width, height);
}

Game.prototype.drawBoard = function(primera) {
  if (primera != undefined) {
    var that = this;
    setInterval(function() {

      if (that.activado == false) {
        that.activado = true;
      } else {
        that.activado = false;
      }
    }, 1000);
  }

  for (var c = 0; c < this.currentMap.length; c++) {
    for (var r = 0; r < this.currentMap[c].length; r++) {
      switch (this.currentMap[c][r]) {

        // GROUND
        case 01:
          this.drawObject(1, r, c, undefined, true);
          break;

        // SMALL GROUND
        case 02:
          this.drawObject(2, r, c, true, true);
          break;

        // TRIANGLE GROUND
        case 03:
          this.drawObject(3, r, c);
          break;

        // METAL PLATFORM
        case 26:

          this.drawObject(34, r, c);
          this.drawObject(26, r, c,true, true);
          break;

        // SKY
        case 34:
          this.drawObject(34, r, c);
          break;

        // BOX
        case 35:
          this.drawObject(35, r, c, undefined, true);
          break;

        // SIGN
        case 50:
          this.drawObject(34, r, c);
          this.drawObject(50, r, c, true, false);
        break;

        case 62:

          image = this.currentMapArray[62 - 1];
          width = image['-width'] / this.scale;
          height = image['-height'] / this.scale;
          imageON = this.currentMapArray[63 - 1];
          heightON = imageON['-height'] / this.scale;

          if (this.activado) {
            this.context.drawImage(sprite, imageON['-x'], imageON['-y'], imageON['-width'], imageON['-height'],
              width * r, height * c - (heightON - height), width, heightON);
          } else {
            this.context.drawImage(sprite, image['-x'], image['-y'], image['-width'], image['-height'],
              width * r, height * c, width, height);
          }

          // Add obstacles objecto to array only on the first paint
           if (primera != undefined) {
             this.obstacles.push(new Spikes(width, height, heightON, width * r, height * c, height * c - (heightON - height)));
           }
          break;
          // Secret Break with no collision to reach goal
        case 99:
          this.drawObject(1, r, c);
          break;

      }
    }
  }
};

Game.prototype.drawObject = function(n,r,c,resta,add) {

  image = this.currentMapArray[n - 1];
  width = image['-width'] / this.scale;
  height = image['-height'] / this.scale;
  if (resta == undefined){ var resta = 0; } else { var resta = height; c +=1; }
  this.context.drawImage(sprite, image['-x'], image['-y'], image['-width'], image['-height'],
    width * r, 256/this.scale * c - resta, width, height);
  if(add == true){
      this.obstacles.push(new Ground(width, height, width * r, 256/this.scale * c -resta));
  }

}

Game.prototype.start = function() {
  var that = this,
  ctx = this.context;
  // Draw board with a parameter so all the object are saved into array for
  // later check collisions
  this.drawBoard('primera');

  setInterval(function(){
    that.update();
    that.context.clearRect(0, 0, 2000, 2000);
    that.drawBoard();
    that.drawPlayer();
  },1000 / 60);

};
