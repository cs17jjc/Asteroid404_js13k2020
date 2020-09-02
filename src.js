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
var brokenImg = document.getElementById("broken");
var teledepotImg = document.getElementById("teledepot");
var roboshopImg = document.getElementById("shop");

var menuItems = ["Mute Music","Mute Sound FX"];
var selectedMenuItem = 0;

var soundFxVolume = 0;

var recipes = [{product:"EXIT",items:[],energy:0},
               {product:"RADAR",items:[{type:"IRON",value:20}],energy:4},
               {product:"CONSTRUCTOR",items:[{type:"IRON",value:20},{type:"COPPER",value:20}],energy:6}];
var prices = [{type:"EXIT",price:0,ammount:0},
              {type:"ROCK",price:1,ammount:1},{type:"ROCK",price:1,ammount:10},{type:"ROCK",price:1,ammount:50},
              {type:"COPPER",price:25,ammount:1},{type:"COPPER",price:25,ammount:10},{type:"COPPER",price:25,ammount:50},
              {type:"IRON",price:50,ammount:1},{type:"IRON",price:50,ammount:10},{type:"IRON",price:50,ammount:50},
              {type:"CARBON",price:75,ammount:1},{type:"CARBON",price:75,ammount:10},{type:"CARBON",price:75,ammount:50},
              {type:"LITHIUM",price:150,ammount:1},{type:"LITHIUM",price:150,ammount:10},{type:"LITHIUM",price:150,ammount:50},
              {type:"SILICON",price:500,ammount:1},{type:"SILICON",price:500,ammount:10},{type:"SILICON",price:500,ammount:50},
              {type:"PLUTONIUM",price:1000,ammount:1},{type:"PLUTONIUM",price:1000,ammount:10},{type:"PLUTONIUM",price:1000,ammount:50}];
var shopItems = [{item:"RADAR_RECIPE",cost:500}];

var playerPos = {x:0,y:0};
var playerEnergy = 50;
var playerDeadState = false;

var playerBalance = 0;
var playerBalanceDisplayed = 0;

canvas.width = 1280;
canvas.height = 720;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";

var prevInputs = {up:false,down:false,left:false,right:false,inter:false,build:false,remove:false,info:false};
var inputs = {up:false,down:false,left:false,right:false,inter:false,build:false,remove:false,info:false};

var playerPosOffset = {x:0,y:0};

var tiles = [];
var messages = [];
var interactTiles = [];
var selectedTile = 0;
var selectedSell = 0;

var playerResources = [{type:"ROCK",value:25},{type:"COPPER",value:25},{type:"IRON",value:25},{type:"CARBON",value:25},{type:"LITHIUM",value:25}];
var playerBuildings = [{type:"CONSTRUCTOR",value:1},{type:"SOLAR",value:1},{type:"MINER",value:3},{type:"RTG",value:3},{type:"BATTERY",value:3}];
var selectedBuilding = 0;

//Modes
var buildMode = false;
var removeMode = false;
var settingRecipe = false;
var escMenu = false;
var selectingSell = false;
var buyingMode = false;

//Player Upgrades:
var playerMaxEnergy = 50;
var playerDrainRate = 1;
var playerSpeed = 1;
var maxStepHeight = 5;
var mineFactor = 1;
var maxStorage = 50;

//Building Upgrades:
var solarOutput = 1;
var craftSpeed = 1;
var minerFactor = 5;
var mineSpeed = 3;
var minerTransmit = false;
var constructorTransmit = false;
var batteryDischarge = 1.5;
var RTGOutput = 5;

var time = 0;
var sols = 0;

var hudFlashTimer = 0;
var hudFlash = false;
var hudSwap = false;

var interactTimer = 0;
var interactTimerSpeed = 1;

//var hudColourScheme = {outline:"#00FF00",infill:"#000000AA",text:"#00FF00",staticText:"#00AA00",dynamicText:"#00FF00"};
var hudColourScheme = {outline:"#FFFFFF",infill:"#000000AA",text:"#FFFFFF",staticText:"#AAAAAA",dynamicText:"#FFFFFF"};

