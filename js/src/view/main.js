window.onload = function() {
  var game;
  var canvas = document.querySelector("canvas");

  var sprite = new Image();
  sprite.src = './img/Platfor_Tiles_Free.png';

  var audio = new Audio('./sounds/swifty.mp3');
  // Property for audios to replay song when it is over 
  audio.loop = true;
  audio.play();


document.onkeydown = document.onkeyup = function (e) {
    game.keys[e.which || e.keyCode] = e.type === "keydown";
};

 document.onkeypress = function (e) {
   if ( e.keyCode == 80 || e.keyCode == 112 ) {
     if(game.isPaused){
       game.mainInterval = setInterval(refreshGame,1000 / 60);
       game.isPaused = false;
     } else {
       pauseGame();
       game.isPaused = true;
     }

   } else if( e.keyCode == 32 && game.firstMap.name !== "Lvl1"){
      game.player.shoot();
    }

 };;

sprite.onload = function() {
    game = new Game(canvas);

    game.drawBoard('primera');
    game.mainInterval = setInterval(refreshGame,1000 / 60);
};

function refreshGame(){
  game.update();
  game.context.clearRect(0, 0, 2000, 2000);
  game.drawBoard();
  game.drawPlayer();
  game.drawBullet();
  changeLvl();
}

function pauseGame() {
  clearInterval(game.armorInteval);
  clearInterval(game.mainInterval);
}

function changeLvl() {
  if(game.player.winner == true) {
    switch (game.firstMap.name) {
      case "Lvl1":
      game = new Game(canvas, "Lvl2");
      game.drawBoard('primera');
        break;
      case "Lvl2":
        break;
      default:
    }
  }
}

};
