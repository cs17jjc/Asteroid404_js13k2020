var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

var roverImg = document.getElementById("rover");
var towerImg = document.getElementById("tower");
var constructorImg = document.getElementById("constructor");
var solarImg = document.getElementById("solar");
var minerImg = document.getElementById("miner");
var batteryImg = document.getElementById("battery");
var labImg = document.getElementById("lab");

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

var playerResources = [{type:"IRON",value:10}];
var playerBuildings = [{type:"RADAR",value:1},{type:"SOLAR",value:1},{type:"CONSTRUCTOR",value:2},{type:"MINER",value:2},{type:"LAB",value:2},{type:"BATTERY",value:2}];
var selectedBuilding = 0;
var mineFactor = 1;
var upgradePoints = 0;

var buildMode = false;
var removeMode = false;
var settingRecipe = false;

var solarOutput = 1;
var craftSpeed = 1;
var minerFactor = 5;
var mineSpeed = 3;
var minerTransmit = true;
var batteryDischarge = 1;

var time = 0;

noise.seed(Math.random());

var mapWidth = 1000;

var marsColourScheme = [{levels:[0,1,2],colour:new Colour(69,24,4,255)},{levels:[3,4],colour:new Colour(193,68,14,255)},{levels:[5,6,7],colour:new Colour(231,125,17,255)},{levels:[8,9],colour:new Colour(253,166,0,255)}];
var biomeSeq = Array.from(Array(mapWidth).keys()).map(i => {
    if(i < 100){
        return 4;
    } else if (i < 200){
        return 3;
    } else if (i < 300){
        return 2;
    } else if (i < 400){
        return 1;
    }else if (i < 500){
        return 0;
    }else if (i < 600){
        return 1;
    }else if (i < 700){
        return 2;
    }else if (i < 800){
        return 3;
    }else if (i < 900){
        return 4;
    } else {
        return 4;
    }
});