let mySongData = zzfxM(...song);
let myAudioNode = zzfxP(...mySongData);
myAudioNode.loop = true;
//myAudioNode.start();

var stars = Array.from(Array(500).keys()).map(i => {return {x:(Math.random() * 2 * canvas.width) - canvas.width,y:(Math.random() * 2 * canvas.height) - canvas.height,r:Math.random() * 3}});

noise.seed(Math.random());

var mapWidth = 500;

//var marsColourScheme = [{levels:[0,1,2],colour:new Colour(69,24,4,255)},{levels:[3,4],colour:new Colour(193,68,14,255)},{levels:[5,6,7],colour:new Colour(231,125,17,255)},{levels:[8,9],colour:new Colour(253,166,0,255)}];
//var otherColourScheme = [{levels:[0,1,2],colour:new Colour(134, 187, 216,255)},{levels:[3,4],colour:new Colour(97, 231, 134,255)},{levels:[5,6,7],colour:new Colour(240, 101, 67,255)},{levels:[8,9],colour:new Colour(26, 94, 99,255)}];
var otherColourScheme = [{levels:[0,1,2],colour:new Colour(62, 47, 91,255)},{levels:[3,4],colour:new Colour(190, 184, 235,255)},{levels:[5,6,7],colour:new Colour(64, 121, 140,255)},{levels:[8,9],colour:new Colour(115, 251, 211,255)}];
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

var spawnX = 240;
tiles = generateMap(mapWidth,biomeSeq,otherColourScheme,spawnX);
placeBuilding(tiles.find(t => t.x == spawnX && t.y == 2),{type:"RADAR",value:1});
placeBuilding(tiles.find(t => t.x == spawnX && t.y == 0),{type:"RTG",value:1});
placeBuilding(tiles.find(t => t.x == spawnX + 3 && t.y == 2),{type:"TELEDEPOT",value:1});
placeBuilding(tiles.find(t => t.x == spawnX - 3 && t.y == 1),{type:"ROBOSHOP",value:1});
updatePlayerPos(tiles,0,0);
var millisOnLastFrame = new Date().getTime();
var frameSpeedFactor = 0;
soundFxVolume = 0.5;
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
    
    renderMap(ctx,tiles,canvas.height * 0.71,playerPosOffset);


    if(escMenu && !playerDeadState){
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
        handleMenuInput();
    } else if(!playerDeadState) {
        ctx.font = "15px Arial";
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#000000";
        ctx.textAlign = "start"; 
        ctx.textBaseline = "alphabetic";
        //Tile updates
        tiles.filter(t => t.isVisible && t.building.type != "NONE").forEach(t => handleTileUpdates(t));
        
        playerPosOffset.x = lerp(playerPosOffset.x,0,(frameSpeedFactor/150) * playerSpeed);
        playerPosOffset.y = lerp(playerPosOffset.y,0,(frameSpeedFactor/150) * playerSpeed);

        playerResources = playerResources.filter(r => r.value > 0);
        selectedSell = Math.min(prices.filter(p => playerResources.some(r => p.type == r.type && r.value >= p.ammount) || p.type == "EXIT").length - 1,selectedSell);
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
        if(selectingSell && prices.filter(p => playerResources.some(r => p.type == r.type && r.value >= p.ammount)).length == 0){
            selectedSell = 0;
            selectingSell = false;
        }

        //Drain player battery
        var playerTile = tiles.find(t => t.hasPlayer);
        if(!["RTG","SOLAR"].includes(playerTile.building.type)){
            playerEnergy -= (playerDrainRate + playerTile.hazard) * (frameSpeedFactor/1000);
        } else {
            hudFlash = false;
        }

        handleHUD();
        handleInput();  
    } else {
        //dead state
        playerPosOffset.y = lerp(playerPosOffset.y,10,(frameSpeedFactor/1500));
        roverImgScale = lerp(roverImgScale,0,(frameSpeedFactor/1500));
        var textScale = Math.trunc(50 - (50 * roverImgScale));
        ctx.font = textScale + "px Arial";
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#000000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("You Died",canvas.width/2,canvas.height * 0.2);
        if(roverImgScale < 0.4){
            (textScale*0.3).toFixed(0) + "px Arial";
            ctx.fillText("Press E to respawn",canvas.width/2,canvas.height * 0.3);
            if(inputs.inter == true && prevInputs.inter == false){
                playerEnergy = playerMaxEnergy;
                playerResources = [];
                playerBuildings = [];
                tiles.find(t => t.hasPlayer).hasPlayer = false;
                tiles.find(t => t.x == spawnX).hasPlayer = true;
                playerDeadState = false;
                roverImgScale = 1;
                playerPosOffset = {x:0,y:0};
            }
        }

    }

    prevInputs = Object.assign({},inputs);
    if(playerEnergy <= 0){
        playerDeadState = true;
    }
    time += (frameSpeedFactor/1000);
    if(time >= 360){
        sols += 1;
    }
    time = time >= 360 ? 0 : time;
    millisOnLastFrame = new Date().getTime();
}

