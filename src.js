var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 720;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";

var inputs = {up:false,down:false,left:false,right:false};

var millisOnLastFrame = new Date().getTime();

var mousePosition = {x:0,y:0};
var playerPosition = {x:0,y:0};

var tiles = [];

for(var y = 0; y < 5;y++){
    for(var x = 0; x < 25;x++){
        tiles.push(new Tile(x,y,new Colour(255,0,0,255)));
    }
}

tiles[0].hasPlayer = true;

function gameloop(){
    var frameSpeedFactor = new Date().getTime() - millisOnLastFrame;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);
    
    if(inputs.right){
        playerPosition.x += (frameSpeedFactor/300.0);
    }
    if(inputs.left){
        playerPosition.x -= (frameSpeedFactor/300.0);
    }
    if(inputs.up){
        playerPosition.y -= (frameSpeedFactor/300.0);
    }
    if(inputs.down){
        playerPosition.y += (frameSpeedFactor/300.0);
    }
    updatePlayerPos(tiles,playerPosition.x,playerPosition.y);
    renderMap(ctx,tiles);
    millisOnLastFrame = new Date().getTime();
}

document.addEventListener('keydown', (event) => {
    if(event.keyCode == 87){
        inputs.up = true;
    }
    if(event.keyCode == 83){
        inputs.down = true;
    }
    if(event.keyCode == 68){
        inputs.right = true;
    }
    if(event.keyCode == 65){
        inputs.left = true;
    }

});
document.addEventListener('keyup', (event) => {
    if(event.keyCode == 87){
        inputs.up = false;
    }
    if(event.keyCode == 83){
        inputs.down = false;
    }
    if(event.keyCode == 68){
        inputs.right = false;
    }
    if(event.keyCode == 65){
        inputs.left = false;
    }
});

setInterval(gameloop,50);
document.onmousemove = (e) => mousePosition = {x:e.clientX - canvas.getBoundingClientRect().left,y:e.clientY - canvas.getBoundingClientRect().top};

