function Game (canvas, player) {
  this.canvas = canvas;
  this.context = canvas.getContext('2d');

  this.width = canvas.width = 1200;
  this.height = canvas.height = 600;

  this.scale = 5;
  this.obstacles = [];
  this.firstMap = new Lvl1();

  this.currentMap = this.firstMap.tiles;
  this.currentMapArray = this.firstMap.atlas.TextureAtlas.SubTexture;

  // Weapons start activated
  this.activado = true;

  this.player = player;


  this.keys = [];
}

var sprite = new Image();
sprite.src = './img/Platfor_Tiles_Free.png'

Game.prototype.update = function(){
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


Game.prototype.drawPlayer = function(){
 var image = this.currentMapArray[22];
 var width = image['-width'] / this.scale;
 var height = image['-height'] / this.scale;
 this.context.drawImage(sprite, image['-x'], image['-y'], image['-width'], image['-height'],
    this.player.posX, this.player.posY, width, height);
}

Game.prototype.drawBoard = function(primera){
  if (primera != undefined) {
    var that = this;
      setInterval(function(){

        if (that.activado == false ){
          that.activado = true;
        } else {
          that.activado = false;
        }
      }, 1000);
  }

  for (var c = 0; c < this.currentMap.length; c++) {
    for (var r = 0; r < this.currentMap[c].length; r++) {
        switch (this.currentMap[c][r]) {

          case 01:
          this.drawObject(1,r,c);
          // Add obstacles objecto to array only on the first paint
          if(primera != undefined){ this.obstacles.push(new Ground(width, height, width*r, height*c))}
          break;
          case 02:
           image = this.currentMapArray[2-1];
           width = image['-width'] / this.scale;
           height = image['-height'] / this.scale;
          this.context.drawImage(sprite, image['-x'], image['-y'], image['-width'], image['-height'],
             width*c, height,   width, height);
          break;
          case 03:
           image = this.currentMapArray[3-1];
           width = image['-width'] / this.scale;
           height = image['-height'] / this.scale;
          this.context.drawImage(sprite, image['-x'], image['-y'], image['-width'], image['-height'],
             width*c, height*r,   width, height);
          break;

          case 26:
           image = this.currentMapArray[34-1];
           width = image['-width'] / this.scale;
           height = image['-height'] / this.scale;
          this.context.drawImage(sprite, image['-x'], image['-y'], image['-width'], image['-height'],
             width*r, height*c,   width, height);
          image = this.currentMapArray[26-1];
          width = image['-width'] / this.scale;
          height2 = image['-height'] / this.scale;
          this.context.drawImage(sprite, image['-x'], image['-y'], image['-width'], image['-height'],
              width*r, height*(c+1) - height2,   width, height2);
          if(primera != undefined){ this.obstacles.push(new Platform(width, height, width*r, height*(c+1) - height2))}
          break;

          case 34:
           this.drawObject(34,r,c);
          break;

          case 35:
           this.drawObject(35,r,c);
          // Add obstacles objecto to array only on the first paint
          if(primera != undefined){ this.obstacles.push(new Box(width, height, width*r, height*c))}
          break;

          case 62:

          image = this.currentMapArray[62-1];
          width = image['-width'] / this.scale;
          height = image['-height'] / this.scale;
          imageON = this.currentMapArray[63-1];
          heightON = imageON['-height'] / this.scale;

          if(this.activado){
            this.context.drawImage(sprite, imageON['-x'], imageON['-y'], imageON['-width'], imageON['-height'],
              width*r, height * c - (heightON-height),   width, heightON);
          } else {
            this.context.drawImage(sprite, image['-x'], image['-y'], image['-width'], image['-height'],
               width*r, height * c,   width, height);
          }

          // Add obstacles objecto to array only on the first paint
          if(primera != undefined){
            this.obstacles.push(new Spikes(width, height, heightON, width*r, height * c, height * c - (heightON-height)));
          }
          break;

        }
      }
    }
};

Game.prototype.drawObject = function(n,r,c) {
  image = this.currentMapArray[n-1];
  width = image['-width'] / this.scale;
  height = image['-height'] / this.scale;
 this.context.drawImage(sprite, image['-x'], image['-y'], image['-width'], image['-height'],
    width*r, height*c,   width, height);
}

Game.prototype.start = function () {
    var that = this,
        ctx = this.context;

    // Draw board with a parameter so all the object are saved into array for
    // later check collisions
    this.drawBoard('primera');

    // GAME LOOP
    (function gameLoop() {

        that.update(ctx);
        that.context.clearRect(0, 0, 2000, 2000);
        that.drawBoard();
        that.drawPlayer();
        setTimeout(gameLoop, 1000 / 60);


    }());
};