function handleInput(){
    if(inputs.up == true && prevInputs.up == false && !buildMode && !removeMode && !settingRecipe && !escMenu && !selectingSell && Math.abs(playerPosOffset.y) < 10){
        updatePlayerPos(tiles,0,-1);
    }
    if(inputs.down == true && prevInputs.down == false && !buildMode && !removeMode && !settingRecipe && !escMenu && !selectingSell && Math.abs(playerPosOffset.y) < 10){
        updatePlayerPos(tiles,0,+1);
    }
    if(inputs.up == true && prevInputs.up == true && !buildMode && !removeMode && !settingRecipe && !escMenu && !selectingSell && Math.abs(playerPosOffset.y) < 10){
        updatePlayerPos(tiles,0,-1);
    }
    if(inputs.down == true && prevInputs.down == true && !buildMode && !removeMode && !settingRecipe && !escMenu && !selectingSell && Math.abs(playerPosOffset.y) < 10){
        updatePlayerPos(tiles,0,+1);
    }
    if(inputs.up == true && prevInputs.up == false && buildMode){
        selectedBuilding = Math.max(0,selectedBuilding - 1);
    }
    if(inputs.down == true && prevInputs.down == false && buildMode){
        selectedBuilding = Math.max(0,Math.min(playerBuildings.length - 1,selectedBuilding + 1));
    }
    if(inputs.up == true && prevInputs.up == false && settingRecipe){
        selectedBuilding = Math.max(0,selectedBuilding - 1);
    }
    if(inputs.down == true && prevInputs.down == false && settingRecipe){
        selectedBuilding = Math.max(0,Math.min(recipes.length - 1,selectedBuilding + 1));
    }
    if(inputs.up == true && prevInputs.up == false && selectingSell){
        selectedSell = Math.max(0,selectedSell - 1);
    }
    if(inputs.down == true && prevInputs.down == false && selectingSell){
        selectedSell = Math.min(prices.filter(p => playerResources.some(r => p.type == r.type && r.value >= p.ammount) || p.type == "EXIT").length - 1,selectedSell + 1);
    }

    if(inputs.right == true && prevInputs.right == false && !buildMode && !removeMode && !escMenu && Math.abs(playerPosOffset.x) < 10){
        updatePlayerPos(tiles,+1,0);
    }
    if(inputs.left == true && prevInputs.left == false && !buildMode && !removeMode && !escMenu && Math.abs(playerPosOffset.x) < 10){
        updatePlayerPos(tiles,-1,0);
    }
    if(inputs.right == true && prevInputs.right == true && !buildMode && !removeMode && !escMenu && Math.abs(playerPosOffset.x) < 10){
        updatePlayerPos(tiles,+1,0);
    }
    if(inputs.left == true && prevInputs.left == true && !buildMode && !removeMode && !escMenu && Math.abs(playerPosOffset.x) < 10){
        updatePlayerPos(tiles,-1,0);
    }
    if(inputs.right == true && prevInputs.right == false && (buildMode || removeMode)){
        selectedTile = Math.min(interactTiles.length - 1,selectedTile + 1);
    }
    if(inputs.left == true && prevInputs.left == false && (buildMode || removeMode)){
        selectedTile = Math.max(0,selectedTile - 1);
    }

    if(inputs.inter == true && prevInputs.inter == false && !buildMode && !removeMode && !escMenu){
        interactTimerSpeed = 1;
        interactTimer = 0;
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
    if(inputs.inter == true && prevInputs.inter == true && !buildMode && !removeMode && !escMenu && interactTimer >= 1){
        interactTimer = 0;
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
    } else if(inputs.inter == true && prevInputs.inter == true && !buildMode && !removeMode && !escMenu){
        interactTimer += (frameSpeedFactor/100) * interactTimerSpeed;
    }

    //If B is pressed and not in any modes and player has buildings
    if(inputs.build == true && prevInputs.build == false && !buildMode && !removeMode && !settingRecipe && !escMenu && !selectingSell && playerBuildings.length > 0){
        selectedBuilding = 0;
        buildMode = true;
        interactTiles = getSurroundingTiles(tiles,tiles.find(t => t.hasPlayer)).filter(t => t.isVisible && t.building.type == "NONE");
        interactTiles.forEach(t => t.highlighted = true);
    } else if(inputs.build == true && prevInputs.build == false && buildMode){
        selectedTile = 0;
        buildMode = false;
        interactTiles = [];
    }

    //If R is pressed and not in any modes and player has buildings
    if(inputs.remove == true && prevInputs.remove == false && !buildMode && !removeMode && !settingRecipe && !selectingSell && !escMenu){
        removeMode = true;
        interactTiles = getSurroundingTiles(tiles,tiles.find(t => t.hasPlayer)).filter(t => t.isVisible && t.building.type != "NONE");
        interactTiles.forEach(t => t.highlighted = true);
    } else if(inputs.remove == true && prevInputs.remove == false && removeMode){
        selectedTile = 0;
        removeMode = false;
        interactTiles = [];
    }

    //If E is pressed and in build mode and empty spaces
    if(buildMode && inputs.inter == true && prevInputs.inter == false && interactTiles.some(t => t.building.type == "NONE")){
        placeBuilding(interactTiles[selectedTile],playerBuildings[selectedBuilding]);
        playerBuildings = playerBuildings.filter(b => b.value > 0);
        interactTiles[selectedTile].highlighted = false;
        interactTiles = interactTiles.filter(t => t != interactTiles[selectedTile]);
        selectedTile = Math.min(interactTiles.length - 1, selectedTile);
        selectedBuilding = Math.min(playerBuildings.length-1,selectedBuilding);
    }
    //If E is pressed and in remove mode and buildings
    if(removeMode && inputs.inter == true && prevInputs.inter == false && interactTiles.some(t => t.building.type != "NONE")){
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
                if(selectedRecipe.product != "EXIT") {
                    if(playerTile.building.energy >= selectedRecipe.energy){
                        var recipeItems = selectedRecipe.items;
                        if(recipeItems.filter(i => playerResources.some(ii => ii.type == i.type && ii.value >= i.value)).length == recipeItems.length){
                            playerTile.building.recipe = selectedRecipe;
                            playerResources.forEach(i => {
                                var recipeItem = recipeItems.find(ii => ii.type == i.type);
                                if(recipeItem != null){
                                    i.value -= recipeItem.value;
                                    messages.push({text:"Used " + recipeItem.value + " units of " + i.type,time:0});
                                }
                            });
                            playerTile.building.craftTimer = 0;
                            playerTile.building.crafting = true;
                            zzfx(...[soundFxVolume,,542,,.01,.01,1,1.1,61.9,-94.8,-1e3,.02,.1,.1,3,,.01,,.08]).start();
                        } else {
                            recipeItems.forEach(i => {
                                var missingItem = playerResources.find(ii => ii.type == i.type && ii.value < i.value);
                                if(missingItem != null){
                                    messages.push({text:(i.value - missingItem.value) + " more " + i.type + " needed",time:0});
                                } else if(!playerResources.some(ii => ii.type == i.type)){
                                    messages.push({text:i.value + " more " + i.type + " needed",time:0});
                                }
                            });
                            zzfx(...[soundFxVolume,0,604,,,.13,4,2.01,-0.1,.2,50,,.01,,,.4,.05,.68,.05]).start();
                        }
                    } else {
                        messages.push({text:"Not enough energy",time:0});
                    }
                }
                settingRecipe = false;
            } else if(playerTile.building.storedProduct){
                addToPlayerBuildings(playerTile.building.recipe.product,1);
                messages.push({text:"Gained " + playerTile.building.recipe.product,time:0});
                playerTile.building.storedProduct = false;
                playerTile.building.recipe = null;
                zzfx(...[soundFxVolume,,521,,.01,.01,1,1.1,61.9,-94.8,-2250,.02,.1,.1,3,,.01,,.08]).start();
            } else if(playerTile.building.recipe == null){
                settingRecipe = true;
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
        case "TELEDEPOT":
            if(selectingSell){
                var price = prices.filter(p => playerResources.some(r => p.type == r.type && r.value >= p.ammount) || p.type == "EXIT")[selectedSell];
                if(price.type != "EXIT"){
                    var playerResource = playerResources.find(r => r.type == price.type);
                    if(playerResource.value >= price.ammount){
                        playerResource.value -= price.ammount;
                        playerBalance += price.ammount * price.price;
                    } else {
                        messages.push({text:"Cannot sell " + price.ammount + " of " + price.type,time:0});
                    }
                } else {
                    selectedSell = 0;
                    selectingSell = false;
                }
            } else {
                selectedSell = 0;
                selectingSell = true;
            }
            break;
    }
}

function handleHUD(){

    var modeHeight = canvas.height * 0.12;
    var selectionHeight = 40;

    if(hudFlash){
        if(hudFlashTimer >= 1){
            zzfx(...[soundFxVolume,0,500,.2,,0,1,.5,,,50,.12,,,,,,,.01]).start();
            hudSwap = !hudSwap;
            hudFlashTimer = 0;
        }
    } else {
        hudSwap = false;
    }

    if(hudSwap){
        ctx.strokeStyle = "#FF0000";
    } else {
        ctx.strokeStyle = hudColourScheme.outline;
    }
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
    while(messages.length >= 5){
        messages.shift();
    }
    messages = messages.filter(m => m.time < 4000);
    var topHeight = messages.length * 25;
    messages.forEach(message => {
        ctx.fillText(message.text,canvas.width * 0.01,canvas.height * 0.42 + (6 * 25) - topHeight + (messages.indexOf(message) * 25));
        message.time += frameSpeedFactor;
    });
    ctx.font = "25px Arial";
    ctx.fillText("Inventory",canvas.width * 0.88,30);
    ctx.font = "15px Arial";
    var rightInfoHeight = 55;
    var rightInfoStep = 25;
    ctx.fillStyle = hudColourScheme.text;
    ctx.fillText("Available resources:",canvas.width * 0.85,rightInfoHeight);
    playerResources.forEach(r => {
        if(selectingSell){
            if(prices.filter(p => prices.filter(p => playerResources.some(r => p.type == r.type && r.value >= p.ammount) || p.type == "EXIT")[selectedSell].type == r.type)){
                ctx.fillStyle = hudColourScheme.dynamicText;
            } else {
                ctx.fillStyle = hudColourScheme.staticText;
            }
        } else {
            ctx.fillStyle = hudColourScheme.text;
        }
        
        ctx.fillText(r.value + "/" + maxStorage + " units of " + r.type,canvas.width * 0.85, 25 + rightInfoHeight + (playerResources.indexOf(r) * rightInfoStep));
    });
    ctx.fillStyle = hudColourScheme.text;
    var sectionStep = playerResources.length * rightInfoStep;
    ctx.fillText("Available buildings:",canvas.width * 0.85,rightInfoHeight + 50 + sectionStep);
    playerBuildings.forEach(b => {
        if(buildMode){
            if(selectedBuilding == playerBuildings.indexOf(b)){
                ctx.fillStyle = hudColourScheme.dynamicText;
            } else {
                ctx.fillStyle = hudColourScheme.staticText;
            }
        } else {
            ctx.fillStyle = hudColourScheme.text;
        }
        
        ctx.fillText(b.value + " units of " + b.type,canvas.width * 0.85, rightInfoHeight + 75 + sectionStep + (playerBuildings.indexOf(b) * rightInfoStep));
    });

    
    ctx.textAlign = "center"; 
    ctx.textBaseline = "middle";
    ctx.fillStyle = hudColourScheme.text;
    ctx.fillText("Sol: " + sols + " Planet Rotation: " + time.toFixed(0) + "°" + " GPS X:" + playerPos.x + " Y:" + playerPos.y,canvas.width/2,15);


    if(buildMode){
        ctx.strokeStyle = hudColourScheme.outline;
        ctx.fillStyle = hudColourScheme.infill;
        generateUIOverlay(ctx,0.05,0.14,0.4);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "30px Tahoma";
        ctx.fillText("Build Mode",canvas.width/2,modeHeight);
    }

    if(removeMode){
        ctx.strokeStyle = hudColourScheme.outline;
        ctx.fillStyle = hudColourScheme.infill;
        generateUIOverlay(ctx,0.05,0.14,0.39);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "30px Tahoma";
        ctx.fillText("Remove Mode",canvas.width/2,modeHeight);
    }

    if(settingRecipe){
        ctx.strokeStyle = hudColourScheme.outline;
        ctx.fillStyle = hudColourScheme.infill;
        generateUIOverlay(ctx,0.05,0.5,0.3);
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.5,canvas.height * 0.07);
        ctx.lineTo(canvas.width * 0.5,canvas.height * 0.53);
        ctx.stroke();

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "30px Tahoma";
        ctx.fillText("Set Recipe:",canvas.width*0.4,modeHeight + (canvas.width*0.01));
        ctx.font = "20px Tahoma";
        var number = 5;
        var visableOptions = recipes.filter(p => Math.abs(recipes.indexOf(p) - selectedBuilding) < number + (Math.max(0,number - 1 - selectedBuilding)));
        visableOptions.forEach(r => {
            var index = recipes.indexOf(r);
            if(selectedBuilding == index){
                ctx.fillStyle = hudColourScheme.dynamicText;
            } else {
                ctx.fillStyle = hudColourScheme.staticText;
            }
            if(r.product == "EXIT"){
                ctx.fillText(r.product,canvas.width*0.4,modeHeight + (canvas.width*0.01) + selectionHeight + (25 * visableOptions.indexOf(r)));
            } else {
                
                if(selectedBuilding == index){
                    ctx.font = "25px Tahoma";
                    r.items.forEach(i => ctx.fillText(i.value + " " + i.type, canvas.width*0.59, modeHeight + (canvas.width*0.01) + selectionHeight + (25 * r.items.indexOf(i))));
                    ctx.fillText(r.energy + " ENERGY", canvas.width*0.59, modeHeight + (canvas.width*0.01) + selectionHeight + (25 * r.items.length))
                }
                ctx.font = "20px Tahoma";
                ctx.fillText(r.product,canvas.width*0.4,modeHeight + (canvas.width*0.01) + selectionHeight + (25 * visableOptions.indexOf(r)));
            }
        });
    }


    if(selectingSell){
        ctx.strokeStyle = hudColourScheme.outline;
        ctx.fillStyle = hudColourScheme.infill;
        generateUIOverlay(ctx,0.05,0.5,0.4);
        ctx.font = "30px Tahoma";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("Sell Mode",canvas.width/2,modeHeight);
        ctx.font = "20px Tahoma";
        var number = 5;
        var options = prices.filter(p => playerResources.some(r => p.type == r.type && r.value >= p.ammount) || p.type == "EXIT");
        var visableOptions = options.filter(p => Math.abs(options.indexOf(p) - selectedSell) < number + (Math.max(0,number - 1 - selectedSell)));
        visableOptions.forEach(p => {
            var index = options.indexOf(p);
            if(selectedSell == index){
                ctx.fillStyle = hudColourScheme.dynamicText;
            } else {
                ctx.fillStyle = hudColourScheme.staticText;
            }
            if(p.type != "EXIT"){
                ctx.fillText(p.ammount + " " + p.type + " : ₿" + p.price * p.ammount,canvas.width/2,modeHeight + selectionHeight + (25 * visableOptions.indexOf(p)));
            } else {
                ctx.fillText(p.type ,canvas.width/2,modeHeight + selectionHeight + (25 * visableOptions.indexOf(p)));
            }
        });
    }
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "30px Tahoma";
    ctx.fillText("JMC",canvas.width * 0.05,canvas.height * 0.16);
    drawLogo(ctx,canvas.width * 0.05,canvas.height * 0.072,50);
    ctx.font = "15px Tahoma";
    ctx.fillText("₿" + playerBalanceDisplayed.toFixed(0) ,canvas.width * 0.05,canvas.height * 0.2);
    playerBalanceDisplayed = lerp(playerBalance,playerBalanceDisplayed,(frameSpeedFactor/100));
    drawBattery(ctx,canvas.width * 0.02,canvas.height * 0.40,100,playerEnergy/playerMaxEnergy);
    var batteryStatusHeight = 0.24;
    ctx.fillText("Battery",canvas.width * 0.07,canvas.height * (batteryStatusHeight + 0.05));
    ctx.fillText("Status:",canvas.width * 0.07,canvas.height * (batteryStatusHeight + 0.07));
    var percentEnergy = playerEnergy/playerMaxEnergy;
    ctx.font = "12px Tahoma";
    if(percentEnergy > 0.6){
        ctx.fillText("Nominal",canvas.width * 0.07,canvas.height * (batteryStatusHeight + 0.09));
        hudFlash = false;
    } else if(percentEnergy > 0.4) {
        ctx.fillText("Satisfactory",canvas.width * 0.07,canvas.height * (batteryStatusHeight + 0.09));
        hudFlash = false;
    } else if(percentEnergy > 0.3) {
        ctx.fillText("Low",canvas.width * 0.07,canvas.height * (batteryStatusHeight + 0.09));
        hudFlash = false;
        hudFlashTimer = 0;
    } else if(percentEnergy > 0.15) {
        ctx.fillText("Very Low",canvas.width * 0.07,canvas.height * (batteryStatusHeight + 0.09));
        hudFlash = true;
        hudFlashTimer += (frameSpeedFactor/400);
    } else if(percentEnergy > 0.05) {
        ctx.fillText("Critical",canvas.width * 0.07,canvas.height * (batteryStatusHeight + 0.09));
        hudFlash = true;
        hudFlashTimer += (frameSpeedFactor/150);
    } else if(percentEnergy < 0.05) {
        ctx.fillText("Deadly",canvas.width * 0.07,canvas.height * (batteryStatusHeight + 0.09));
        hudFlash = true;
        hudFlashTimer += (frameSpeedFactor/50);
    };
}

