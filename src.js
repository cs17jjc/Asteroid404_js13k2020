var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

var roverImg = document.getElementById("rover");
var towerImg = document.getElementById("tower");

canvas.width = 1280;
canvas.height = 720;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";

var prevInputs = {up:false,down:false,left:false,right:false,inter:false,build:false,remove:false};
var inputs = {up:false,down:false,left:false,right:false,inter:false,build:false,remove:false};

var millisOnLastFrame = new Date().getTime();

var mousePosition = {x:0,y:0};

var tiles = [];
var messages = [];

var playerResources = [];
var playerBuildings = [];
var mineFactor = 1;

var buildMode = false;
var removeMode = false;

noise.seed(Math.random());

var mapWidth = 50;

var marsColourScheme = [{levels:[0,1,2],colour:new Colour(69,24,4,255)},{levels:[3,4],colour:new Colour(193,68,14,255)},{levels:[5,6,7],colour:new Colour(231,125,17,255)},{levels:[8,9],colour:new Colour(253,166,0,255)}];
var biomeSeq = Array.from(Array(mapWidth).keys()).map(i => {
    if(i < 15){
        return 2;
    } else if (i < 35){
        return 0;
    } else {
        return 3;
    }
});

tiles = generateMap(mapWidth,biomeSeq,marsColourScheme);

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

    ctx.fillText("Available resources:",10,25);
    playerResources.forEach(r => ctx.fillText(r.value + " units of " + r.type,10, 50 + playerResources.indexOf(r) * 25));

    ctx.font = "30px Tahoma";
    ctx.textAlign = "center"; 
    ctx.textBaseline = "middle";
    if(buildMode){
        ctx.fillText("Build Mode",canvas.width/2,30);
    }
    if(removeMode){
        ctx.fillText("Remove Mode",canvas.width/2,30);
    }

    if(Object.entries(prevInputs).toString() !== Object.entries(inputs).toString()){
        handleInput();
    }
    prevInputs = Object.assign({},inputs);
    millisOnLastFrame = new Date().getTime();
}

function handleInput(){
    if(inputs.up == false && prevInputs.up == true && !buildMode && !removeMode){
        updatePlayerPos(tiles,0,-1);
    }
    if(inputs.down == false && prevInputs.down == true && !buildMode && !removeMode){
        updatePlayerPos(tiles,0,+1);
    }
    if(inputs.right == false && prevInputs.right == true && !buildMode && !removeMode){
        updatePlayerPos(tiles,+1,0);
    }
    if(inputs.left == false && prevInputs.left == true && !buildMode && !removeMode){
        updatePlayerPos(tiles,-1,0);
    }
    if(inputs.inter == false && prevInputs.inter == true && !buildMode && !removeMode){
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
    }
    if(inputs.build == false && prevInputs.build == true && !removeMode){
        buildMode = !buildMode;
        getSurroundingTiles(tiles,tiles.find(t => t.hasPlayer)).filter(t => t.isVisible && t.building.type == "NONE").forEach(t => t.highlighted = !t.highlighted);
    }
    if(inputs.remove == false && prevInputs.remove == true && !buildMode){
        removeMode = !removeMode;
        getSurroundingTiles(tiles,tiles.find(t => t.hasPlayer)).filter(t => t.isVisible && t.building.type != "NONE").forEach(t => t.highlighted = !t.highlighted);
    }
}

document.addEventListener('keydown', (event) => {
    switch(event.keyCode){
        case 87:
            inputs.up = true;
            break;
        case 83:
            inputs.down = true;
            break;
        case 68:
            inputs.right = true;
            break;
        case 65:
            inputs.left = true;
            break;
        case 69:
            inputs.inter = true;
            break;
        case 66:
            inputs.build = true;
            break;
        case 82:
            inputs.remove = true;
            break;

    }
});
document.addEventListener('keyup', (event) => {
    switch(event.keyCode){
        case 87:
            inputs.up = false;
            break;
        case 83:
            inputs.down = false;
            break;
        case 68:
            inputs.right = false;
            break;
        case 65:
            inputs.left = false;
            break;
        case 69:
            inputs.inter = false;
            break;
        case 66:
            inputs.build = false;
            break;
        case 82:
            inputs.remove = false;
            break;

    }
});

setInterval(gameloop,50);
document.onmousemove = (e) => mousePosition = {x:e.clientX - canvas.getBoundingClientRect().left,y:e.clientY - canvas.getBoundingClientRect().top};

