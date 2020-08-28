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
var rtgImg = document.getElementById("rtg");

var menuItems = ["Mute Music","Mute Sound FX"];
var selectedMenuItem = 0;

var soundFxVolume = 0.1;

var recipes = [{product:"LAB",items:[{type:"IRON",value:10},{type:"COPPER",value:5}],energy:4},{product:"EXIT",items:[],energy:0}];
var research = [{unlock:"RADAR_RECIPE",points:2,value:10},{unlock:"EXIT",points:0,value:0}];

var playerPos = {x:0,y:0};

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
var playerBuildings = [{type:"RTG",value:3},{type:"CONSTRUCTOR",value:2},{type:"LAB",value:3}];
var selectedBuilding = 0;
var mineFactor = 1;
var upgradePoints = 0;
var currentUpgrade = null;
var upgradeProgress = 0;
var maxStorage = 50;

var buildMode = false;
var removeMode = false;
var settingRecipe = false;
var settingResearch = false;
var escMenu = false;

var solarOutput = 1;
var craftSpeed = 1;
var craftMaxQueued = 2;
var minerFactor = 5;
var mineSpeed = 3;
var minerTransmit = false;
var constructorTransmit = false;
var batteryDischarge = 1;
var upgradeSpeed = 1.5;
var RTGOutput = 5;
var upgradePointUnlock = false;

var time = 0;
var sols = 0;

var hudColourScheme = {outline:"#00FF00",infill:"#000000AA",text:"#00FF00",staticText:"#00AA00",dynamicText:"#00FF00"};


let mySongData = zzfxM(...song);
let myAudioNode = zzfxP(...mySongData);
myAudioNode.loop = true;
//myAudioNode.start();

var stars = Array.from(Array(500).keys()).map(i => {return {x:(Math.random() * 2 * canvas.width) - canvas.width,y:(Math.random() * 2 * canvas.height) - canvas.height,r:Math.random() * 3}});

noise.seed(Math.random());

var mapWidth = 500;

var marsColourScheme = [{levels:[0,1,2],colour:new Colour(69,24,4,255)},{levels:[3,4],colour:new Colour(193,68,14,255)},{levels:[5,6,7],colour:new Colour(231,125,17,255)},{levels:[8,9],colour:new Colour(253,166,0,255)}];
var lastBiome = 0;
var lastBiomeLength = 0;
var biomeSeq = Array.from(Array(mapWidth).keys()).map(i => {
    if(i >= 0 && i < 50){
        return 4;
    }
    if(i >= 50 && i < 100){
        return 0;
    }
    if(i >= 100 && i < 150){
        return 1;
    }
    if(i >= 150 && i < 200){
        return 0;
    }
    if(i >= 200 && i < 250){
        return 1;
    }
    if(i >= 250 && i < 254){
        return 2;
    }
    if(i >= 254 && i < 300){
        return 3;
    }
    if(i >= 300 && i < 350){
        return 4;
    }
    if(i >= 350 && i < 450){
        return 3;
    }
    if(i >= 450 && i <= 500){
        return 4;
    }
});

