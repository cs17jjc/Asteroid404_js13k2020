var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

var roverImg = document.getElementById("rover");
var towerImg = document.getElementById("tower");

canvas.width = 1280;
canvas.height = 720;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";

var inputs = {up:false,down:false,left:false,right:false,inter:false};

var millisOnLastFrame = new Date().getTime();

var mousePosition = {x:0,y:0};

var tiles = [];
var messages = [];

var playerResources = [];
var mineFactor = 1;

noise.seed(Math.random());

var marsColourScheme = [{levels:[0,1,2],colour:new Colour(69,24,4,255)},{levels:[3,4],colour:new Colour(193,68,14,255)},{levels:[5,6,7],colour:new Colour(231,125,17,255)},{levels:[8,9],colour:new Colour(253,166,0,255)}]

for(var y = 0; y < 5;y++){
    for(var x = 0; x < 50;x++){
            tiles.push(new Tile(x,y,marsColourScheme,{type:"NONE",value:0},3));
    }
}

tiles.forEach(t => {
    if(Math.random() * 100 > 95 && t.biome == 0){
        var resourceAmmount = Math.random() * 5;
        t.resource = {type:"IRON",value:Math.max(3,Math.trunc(resourceAmmount))};
        getSurroundingTiles(tiles,t).filter(t => 0.5 - Math.random()).forEach(t => t.resource = {type:"IRON",value:Math.max(1,Math.trunc(resourceAmmount * Math.random()))});
    }
})


updatePlayerPos(tiles,0,0);
placeBuilding(tiles.find(t => t.x == 20 && t.y == 2),{type:"RADAR"});
function gameloop(){
    var frameSpeedFactor = new Date().getTime() - millisOnLastFrame;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);

    renderMap(ctx,tiles);
    
    ctx.font = "15px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#000000";
    ctx.textAlign = "start"; 
    ctx.textBaseline = "alphabetic";
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
    if(event.keyCode == 69){
        inputs.inter = true;
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
    if(event.keyCode == 69){
        inputs.inter = false;
        var minedRes = mineTile(tiles.find(t => t.hasPlayer));
        if(minedRes.type != "NONE"){
            var totalMined = minedRes.value * mineFactor;
            messages.push({text:"Mined " + totalMined + " of " + minedRes.type,time:0});
            var playerRes = playerResources.find(r => r.type == minedRes.type);
            if(playerRes != null){
                playerRes.value += totalMined;
            } else {
                playerResources.push({type:minedRes.type,value:totalMined});
            }
        } else {
            messages.push({text:"No mineable resources on tile",time:0});
        }
        console.log(playerResources);
    }
});

setInterval(gameloop,50);
document.onmousemove = (e) => mousePosition = {x:e.clientX - canvas.getBoundingClientRect().left,y:e.clientY - canvas.getBoundingClientRect().top};

