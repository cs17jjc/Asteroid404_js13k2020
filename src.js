var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

var roverImg = document.getElementById("rover");
var towerImg = document.getElementById("tower");
var constructorImg = document.getElementById("constructor");
var solarImg = document.getElementById("solar");

var recipes = [{product:"CONSTRUCTOR",items:[{type:"IRON",value:5}],energy:2},{product:"RADAR",items:[{type:"IRON",value:7}],energy:4}];


canvas.width = 1280;
canvas.height = 720;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";

var prevInputs = {up:false,down:false,left:false,right:false,inter:false,build:false,remove:false};
var inputs = {up:false,down:false,left:false,right:false,inter:false,build:false,remove:false};

var tiles = [];
var messages = [];
var interactTiles = [];
var selectedTile = 0;

var playerResources = [];
var playerBuildings = [{type:"RADAR",value:1},{type:"SOLAR",value:1},{type:"CONSTRUCTOR",value:1}];
var selectedBuilding = 0;
var mineFactor = 1;

var buildMode = false;
var removeMode = false;
var settingRecipe = false;

noise.seed(Math.random());

var mapWidth = 50;

var marsColourScheme = [{levels:[0,1,2],colour:new Colour(69,24,4,255)},{levels:[3,4],colour:new Colour(193,68,14,255)},{levels:[5,6,7],colour:new Colour(231,125,17,255)},{levels:[8,9],colour:new Colour(253,166,0,255)}];
var biomeSeq = Array.from(Array(mapWidth).keys()).map(i => {
    if(i < 15){
        return 2;
    } else if (i < 35){
        return 3;
    } else {
        return 3;
    }
});

tiles = generateMap(mapWidth,biomeSeq,marsColourScheme);
updatePlayerPos(tiles,0,0);
placeBuilding(tiles.find(t => t.x == 20 && t.y == 2),{type:"RADAR"});
var millisOnLastFrame = new Date().getTime();
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
    messages = messages.slice(0,5).filter(m => m.time < 2000);
    messages.forEach(message => {
        ctx.fillText(message.text,10,canvas.height - 25 - (messages.indexOf(message) * 25));
        message.time += frameSpeedFactor;
    });
    

    ctx.fillText("Available resources:",10,25);
    playerResources.forEach(r => ctx.fillText(r.value + " units of " + r.type,10, 50 + playerResources.indexOf(r) * 25));
    ctx.fillText("Available buildings:",canvas.width - 200,25);
    playerBuildings.forEach(b => {
        if(selectedBuilding == playerBuildings.indexOf(b) && buildMode){
            ctx.fillStyle = "#FFFF00";
        } else {
            ctx.fillStyle = "#FFFFFF";
        }
        ctx.fillText(b.value + " units of " + b.type,canvas.width - 200, 50 + playerBuildings.indexOf(b) * 25);
    });

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "30px Tahoma";
    ctx.textAlign = "center"; 
    ctx.textBaseline = "middle";
    if(buildMode){
        ctx.fillText("Build Mode",canvas.width/2,30);
    }
    if(removeMode){
        ctx.fillText("Remove Mode",canvas.width/2,30);
    }
    if(settingRecipe){
        ctx.fillText("Set Recipe:",canvas.width/2,30);
        ctx.font = "20px Tahoma";
        recipes.forEach(r => {
            var index = recipes.indexOf(r);
            if(selectedBuilding == index){
                ctx.fillStyle = "#FFFF00";
            } else {
                ctx.fillStyle = "#FFFFFF";
            }
            ctx.fillText(r.product,canvas.width/2,60 + 25 * index);
        })
    }

    if(Object.entries(prevInputs).toString() !== Object.entries(inputs).toString()){
        handleInput();
    }
    playerResources = playerResources.filter(r => r.value > 0);
    playerBuildings = playerBuildings.filter(b => b.value > 0);
    prevInputs = Object.assign({},inputs);
    millisOnLastFrame = new Date().getTime();
}