tiles = generateMap(mapWidth,biomeSeq,marsColourScheme);
placeBuilding(tiles.find(t => t.x == tiles.find(t => t.hasPlayer).x && t.y == 2),{type:"RADAR",value:1});
updatePlayerPos(tiles,0,0);
var millisOnLastFrame = new Date().getTime();
var frameSpeedFactor = 0;
function gameloop(){
    frameSpeedFactor =  escMenu ? 0 : new Date().getTime() - millisOnLastFrame;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);
    ctx.fillStyle = "#FFFFF0";
    ctx.save();
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.rotate((Math.PI/180) * ((sols * 360) + time));
    stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x,s.y,s.r,0, 2 * Math.PI);
        ctx.fill();
    });
    ctx.restore();

    if(currentUpgrade != null){
        handleUpgrades();
    }

    ctx.font = "15px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#000000";
    ctx.textAlign = "start"; 
    ctx.textBaseline = "alphabetic";
    //Tile updates
    tiles.filter(t => t.isVisible && t.building.type != "NONE").forEach(t => handleTileUpdates(t));

    renderMap(ctx,tiles);
    
    playerResources = playerResources.filter(r => r.value > 0);
    playerBuildings = playerBuildings.filter(b => b.value > 0);

    //Reset modes
    if(buildMode && (playerBuildings.length == 0 || !interactTiles.some(t => t.building.type == "NONE"))){
        selectedTile = 0;
        buildMode = false;
        interactTiles = [];
    }
    if(removeMode && !interactTiles.some(t => t.building.type != "NONE")){
        selectedTile = 0;
        removeMode = false;
        interactTiles = [];
    }

    if(!escMenu){
        handleHUD();
    } else {
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center"; 
        ctx.textBaseline = "middle";
        ctx.font = "30px Tahoma";
        ctx.fillText("Paused",canvas.width/2,30);
        ctx.font = "25px Tahoma";
        menuItems.forEach(s => {
            var index = menuItems.indexOf(s);
            if(index == selectedMenuItem){
                ctx.fillStyle = "#FFFF00";
            } else {
                ctx.fillStyle = "#FFFFFF";
            }
            ctx.fillText(s,canvas.width/2,60 + 25 * index);
        });
    }

    if(Object.entries(prevInputs).toString() !== Object.entries(inputs).toString()){
        if(escMenu){
            handleMenuInput();
        } else {
            handleInput();  
        }
    }
    prevInputs = Object.assign({},inputs);
    time += (frameSpeedFactor/1000);
    if(time >= 360){
        sols += 1;
    }
    time = time >= 360 ? 0 : time;
    millisOnLastFrame = new Date().getTime();
}