function handleTileUpdates(t){
    var infoX = canvas.width * 0.6;
    var infoY = canvas.height * 0.45;
    var infoStep = 20;
    switch(t.building.type){
        case "SOLAR":
            if(t.hasPlayer && playerEnergy < playerMaxEnergy){
                playerEnergy = Math.min(playerMaxEnergy,playerEnergy + (solarOutput * Math.max(0.1,Math.sin(time * Math.PI/180))));
                ctx.fillText("Charging Player",infoX,infoY);
            } else {
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
                ctx.fillText("Energy Output: " + totalEnergy.toFixed(2),infoX,infoY);
            }
            }
            break;
        case "CONSTRUCTOR":
            if(t.building.recipe != null){
                if(t.building.crafting){
                    t.building.craftTimer += (frameSpeedFactor/10000) * craftSpeed;
                    if(t.building.craftTimer >= 1){
                        if(constructorTransmit){
                            addToPlayerBuildings(t.building.recipe.product,t.building.recipe.storedProduct);
                            t.building.storedProduct = false;
                        } else {
                            t.building.storedProduct = true;
                        }
                        t.building.crafting = false;
                        t.building.craftTimer = 0;
                    }
                }
            }
            if(!t.hasPlayer){
                settingRecipe = false;
            }
            if(t.hasPlayer && !escMenu){
                ctx.fillText("Recipe: " + (t.building.recipe != undefined ? t.building.recipe.product : "None") ,infoX,infoY);
                ctx.fillText("Energy: " + Math.trunc(t.building.energy),infoX,infoY + infoStep);
                if(t.building.crafting){
                    ctx.fillText("Progress: " + Math.trunc(t.building.craftTimer * 100) + "%",infoX,infoY + infoStep*2);
                } else if (t.building.storedProduct){
                    ctx.fillText("Finished Construction",infoX,infoY + infoStep*2);
                }
            }
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
                ctx.fillText("Energy: " + Math.trunc(t.building.energy),infoX,infoY);
                ctx.fillText("Progress: " + Math.trunc(t.building.mineTimer * 100) + "%",infoX,infoY + infoStep);
                if(minerTransmit){
                    ctx.fillText("Transmiting resources",infoX,infoY + infoStep*2);
                } else {
                    ctx.fillText("Contains: ",infoX,infoY + infoStep*2);
                    t.building.storedItems.forEach(i =>ctx.fillText(i.value + " units of " + i.type,infoX,infoY + infoStep*3));
                }
            }
            break;
        case "RADAR":
            if(t.hasPlayer && !escMenu){
                ctx.fillText("Total Coverage: " + (100 * tiles.filter(tt => tt.isVisible).length / tiles.length).toFixed(2) + "%",infoX,infoY);
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
                ctx.fillText("Energy: " + Math.trunc(t.building.energy),infoX,infoY);
                ctx.fillText("Progress: " + Math.trunc(t.building.dischargeTimer * 100) + "%",infoX,infoY + infoStep);
            }
            break;
        case "RTG":
            if(t.hasPlayer && playerEnergy < playerMaxEnergy){
                playerEnergy = Math.min(playerMaxEnergy,playerEnergy + RTGOutput * (frameSpeedFactor/1000));
                ctx.fillText("Charging Player",infoX,infoY);
            } else {
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
                        ctx.fillText("Energy Output Per Tile: " + induvidualEnergy.toFixed(2),infoX,infoY);
                    } else {
                        ctx.fillText("No tiles need power",infoX,infoY);
                    }
                }
            }
            break;
        case "TELEDEPOT":
            if(!t.hasPlayer){
                selectingSell = false;
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
        case 73:
            inputs.info = true;
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
        case 73:
            inputs.info = false;
            break;
    }
});

setInterval(gameloop,50);
document.onmousemove = (e) => mousePosition = {x:e.clientX - canvas.getBoundingClientRect().left,y:e.clientY - canvas.getBoundingClientRect().top};