function handleInput(){
    if(inputs.up == false && prevInputs.up == true && !buildMode && !removeMode && !settingRecipe){
        updatePlayerPos(tiles,0,-1);
    }
    if(inputs.down == false && prevInputs.down == true && !buildMode && !removeMode && !settingRecipe){
        updatePlayerPos(tiles,0,+1);
    }
    if(inputs.up == false && prevInputs.up == true && buildMode){
        selectedBuilding = Math.max(0,selectedBuilding - 1);
    }
    if(inputs.down == false && prevInputs.down == true && buildMode){
        selectedBuilding = Math.min(playerBuildings.length - 1,selectedBuilding + 1);
    }
    if(inputs.up == false && prevInputs.up == true && settingRecipe){
        selectedBuilding = Math.max(0,selectedBuilding - 1);
    }
    if(inputs.down == false && prevInputs.down == true && settingRecipe){
        selectedBuilding = Math.min(recipes.length - 1,selectedBuilding + 1);
    }

    if(inputs.right == false && prevInputs.right == true && !buildMode && !removeMode && !settingRecipe){
        updatePlayerPos(tiles,+1,0);
    }
    if(inputs.left == false && prevInputs.left == true && !buildMode && !removeMode && !settingRecipe){
        updatePlayerPos(tiles,-1,0);
    }
    if(inputs.right == false && prevInputs.right == true && (buildMode || removeMode)){
        selectedTile = Math.min(interactTiles.length - 1,selectedTile + 1);
    }
    if(inputs.left == false && prevInputs.left == true && (buildMode || removeMode)){
        selectedTile = Math.max(0,selectedTile - 1);
    }

    if(inputs.inter == false && prevInputs.inter == true && !buildMode && !removeMode){
        var playerTile = tiles.find(t => t.hasPlayer);
        if(playerTile.building != "NONE"){
            if(playerTile.building.type == "CONSTRUCTOR"){
                if(settingRecipe){
                    playerTile.building.recipe = recipes[selectedBuilding];
                    selectedBuilding = 0;
                    settingRecipe = false;
                } else if(playerTile.building.recipe == null){
                    settingRecipe = true;
                } else {
                    
                }
            }
        } else {
            var minedRes = mineTile(playerTile);
            if(minedRes.type != "NONE"){
                var totalMined = minedRes.value * mineFactor;
                var playerRes = playerResources.find(r => r.type == minedRes.type);
                if(playerRes != null){
                    playerRes.value += totalMined;
                } else {
                    playerResources.push({type:minedRes.type,value:totalMined});
                }
            }
        }
    }

    if(inputs.build == false && prevInputs.build == true && !removeMode && !buildMode && !settingRecipe && playerBuildings.length > 0){
        selectedBuilding = 0;
        buildMode = true;
        interactTiles = getSurroundingTiles(tiles,tiles.find(t => t.hasPlayer)).filter(t => t.isVisible && t.building.type == "NONE");
        interactTiles.forEach(t => t.highlighted = true);
    } else if(inputs.build == false && prevInputs.build == true && buildMode){
        selectedTile = 0;
        buildMode = false;
        interactTiles = [];
        getSurroundingTiles(tiles,tiles.find(t => t.hasPlayer)).forEach(t => t.highlighted = false);
    }

    if(inputs.remove == false && prevInputs.remove == true && !buildMode && !removeMode && !settingRecipe){
        removeMode = true;
        interactTiles = getSurroundingTiles(tiles,tiles.find(t => t.hasPlayer)).filter(t => t.isVisible && t.building.type != "NONE");
        interactTiles.forEach(t => t.highlighted = true);
    } else if(inputs.remove == false && prevInputs.remove == true && removeMode){
        selectedTile = 0;
        removeMode = false;
        interactTiles = [];
        getSurroundingTiles(tiles,tiles.find(t => t.hasPlayer)).forEach(t => t.highlighted = false);
    }

    if(buildMode && inputs.inter == false && prevInputs.inter == true){
        placeBuilding(interactTiles[selectedTile],playerBuildings[selectedBuilding]);
        interactTiles[selectedTile].highlighted = false;
        interactTiles = interactTiles.filter(t => t != interactTiles[selectedTile]);
        selectedBuilding = 0;
        if(playerBuildings.length == 1){
            selectedTile = 0;
            buildMode = false;
            interactTiles = [];
            getSurroundingTiles(tiles,tiles.find(t => t.hasPlayer)).forEach(t => t.highlighted = false);
        }
    }

    if(removeMode && inputs.inter == false && prevInputs.inter == true){
        removeBuilding(interactTiles[selectedTile]);
        interactTiles[selectedTile].highlighted = false;
        interactTiles = interactTiles.filter(t => t != interactTiles[selectedTile]);
        if(!interactTiles.some(t => t.building.type != "NONE")){
            selectedTile = 0;
            removeMode = false;
            interactTiles = [];
            getSurroundingTiles(tiles,tiles.find(t => t.hasPlayer)).forEach(t => t.highlighted = false);
        }
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