function handleInput(){
    if(inputs.up == false && prevInputs.up == true && !buildMode && !removeMode && !settingRecipe && !settingResearch && !escMenu){
        updatePlayerPos(tiles,0,-1);
    }
    if(inputs.down == false && prevInputs.down == true && !buildMode && !removeMode && !settingRecipe && !settingResearch && !escMenu){
        updatePlayerPos(tiles,0,+1);
    }
    if(inputs.up == false && prevInputs.up == true && buildMode){
        selectedBuilding = Math.max(0,selectedBuilding - 1);
    }
    if(inputs.down == false && prevInputs.down == true && buildMode){
        selectedBuilding = Math.max(0,Math.min(playerBuildings.length - 1,selectedBuilding + 1));
    }
    if(inputs.up == false && prevInputs.up == true && settingRecipe){
        selectedBuilding = Math.max(0,selectedBuilding - 1);
    }
    if(inputs.down == false && prevInputs.down == true && settingRecipe){
        selectedBuilding = Math.max(0,Math.min(recipes.length - 1,selectedBuilding + 1));
    }
    if(inputs.up == false && prevInputs.up == true && settingResearch){
        selectedBuilding = Math.max(0,selectedBuilding - 1);
    }
    if(inputs.down == false && prevInputs.down == true && settingResearch){
        selectedBuilding = Math.min(research.length - 1,selectedBuilding + 1);
    }

    if(inputs.right == false && prevInputs.right == true && !buildMode && !removeMode && !settingRecipe && !settingResearch && !escMenu){
        updatePlayerPos(tiles,+1,0);
    }
    if(inputs.left == false && prevInputs.left == true && !buildMode && !removeMode && !settingRecipe && !settingResearch && !escMenu){
        updatePlayerPos(tiles,-1,0);
    }
    if(inputs.right == false && prevInputs.right == true && (buildMode || removeMode)){
        selectedTile = Math.min(interactTiles.length - 1,selectedTile + 1);
    }
    if(inputs.left == false && prevInputs.left == true && (buildMode || removeMode)){
        selectedTile = Math.max(0,selectedTile - 1);
    }

    if(inputs.inter == false && prevInputs.inter == true && !buildMode && !removeMode && !escMenu){
        var playerTile = tiles.find(t => t.hasPlayer);
        if(playerTile.building.type != "NONE"){
            handleBuildingInteraction(playerTile);
        } else {
            if(playerTile.resource.type != "NONE"){
                var totalMined = Math.round(mineFactor);
                if(addToPlayerResources(playerTile.resource.type,totalMined,true)){
                    mineTile(playerTile);
                    zzfx(...[soundFxVolume,,320,.01,,0,4,0,,,,,,,,.1,,0,.01]).start();
                }
            }
        }
    }

    //If B is pressed and not in any modes and player has buildings
    if(inputs.build == false && prevInputs.build == true && !buildMode && !removeMode && !settingRecipe && !settingResearch && !escMenu && playerBuildings.length > 0){
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
    if(inputs.remove == false && prevInputs.remove == true && !buildMode && !removeMode && !settingRecipe && !settingResearch && !escMenu){
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
        playerBuildings = playerBuildings.filter(b => b.value > 0);
        interactTiles[selectedTile].highlighted = false;
        interactTiles = interactTiles.filter(t => t != interactTiles[selectedTile]);
        selectedTile = Math.min(interactTiles.length - 1, selectedTile);
        selectedBuilding = Math.min(playerBuildings.length-1,selectedBuilding);
    }
    //If E is pressed and in remove mode and buildings
    if(removeMode && inputs.inter == false && prevInputs.inter == true && interactTiles.some(t => t.building.type != "NONE")){
        removeBuilding(interactTiles[selectedTile]);
        interactTiles[selectedTile].highlighted = false;
        interactTiles = interactTiles.filter(t => t != interactTiles[selectedTile]);
        selectedTile = Math.min(interactTiles.length - 1, selectedTile);
    }
}

function handleMenuInput(){
    if(inputs.up == false && prevInputs.up == true){
        selectedMenuItem = Math.max(0,selectedMenuItem - 1);
    }
    if(inputs.down == false && prevInputs.down == true){
        selectedMenuItem = Math.min(menuItems.length - 1, selectedMenuItem + 1);
    }
    if(inputs.inter == false && prevInputs.inter == true){
        switch(menuItems[selectedMenuItem]){
            case "Mute Music":
                myAudioNode.disconnect();
                menuItems[selectedMenuItem] = "Unmute Music";
                break;
            case "Mute Sound FX":
                soundFxVolume = 0;
                menuItems[selectedMenuItem] = "Unmute Sound FX";
                break;
            case "Unmute Music":
                myAudioNode.connect(zzfxX.destination);
                menuItems[selectedMenuItem] = "Mute Music";
                break;
            case "Unmute Sound FX":
                soundFxVolume = 1;
                menuItems[selectedMenuItem] = "Mute Sound FX";
                break;
        }
    }
}

function handleBuildingInteraction(playerTile){
    switch(playerTile.building.type){
        case "CONSTRUCTOR":
            if(settingRecipe){
                var selectedRecipe = Object.assign({},recipes[selectedBuilding]);
                if(selectedRecipe.product != "EXIT")
                {
                    playerTile.building.recipe = selectedRecipe;
                }
                settingRecipe = false;
            } else if(playerTile.building.recipe == null){
                settingRecipe = true;
                selectedBuilding = 0;
            } else {
                if(playerTile.building.storedProduct == 0) {
                    if(playerTile.building.queued < craftMaxQueued){
                        var recipeItems = playerTile.building.recipe.items;
                        if(recipeItems.filter(i => playerResources.some(ii => ii.type == i.type && ii.value >= i.value)).length == recipeItems.length){
                            playerResources.forEach(i => {
                                var recipeItem = recipeItems.find(ii => ii.type == i.type);
                                if(recipeItem != null){
                                    i.value -= recipeItem.value;
                                    messages.unshift({text:"Used " + recipeItem.value + " units of " + i.type,time:0});
                                    addToBuildingStorage(playerTile.building.storedItems,recipeItem.type,recipeItem.value);
                                }
                            });
                            playerTile.building.queued += 1;
                        } else {
                            recipeItems.forEach(i => {
                                var missingItem = playerResources.find(ii => ii.type == i.type && ii.value < i.value);
                                if(missingItem != null){
                                    messages.unshift({text:(i.value - missingItem.value) + " more " + i.type + " needed",time:0});
                                } else if(!playerResources.some(ii => ii.type == i.type)){
                                    messages.unshift({text:i.value + " more " + i.type + " needed",time:0});
                                }
                            });
                        }
                    } else {
                        messages.unshift({text:"Maximum craft queue sized reached",time:0});
                    }
            } else {
                addToPlayerBuildings(playerTile.building.recipe.product,playerTile.building.storedProduct);
                messages.unshift({text:"Gained " + playerTile.building.storedProduct + " units of " + playerTile.building.recipe.product,time:0});
                playerTile.building.storedProduct = 0;
            }
            }
            break;
        case "LAB":
            if(settingResearch){
                var selectedUpgrade = Object.assign({},research[selectedBuilding]);
                if(selectedUpgrade.unlock == "EXIT"){
                    selectedBuilding = 0;
                    settingResearch = false;
                } else {
                    if(selectedUpgrade.points <= upgradePoints){
                        currentUpgrade = selectedUpgrade;
                        upgradePoints -= selectedUpgrade.points;
                        selectedBuilding = 0;
                        settingResearch = false;
                    } else {
                        selectedBuilding = 0;
                        settingResearch = false;
                        messages.unshift({text:"Need " + (selectedUpgrade.points - upgradePoints) + " more upgrade points",time:0});
                    }
                }
            } else if(currentUpgrade == null){
                settingResearch = true;
                selectedBuilding = 0;
            }
            break;
        case "MINER":
            if(!minerTransmit){
                playerTile.building.storedItems.forEach(i => {
                    addToPlayerResources(i.type,i.value,false);
                    i.value = 0;
                });
                playerTile.building.storedItems = [];
            }
            break;

    }
}

function handleHUD(){

    var modeHeight = 60;
    var selectionHeight = 30;
    var textColour = hudColourScheme.staticText;

    ctx.strokeStyle = hudColourScheme.outline;
    ctx.fillStyle = hudColourScheme.infill;
    var points = generateHudOverlay();
    ctx.beginPath();
    for(var i = 0;i<points.length;i++){
        if(i == 0){
            ctx.moveTo(points[i].x,points[i].y);
        } else {
            ctx.lineTo(points[i].x,points[i].y);
        }
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();


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

    ctx.fillStyle = hudColourScheme.text;
    ctx.fillText("Available resources:",10,25);
    playerResources.forEach(r => ctx.fillText(r.value + "/" + maxStorage + " units of " + r.type,10, 50 + playerResources.indexOf(r) * 25));
    ctx.fillText("Available buildings:",canvas.width - 200,25);
    playerBuildings.forEach(b => {
        if(selectedBuilding == playerBuildings.indexOf(b) && buildMode){
            ctx.fillStyle = hudColourScheme.dynamicText;
        } else {
            ctx.fillStyle = textColour;
        }
        ctx.fillText(b.value + " units of " + b.type,canvas.width - 200, 50 + playerBuildings.indexOf(b) * 25);
    });

    
    ctx.textAlign = "center"; 
    ctx.textBaseline = "middle";
    ctx.fillStyle = hudColourScheme.text;
    if(upgradePointUnlock){
        ctx.fillText("Sol: " + sols + " Planet Rotation: " + time.toFixed(2) + "°" + " GPS X:" + playerPos.x + " Y:" + playerPos.y + " Upgrade Points: " + upgradePoints,canvas.width/2,15);
    } else {
        ctx.fillText("Sol: " + sols + " Planet Rotation: " + time.toFixed(2) + "°" + " GPS X:" + playerPos.x + " Y:" + playerPos.y,canvas.width/2,15);
    }
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "30px Tahoma";
    if(buildMode){
        ctx.fillText("Build Mode",canvas.width/2,modeHeight);
    }
    if(removeMode){
        ctx.fillText("Remove Mode",canvas.width/2,modeHeight);
    }
    if(settingRecipe){
        ctx.fillText("Set Recipe:",canvas.width/2,modeHeight);
        ctx.font = "20px Tahoma";
        recipes.forEach(r => {
            var index = recipes.indexOf(r);
            if(selectedBuilding == index){
                ctx.fillStyle = hudColourScheme.dynamicText;
            } else {
                ctx.fillStyle = "#FFFFFF";
            }
            if(r.product == "EXIT"){
                ctx.fillText(r.product,canvas.width/2,modeHeight + selectionHeight + (25 * index));
            } else {
                var itemStr = "";
                r.items.forEach(i => itemStr = itemStr + " " + i.value + " " + i.type);
                ctx.fillText(r.product + " :" + itemStr,canvas.width/2,modeHeight + selectionHeight + (25 * index));
            }
        });
    }
    if(settingResearch){
        ctx.fillText("Set Research:",canvas.width/2,modeHeight);
        ctx.font = "20px Tahoma";
        research.forEach(r => {
            var index = research.indexOf(r);
            if(selectedBuilding == index){
                ctx.fillStyle = hudColourScheme.dynamicText;
            } else {
                ctx.fillStyle = "#FFFFFF";
            }
            if(r.unlock != "EXIT"){
                ctx.fillText(r.unlock + " : " + r.points + "",canvas.width/2,modeHeight + selectionHeight + (25 * index));
            } else {
                ctx.fillText(r.unlock,canvas.width/2,modeHeight + selectionHeight + (25 * index));
            }
        });
    }
}

function handleUpgrades(){
    if(upgradeProgress >= currentUpgrade.value){
        upgradeProgress = 0;
        messages.unshift({text:"Upgrade " + currentUpgrade.unlock + " completed",time:0});
        switch(currentUpgrade.unlock){
            case "RADAR_RECIPE":
                recipes.unshift({product:"RADAR",items:[{type:"IRON",value:10},{type:"COPPER",value:5}],energy:5});
                research = research.filter(r => r.unlock != "RADAR_RECIPE");
                research.unshift({unlock:"CONSTRUCTOR_RECIPE",points:4,value:8});
                break;
            case "CONSTRUCTOR_RECIPE":
                recipes.unshift({product:"CONSTRUCTOR",items:[{type:"IRON",value:15},{type:"COPPER",value:15}],energy:5});
                research = research.filter(r => r.unlock != "CONSTRUCTOR_RECIPE");
                research.unshift({unlock:"MINE_EFFICIENCY1",points:8,value:15});
                break;
            case "MINE_EFFICIENCY1":
                mineFactor += 1;
                research = research.filter(r => r.unlock != "MINE_EFFICIENCY1");
                research.unshift({unlock:"MINE_EFFICIENCY2",points:16,value:30});
                research.unshift({unlock:"MINER_RECIPE",points:25,value:30});
                break;
            case "MINE_EFFICIENCY2":
                mineFactor += 4;
                research = research.filter(r => r.unlock != "MINE_EFFICIENCY2");
                break;
            case "MINER_RECIPE":
                recipes.unshift({product:"MINER",items:[{type:"IRON",value:20},{type:"COPPER",value:15},{type:"CARBON",value:15}],energy:10});
                research = research.filter(r => r.unlock != "MINER_RECIPE");
                break;
        }
        currentUpgrade = null;
    }
}

function handleTileUpdates(t){
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
            if(t.hasPlayer && !escMenu){
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
                        t.building.queued -= 1;
                    }
                }
                if(t.building.crafting){
                    t.building.craftTimer += (frameSpeedFactor/10000) * craftSpeed;
                    if(t.building.craftTimer >= 1){
                        if(t.building.recipe.product == "UPGRADE_POINTS"){
                            upgradePoints += 1;
                        } else if (t.building.recipe.product == "LAB" && !upgradePointUnlock){
                            messages.unshift({text:"Upgrade Points Unlocked",time:0});
                            upgradePointUnlock = true;
                            recipes.unshift({product:"UPGRADE_POINTS",items:[{type:"IRON",value:5},{type:"COPPER",value:5}],energy:5});
                            t.building.storedProduct += 1;
                        } else {
                            if(constructorTransmit){
                                addToPlayerBuildings(t.building.recipe.product,t.building.recipe.storedProduct);
                                t.building.storedProduct = 0;
                            } else {
                                t.building.storedProduct += 1;
                            }
                        }
                        t.building.crafting = false;
                        t.building.craftTimer = 0;
                    }
                }
            }
            if(t.hasPlayer && !escMenu){
                ctx.fillText("Recipe: " + (t.building.recipe != undefined ? t.building.recipe.product : "None") ,canvas.width - 200,canvas.height - 100);
                ctx.fillText("Energy: " + Math.trunc(t.building.energy),canvas.width - 200,canvas.height - 80);
                ctx.fillText("Queued: " + t.building.queued,canvas.width - 200,canvas.height - 60);
                ctx.fillText("Progress: " + Math.trunc(t.building.craftTimer * 100) + "%",canvas.width - 200,canvas.height - 40);
                ctx.fillText("Stored: " + t.building.storedProduct,canvas.width - 200,canvas.height - 20);
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
                    addToPlayerResources(i.type,i.value,false);
                    i.value = 0;
                });
                t.building.storedItems = [];
            }
            if(t.hasPlayer && !escMenu){
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
            if(t.hasPlayer && !escMenu){
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
            if(t.hasPlayer && !escMenu){
                ctx.fillText("Energy: " + Math.trunc(t.building.energy),canvas.width - 200,canvas.height - 80);
                ctx.fillText("Progress: " + Math.trunc(t.building.dischargeTimer * 100) + "%",canvas.width - 200,canvas.height - 60);
            }
            break;
        case "LAB":
            if(t.building.upgrading){
                t.building.upgradeTimer += (frameSpeedFactor/10000) * upgradeSpeed;
                if(t.building.upgradeTimer >= 1){
                    upgradeProgress += 1;
                    t.building.upgrading = false;
                    t.building.upgradeTimer = 0;
                } else if(currentUpgrade == null){
                    t.building.upgrading = false;
                    t.building.upgradeTimer = 0;
                }
            }
            if(t.building.energy >= 1 && !t.building.upgrading && currentUpgrade != null){
                t.building.energy -= 1;
                t.building.upgrading = true;
            }
            if(t.hasPlayer && !escMenu){
                if(currentUpgrade != null){
                    ctx.fillText("Upgrade: " + currentUpgrade.unlock,canvas.width - 200,canvas.height - 100);
                    ctx.fillText("Progress: " + Math.trunc((upgradeProgress/currentUpgrade.value) * 100) + "% " + ".".repeat(t.building.upgradeTimer * 5),canvas.width - 200,canvas.height - 60);
                } else {
                    ctx.fillText("Select Upgrade",canvas.width - 200,canvas.height - 100);
                }
                ctx.fillText("Energy: " + Math.trunc(t.building.energy),canvas.width - 200,canvas.height - 80);
            }
            break;
        case "RTG":
            var surrounding = getSurroundingTiles(tiles,t).filter(tt => tt.building.energy != null).filter(tt => tt.building.energy != tt.building.maxEnergy);
            var induvidualEnergy = (RTGOutput / surrounding.length) * (frameSpeedFactor/1000);
            surrounding.forEach(tt => {
                if(tt.building.energy + induvidualEnergy >= tt.building.maxEnergy){
                    tt.building.energy = tt.building.maxEnergy;
                } else {
                    tt.building.energy += induvidualEnergy;
                }
            });
            if(t.hasPlayer && !escMenu){
                if(surrounding.length > 0){
                    ctx.fillText("Energy Output Per Tile: " + induvidualEnergy.toFixed(2),canvas.width - 200,canvas.height - 100);
                } else {
                    ctx.fillText("No tiles need power",canvas.width - 200,canvas.height - 100);
                }
            }
            break;
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
        case 27:
            escMenu = !escMenu;
    }
});

setInterval(gameloop,50);
document.onmousemove = (e) => mousePosition = {x:e.clientX - canvas.getBoundingClientRect().left,y:e.clientY - canvas.getBoundingClientRect().top};