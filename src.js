var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

var roverImg = document.getElementById("rover");

canvas.width = 1280;
canvas.height = 720;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";

var inputs = {up:false,down:false,left:false,right:false};

var millisOnLastFrame = new Date().getTime();

var mousePosition = {x:0,y:0};

var tiles = [];
var messages = [];

noise.seed(Math.random());

var marsColourScheme = [{levels:[0,1,2],colour:new Colour(69,24,4,255)},{levels:[3,4],colour:new Colour(193,68,14,255)},{levels:[5,6,7],colour:new Colour(231,125,17,255)},{levels:[8,9],colour:new Colour(253,166,0,255)}]

for(var y = 0; y < 5;y++){
    for(var x = 0; x < 50;x++){
        if(x < 15){
            tiles.push(new Tile(x,y,marsColourScheme,{type:"NONE",value:0},1));
        } else if (x < 35){
            tiles.push(new Tile(x,y,marsColourScheme,{type:"NONE",value:0},0));
        } else {
            tiles.push(new Tile(x,y,marsColourScheme,{type:"NONE",value:0},2));
        }
    }
}
//{type:"IRON",value:10}


updatePlayerPos(tiles,0,0);
function gameloop(){
    var frameSpeedFactor = new Date().getTime() - millisOnLastFrame;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);

    renderMap(ctx,tiles);
    
    ctx.font = "15px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#000000";
    messages.forEach(message => {
        ctx.fillText(message.text,10,canvas.height - 25 - messages.indexOf(message) * 25);
        message.time += frameSpeedFactor;
    });
    messages = messages.slice(0,5).filter(m => m.time < 2000);

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
        updatePlayerPos(tiles,0,-1);
    }
    if(event.keyCode == 83){
        inputs.down = false;
        updatePlayerPos(tiles,0,+1);
    }
    if(event.keyCode == 68){
        inputs.right = false;
        updatePlayerPos(tiles,+1,0);
    }
    if(event.keyCode == 65){
        inputs.left = false;
        updatePlayerPos(tiles,-1,0);
    }
});

setInterval(gameloop,50);
document.onmousemove = (e) => mousePosition = {x:e.clientX - canvas.getBoundingClientRect().left,y:e.clientY - canvas.getBoundingClientRect().top};