tiles = generateMap(mapWidth,biomeSeq,marsColourScheme);
placeBuilding(tiles.find(t => t.x == 550 && t.y == 2),{type:"RADAR",value:1});
updatePlayerPos(tiles,0,0);
var millisOnLastFrame = new Date().getTime();
function gameloop(){
    var frameSpeedFactor = new Date().getTime() - millisOnLastFrame;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);

    ctx.font = "15px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#000000";
    ctx.textAlign = "start"; 
    ctx.textBaseline = "alphabetic";
    //Tile updates
    tiles.filter(t => t.isVisible && t.building.type != "NONE").forEach(t => {

        switch(t.building.type){
            case "SOLAR":
                var surrounding = getSurroundingTiles(tiles,t).filter(tt => tt.building.energy != null).filter(tt => tt.building.energy != tt.building.maxEnergy);
                var totalEnergy = solarOutput * Math.max(0.1,Math.sin(time * Math.PI/180));
                var induvidualEnergy = (totalEnergy / surrounding.length) * (frameSpeedFactor/1000);
                surrounding.forEach(tt => {
                    if(tt.building.energy + induvidualEnergy >= tt.building.maxEnergy){
                        tt.building.energy = tt.building.maxEnergy;
                    } else {
                        tt.building.energy += induvidualEnergy;
                    }
                });
                if(t.hasPlayer){
                    ctx.fillText("Energy Output: " + totalEnergy.toFixed(2),canvas.width - 200,canvas.height - 100);
                }
                break;
            case "CONSTRUCTOR":
                if(t.building.recipe != null){
                    if(t.building.recipe.energy <= t.building.energy){
                        var buildingItems = t.building.storedItems;
                        var recipeItems = t.building.recipe.items;
                        if(recipeItems.filter(i => buildingItems.some(ii => ii.type == i.type && ii.value >= i.value)).length == recipeItems.length && !t.building.crafting){
                            buildingItems.forEach(i => i.value -= recipeItems.find(ii => ii.type == i.type).value);
                            t.building.crafting = true;
                            t.building.energy -= t.building.recipe.energy;
                        }
                    }
                    if(t.building.crafting){
                        t.building.craftTimer += (frameSpeedFactor/10000) * craftSpeed;
                        if(t.building.craftTimer >= 1){
                            addToPlayerBuildings(t.building.recipe.product,1);
                            t.building.crafting = false;
                            t.building.craftTimer = 0;
                        }
                    }
                    if(t.hasPlayer){
                        ctx.fillText("Recipe: " + t.building.recipe.product,canvas.width - 200,canvas.height - 100);
                        ctx.fillText("Energy: " + Math.trunc(t.building.energy),canvas.width - 200,canvas.height - 80);
                        ctx.fillText("Progress: " + Math.trunc(t.building.craftTimer * 100) + "%",canvas.width - 200,canvas.height - 60);
                    }
                }
                t.building.storedItems = t.building.storedItems.filter(i => i.value > 0);
                break;
            case "MINER":
                if(!t.building.mining){
                    if(t.building.energy >= minerFactor && t.resource.type != "NONE"){
                        t.building.energy -= minerFactor;
                        t.building.mining = true;
                    }
                } else{
                    t.building.mineTimer += (frameSpeedFactor/50000) * mineSpeed;
                    if(t.building.mineTimer >= 1){
                        addToBuildingStorage(t.building.storedItems,t.resource.type,minerFactor);
                        mineTile(t);
                        t.building.mining = false;
                        t.building.mineTimer = 0;
                    }
                }
                if(minerTransmit){
                    t.building.storedItems.forEach(i => {
                        addToPlayerResources(i.type,i.value);
                        i.value = 0;
                    });
                    t.building.storedItems = [];
                }
                if(t.hasPlayer){
                    ctx.fillText("Energy: " + Math.trunc(t.building.energy),canvas.width - 200,canvas.height - 80);
                    ctx.fillText("Progress: " + Math.trunc(t.building.mineTimer * 100) + "%",canvas.width - 200,canvas.height - 60);
                    if(minerTransmit){
                        ctx.fillText("Transmiting resources",canvas.width - 200,canvas.height - 40);
                    } else {
                        ctx.fillText("Contains: ",canvas.width - 200,canvas.height - 40);
                        t.building.storedItems.forEach(i =>ctx.fillText(i.value + " units of " + i.type,canvas.width - 200,canvas.height - 20));
                    }
                }
                break;
            case "RADAR":
                if(t.hasPlayer){
                    ctx.fillText("Total Coverage: " + (100 * tiles.filter(tt => tt.isVisible).length / tiles.length).toFixed(2) + "%",canvas.width - 200,canvas.height - 80);
                }
                break;
            case "BATTERY":
                var surrounding = getSurroundingTiles(tiles,t).filter(tt => tt.building.energy != null).filter(tt => tt.building.energy != tt.building.maxEnergy);
                var surroundingBatteries = surrounding.filter(tt => tt.building.type == "BATTERY").filter(tt => tt.building.energy + 1 < t.building.energy);
                var surroundingOther = surrounding.filter(tt => tt.building.type != "BATTERY");
                if(t.building.discharging){
                    t.building.dischargeTimer += (frameSpeedFactor/10000) * batteryDischarge;
                    if(surrounding.length == 0){
                        t.building.dischargeTimer = 0;
                        t.building.discharging = false;
                        t.building.energy = Math.min(t.building.energy + 1,t.building.maxEnergy);
                    }
                    if(t.building.dischargeTimer >= 1){
                        t.building.dischargeTimer = 0;
                        t.building.discharging = false;

                        if(surroundingOther.length > 0){
                            surroundingOther.forEach(tt => tt.building.energy += 1/surroundingOther.length);
                        } else if(surroundingBatteries.length > 0){
                            surroundingBatteries.forEach(tt => tt.building.energy += 1/surroundingBatteries.length);
                        }
                    }
                } else {
                    if(t.building.energy >= 1 && (surroundingOther.length > 0 || surroundingBatteries.length > 0 )){
                        t.building.energy -= 1;
                        t.building.discharging = true;
                    }
                }
                if(t.hasPlayer){
                    ctx.fillText("Energy: " + Math.trunc(t.building.energy),canvas.width - 200,canvas.height - 80);
                    ctx.fillText("Progress: " + Math.trunc(t.building.dischargeTimer * 100) + "%",canvas.width - 200,canvas.height - 60);
                }
                break;
        }

    })

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

    playerResources = playerResources.filter(r => r.value > 0);
    playerBuildings = playerBuildings.filter(b => b.value > 0);
    selectedBuilding = Math.min(playerBuildings.length - 1, selectedBuilding);
    if(Object.entries(prevInputs).toString() !== Object.entries(inputs).toString()){
        handleInput();
    }
    prevInputs = Object.assign({},inputs);
    time += (frameSpeedFactor/1000);
    time = time >= 360 ? 0 : time;
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
        if(playerTile.building.type != "NONE"){

            switch(playerTile.building.type){
                case "CONSTRUCTOR":
                    if(settingRecipe){
                        playerTile.building.recipe = Object.assign({},recipes[selectedBuilding]);
                        selectedBuilding = 0;
                        settingRecipe = false;
                    } else if(playerTile.building.recipe == null){
                        settingRecipe = true;
                    } else {
                        var recipeItems = playerTile.building.recipe.items;
                        if(recipeItems.filter(i => playerResources.some(ii => ii.type == i.type && ii.value >= i.value)).length == recipeItems.length){
                            playerResources.forEach(i => {
                                var recipeItem = recipeItems.find(ii => ii.type == i.type);
                                if(recipeItem != null){
                                    i.value -= recipeItem.value;
                                    addToBuildingStorage(playerTile.building.storedItems,recipeItem.type,recipeItem.value);
                                }
                            });
                        } else {
                            messages.unshift({text:"Not enough resources",time:0});
                        }
                    }
                    break;
                case "MINER":
                    if(!minerTransmit){
                        playerTile.building.storedItems.forEach(i => {
                            addToPlayerResources(i.type,i.value);
                            i.value = 0;
                        });
                        playerTile.building.storedItems = [];
                    }
                    break;

            }
        } else {
            var minedRes = mineTile(playerTile);
            if(minedRes.type != "NONE"){
                var totalMined = minedRes.value * mineFactor;
                zzfx(...[,,320,.01,,0,4,0,,,,,,,,.1,,0,.01]);
                addToPlayerResources(minedRes.type,totalMined);
            }
        }
    }

    //If B is pressed and not in any modes and player has buildings
    if(inputs.build == false && prevInputs.build == true && !removeMode && !buildMode && !settingRecipe && playerBuildings.length > 0){
        selectedBuilding = 0;
        buildMode = true;
        interactTiles = getSurroundingTiles(tiles,tiles.find(t => t.hasPlayer)).filter(t => t.isVisible && t.building.type == "NONE");
        interactTiles.forEach(t => t.highlighted = true);
    } else if(inputs.build == false && prevInputs.build == true && buildMode){
        selectedTile = 0;
        buildMode = false;
        interactTiles = [];
    }

    //If R is pressed and not in any modes and player has buildings
    if(inputs.remove == false && prevInputs.remove == true && !buildMode && !removeMode && !settingRecipe){
        removeMode = true;
        interactTiles = getSurroundingTiles(tiles,tiles.find(t => t.hasPlayer)).filter(t => t.isVisible && t.building.type != "NONE");
        interactTiles.forEach(t => t.highlighted = true);
    } else if(inputs.remove == false && prevInputs.remove == true && removeMode){
        selectedTile = 0;
        removeMode = false;
        interactTiles = [];
    }

    //If E is pressed and in build mode and empty spaces
    if(buildMode && inputs.inter == false && prevInputs.inter == true && interactTiles.some(t => t.building.type == "NONE")){
        placeBuilding(interactTiles[selectedTile],playerBuildings[selectedBuilding]);
        interactTiles[selectedTile].highlighted = false;
        interactTiles = interactTiles.filter(t => t != interactTiles[selectedTile]);
        selectedTile = Math.min(interactTiles.length - 1, selectedTile);
        if(playerBuildings.length == 1 || !interactTiles.some(t => t.building.type == "NONE")){
            selectedTile = 0;
            buildMode = false;
            interactTiles = [];
        }
    }
    //If E is pressed and in remove mode and buildings
    if(removeMode && inputs.inter == false && prevInputs.inter == true && interactTiles.some(t => t.building.type != "NONE")){
        removeBuilding(interactTiles[selectedTile]);
        interactTiles[selectedTile].highlighted = false;
        interactTiles = interactTiles.filter(t => t != interactTiles[selectedTile]);
        selectedTile = Math.min(interactTiles.length - 1, selectedTile);
        if(!interactTiles.some(t => t.building.type != "NONE")){
            selectedTile = 0;
            removeMode = false;
            interactTiles = [];
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

