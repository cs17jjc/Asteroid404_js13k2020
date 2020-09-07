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
var generatorImg = document.getElementById("generator");

var menuItems = ["Resume","Main Menu","Save Game","Load Game","Mute Music","Mute Sound FX","Controls"];
var selectedMenuItem = 0;

var mainMenuItems = ["New Game","Load Game","Mute Music","Mute Sound FX"];
var mainMenu = true;

var soundFxVolume = 0;
var confirmSound = () => zzfx(...[soundFxVolume,.01,593,,.03,0,1,2.04,.1,.1,50,.01,,-0.1,,,.06,.96,.08]).start();
var denySound = () => zzfx(...[soundFxVolume,0,604,,,.13,4,2.01,-0.1,.2,50,,.01,,,.4,.05,.68,.05]).start();

var recipes = [{product:"EXIT",items:[],energy:0},{product:"RADAR",items:[{type:"IRON",value:25}],energy:5}];
var prices = [{type:"EXIT",price:0,ammount:0},
              {type:"ROCK",price:1,ammount:1},{type:"ROCK",price:1,ammount:10},{type:"ROCK",price:1,ammount:50},
              {type:"IRON",price:10,ammount:1},{type:"IRON",price:10,ammount:10},{type:"IRON",price:10,ammount:50},
              {type:"COPPER",price:25,ammount:1},{type:"COPPER",price:25,ammount:10},{type:"COPPER",price:25,ammount:50},
              {type:"CARBON",price:50,ammount:1},{type:"CARBON",price:50,ammount:10},{type:"CARBON",price:50,ammount:50},
              {type:"LITHIUM",price:100,ammount:1},{type:"LITHIUM",price:100,ammount:10},{type:"LITHIUM",price:100,ammount:50},
              {type:"SILICON",price:250,ammount:1},{type:"SILICON",price:250,ammount:10},{type:"SILICON",price:250,ammount:50},
              {type:"PLUTONIUM",price:1000,ammount:1},{type:"PLUTONIUM",price:1000,ammount:10},{type:"PLUTONIUM",price:1000,ammount:50}];
var shopItemsStart = [{type:"EXIT",item:"EXIT",cost:0,costMulti:0,desc:[]},
                 {type:"CRAFT UPGRADES",item:"RESOURCE STORAGE",cost:200,costMulti:1.5,desc:["Increases JMC™ Craft resource","capacity by 10%"]},
                 {type:"CRAFT UPGRADES",item:"BATTERY EFFICENCY",cost:500,costMulti:1.2,desc:["Increases JMC™ Craft battery capacity","by 25%"]},
                 {type:"CRAFT UPGRADES",item:"CPU EFFICENCY",cost:250,costMulti:2,desc:["Reduces JMC™ Craft battery usage","by 20%"]},
                 {type:"CRAFT UPGRADES",item:"CRAFT SPEED",cost:800,costMulti:1.6,desc:["Increases JMC™ Craft speed","by 10%"]},
                 {type:"CRAFT UPGRADES",item:"CRAFT HEIGHT TOLERANCE",cost:1000,costMulti:1.5,desc:["Allows JMC™ Craft to","move between tiles"," with a larger height"," difference."]},

                 {type:"BUILDING UPGRADES",item:"RADAR RADIUS",cost:1000,costMulti:1.5,desc:["Increases JMC™ Radar uncover distance","by 3 tiles."]},
                 {type:"BUILDING UPGRADES",item:"CONSTRUCTOR SPEED",cost:300,costMulti:2,desc:["Increases JMC™ Constructor speed","by 50%"]},
                 {type:"BUILDING UPGRADES",item:"CONSTRUCTOR TRANSMITTER",cost:5000,desc:["JMC™ Constructor transmits","finished constructions to","JMC™ Craft."]},
                 {type:"BUILDING UPGRADES",item:"MINER SPEED",cost:1000,desc:["Increases JMC™ Miner speed","by 50%"]},
                 {type:"BUILDING UPGRADES",item:"MINER TRANSMITTER",cost:5000,desc:["JMC™ Miner transmits","mined resources to","JMC™ Craft."]},
                 {type:"BUILDING UPGRADES",item:"RTG OUTPUT",cost:250,costMulti:2,desc:["Increases JMC™ RTG output","by 1."]},
                 {type:"BUILDING UPGRADES",item:"SOLAR OUTPUT",cost:750,costMulti:2,desc:["Increases JMC™ Solar Panel output","by 1."]},
                 {type:"BUILDING UPGRADES",item:"GENERATOR OUTPUT",cost:500,costMulti:2,desc:["Increases JMC™ Generator output","by 1."]},

                 {type:"RECIPES",item:"CONSTRUCTOR",cost:500,desc:["Adds JMC™ Constructor to","Constructor Database.","Constructors manufacture other","JMC™ Buildings."]},
                 {type:"RECIPES",item:"MINER",cost:2500,desc:["Adds JMC™ Miner to Constructor","Database.","JMC™ Miners use energy to","gather resources 5 times"," more efficent than","the JMC™ Craft"]},
                 {type:"RECIPES",item:"GENERATOR",cost:2500,desc:["Adds JMC™ Generator to Constructor","Database.","JMC™ Generators create energy from","carbon."]},
                 {type:"RECIPES",item:"SOLAR",cost:4300,desc:["Adds JMC™ Solar Panel to ","Constructor Database.","JMC™ Solar Panels generate","fluctuating energy."]},
                 {type:"RECIPES",item:"BATTERY",cost:5000,desc:["Adds JMC™ Battery to ","Constructor Database.","JMC™ Batteries store","energy and release it","periodically."]},
                 {type:"RECIPES",item:"RTG",cost:10000,desc:["Adds JMC™ RTG to ","Constructor Database.","JMC™ RTGs generate","constant energy."]}];

var shopItems = shopItemsStart.slice();

var playerPos = {x:0,y:0};
var playerEnergy = 50;
var prevPlayerEnergy = 50;
var playerDeadState = false;

var playerBalance = 0;
var playerBalanceDisplayed = 0;

var quotas = [1000,2500,7500,15000,50000,100000,200000];
var currentQuota = 0;
var failedQuota = false;

canvas.width = 1280;
canvas.height = 720;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";

var prevInputs = {up:false,down:false,left:false,right:false,inter:false,build:false,remove:false,info:false,esc:false};
var inputs = {up:false,down:false,left:false,right:false,inter:false,build:false,remove:false,info:false,esc:false};

var playerPosOffset = {x:0,y:0};

var tiles = [];
var messages = [];
var interactTiles = [];
var selectedTile = 0;
var selectedSell = 0;
var selectedSellDisplayPrice = 0;
var selectedBuy = 0;

var playerResources = [];
var playerBuildings = [];
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
var maxStepHeight = 1;
var mineFactor = 1;
var maxStorage = 50;

//Building Upgrades:
var solarOutput = 1;
var craftSpeed = 1;
var minerFactor = 5;
var mineSpeed = 1;
var minerTransmit = false;
var constructorTransmit = false;
var batteryDischarge = 1.5;
var RTGOutput = 5;
var generatorOutput = 2;
var radarRange = 8;

var time = 0;
var sols = 0;

var hudFlashTimer = 0;
var hudFlash = false;
var hudSwap = false;

var interactTimer = 0;
var interactTimerSpeed = 1;

var batteryStatusMessage = "Nominal";

//var hudColourScheme = {outline:"#00FF00",infill:"#000000AA",text:"#00FF00",staticText:"#00AA00",dynamicText:"#00FF00"};
var hudColourScheme = {outline:"#FFFFFF",infill:"#000000AA",text:"#FFFFFF",staticText:"#AAAAAA",dynamicText:"#FFFFFF"};

let mySongData = zzfxM(...song);
let myAudioNode = zzfxP(...mySongData);
myAudioNode.loop = true;
myAudioNode.start();

var stars = Array.from(Array(500).keys()).map(i => {return {x:(Math.random() * 2 * canvas.width) - canvas.width,y:(Math.random() * 2 * canvas.height) - canvas.height,r:Math.random() * 3}});

noise.seed(Math.random());

var mapWidth = 500;
var otherColourScheme = [{levels:[0,1,2],colour:new Colour(62, 47, 91,255)},{levels:[3,4],colour:new Colour(190, 184, 235,255)},{levels:[5,6,7],colour:new Colour(64, 121, 140,255)},{levels:[8,9],colour:new Colour(115, 251, 211,255)}];
var spawnX = 240;

var runGameBool = false;
var runIntro = false;
var introCounter = 0;
var textScroll = false;
var sentanceCounter = 0;

var millisOnLastFrame = new Date().getTime();
var frameSpeedFactor = 0;
function gameloop(){
    frameSpeedFactor =  escMenu ? 0 : new Date().getTime() - millisOnLastFrame;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);
    if(mainMenu){
        handleMainMenu();
    }
    if(runIntro){
        intro();
    }
    if(runGameBool){
        runGame();
    }
    prevInputs = Object.assign({},inputs);
}

function intro(){
    var charCounter = 0;


    if(textScroll){
        introCounter += (frameSpeedFactor/500);
    }
}

function handleMainMenu(){
    ctx.fillStyle = "#FFFFF0";
    ctx.save();
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.rotate(Math.PI * Math.sin(frameSpeedFactor/200000));
    stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x,s.y,s.r,0, 2 * Math.PI);
        ctx.fill();
    });
    ctx.restore();
    
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center"; 
    ctx.textBaseline = "middle";
    ctx.font = "65px Tahoma";
    ctx.fillText("Planet 404",canvas.width/2,canvas.height*0.1);

    if(inputs.up == true && prevInputs.up == false){
        selectedMenuItem = Math.max(0,selectedMenuItem - 1);
        zzfx().start();
    }
    if(inputs.down == true && prevInputs.down == false){
        selectedMenuItem = Math.min(mainMenuItems.length - 1,selectedMenuItem + 1);
        zzfx().start();
    }
    if(inputs.inter == true && prevInputs.inter == false){
        switch(mainMenuItems[selectedMenuItem]){
            case "New Game":
                initGame();
                soundFxVolume = 0.5;
                runGameBool = true;
                mainMenu = false;
                selectedMenuItem = 0;
                millisOnLastFrame = new Date().getTime();
                break;
            case "Load Game":
                loadGame();
                soundFxVolume = 0.5;
                runGameBool = true;
                mainMenu = false;
                selectedMenuItem = 0;
                millisOnLastFrame = new Date().getTime();
                break;
            case "Mute Music":
                myAudioNode.disconnect();
                mainMenuItems[selectedMenuItem] = "Unmute Music";
                break;
            case "Mute Sound FX":
                soundFxVolume = 0;
                mainMenuItems[selectedMenuItem] = "Unmute Sound FX";
                break;
            case "Unmute Music":
                myAudioNode.connect(zzfxX.destination);
                mainMenuItems[selectedMenuItem] = "Mute Music";
                break;
            case "Unmute Sound FX":
                soundFxVolume = 1;
                mainMenuItems[selectedMenuItem] = "Mute Sound FX";
                break;
        }
        confirmSound();
    }

    ctx.font = "40px Tahoma";
    mainMenuItems.forEach(i => {
        var index = mainMenuItems.indexOf(i);
        if(selectedMenuItem == index){
            var textLength = ctx.measureText(i).width;
            ctx.drawImage(roverImg, Math.trunc((canvas.width * 0.45) - (textLength * 0.5) - (roverImg.width * 0.5)), Math.trunc(canvas.height * 0.3 + (80 * index) - (roverImg.height * 0.5)));
            ctx.drawImage(roverImg, Math.trunc((canvas.width * 0.55) + (textLength * 0.5) - (roverImg.width * 0.5)), Math.trunc(canvas.height * 0.3 + (80 * index) - (roverImg.height * 0.5)));
            ctx.fillStyle = hudColourScheme.dynamicText;
        } else {
            ctx.fillStyle = hudColourScheme.staticText;
        }
        ctx.fillText(i,canvas.width*0.5,canvas.height * 0.3 + (80 * index));
    });

}

function initGame(){
    //Generate Terrain
    var biomeSeq = Array.from(Array(mapWidth).keys()).map(i => {
        var dist = Math.abs(spawnX - i) / (mapWidth * 0.5);
        var biome = Math.min(4,Math.abs(Math.trunc(5 * (Math.cos((Math.PI * 2) * (dist))))));
        return biome;
    });
    tiles = generateMap(mapWidth,biomeSeq,otherColourScheme,spawnX);
    //Place start buildings
    placeBuilding(tiles.find(t => t.x == spawnX && t.y == 2),{type:"RADAR",value:1});
    placeBuilding(tiles.find(t => t.x == spawnX && t.y == 0),{type:"RTG",value:1});
    placeBuilding(tiles.find(t => t.x == spawnX - 1 && t.y == 0),{type:"CONSTRUCTOR",value:1});
    placeBuilding(tiles.find(t => t.x == spawnX + 3 && t.y == 2),{type:"TELEDEPOT",value:1});
    placeBuilding(tiles.find(t => t.x == spawnX - 3 && t.y == 1),{type:"ROBOSHOP",value:1});
    updatePlayerPos(tiles,0,0);
    //Reset variables
    currentQuota = 0;
    playerBuildings = [];
    playerResources = [];
    playerBalance = 0;
    recipes = [{product:"EXIT",items:[],energy:0},{product:"RADAR",items:[{type:"IRON",value:25}],energy:5}];
    shopItems = shopItemsStart.slice();

    playerMaxEnergy = 50;
    playerEnergy = playerMaxEnergy;
    playerDrainRate = 1;
    playerSpeed = 1;
    maxStepHeight = 1;
    mineFactor = 1;
    maxStorage = 50;

    solarOutput = 1;
    craftSpeed = 1;
    minerFactor = 5;
    mineSpeed = 3;
    minerTransmit = false;
    constructorTransmit = false;
    batteryDischarge = 1.5;
    RTGOutput = 5;
    constructorMaxEnergy = 10;
    radarRange = 8;

    time = 0;
    sols = 0;

    failedQuota = false;
}

function runGame(){
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


    if(escMenu && !playerDeadState && !failedQuota){
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center"; 
        ctx.textBaseline = "middle";
        ctx.font = "45px Tahoma";
        ctx.fillText("Paused",canvas.width/2,30);
        ctx.font = "35px Tahoma";
        menuItems.forEach(i => {
            var index = menuItems.indexOf(i);
            if(selectedMenuItem == index){
                var textLength = ctx.measureText(i).width;
                ctx.drawImage(roverImg, Math.trunc((canvas.width * 0.45) - (textLength * 0.5) - (roverImg.width * 0.5)), Math.trunc(canvas.height * 0.15 + (50 * index) - (roverImg.height * 0.5)));
                ctx.drawImage(roverImg, Math.trunc((canvas.width * 0.55) + (textLength * 0.5) - (roverImg.width * 0.5)), Math.trunc(canvas.height * 0.15 + (50 * index) - (roverImg.height * 0.5)));
                ctx.fillStyle = hudColourScheme.dynamicText;
            } else {
                ctx.fillStyle = hudColourScheme.staticText;
            }
            ctx.fillText(i,canvas.width*0.5,canvas.height * 0.15 + (50 * index));
        });
        handleMenuInput();
    } else if(!playerDeadState && !failedQuota) {
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
        selectedBuy = Math.min(shopItems.length - 1,selectedBuy);
    
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
        if(prevPlayerEnergy < playerEnergy){
            hudFlash = false;
            batteryStatusMessage = "Charging";
        } else if((selectingSell || buyingMode) || ["SOLAR","RTG","GENERATOR"].some(s => s == playerTile.building.type)){
            hudFlash = false;
            batteryStatusMessage = "Paused";
        } else {
            playerEnergy -= (playerDrainRate + playerTile.hazard) * (frameSpeedFactor/1000);
        }

        handleHUD();
        handleInput();  
    } else if(playerDeadState){
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

    } else if(failedQuota){
        //Failed state
        playerPosOffset.y = lerp(playerPosOffset.y,10,(frameSpeedFactor/1500));
        roverImgScale = lerp(roverImgScale,0,(frameSpeedFactor/1500));
        var textScale = Math.trunc(50 - (50 * roverImgScale));
        ctx.font = textScale + "px Arial";
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#000000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Quota Failed",canvas.width/2,canvas.height * 0.2);
        tiles.forEach(t => t.hazard += (frameSpeedFactor/800));
        if(roverImgScale < 0.4){
            (textScale*0.3).toFixed(0) + "px Arial";
            ctx.fillText("Press E to return to main menu",canvas.width/2,canvas.height * 0.3);
            if(inputs.inter == true && prevInputs.inter == false){
                mainMenu = true;
                escMenu = false;
                runGameBool = false;
                failedQuota = false;
                selectedMenuItem = 0;
                roverImgScale = 1;
            }
        }
    }

    if(playerEnergy <= 0){
        playerDeadState = true;
    }
    prevPlayerEnergy = playerEnergy;
    if(!playerDeadState){
        time += (frameSpeedFactor/1200);
    }
    if(time >= 360){
        sols += 1;
        if(playerBalance >= quotas[currentQuota]){
            playerBalance -= quotas[currentQuota];
            currentQuota += 1;
        } else {
            failedQuota = true;
        }
    }
    time = time >= 360 ? 0 : time;
    millisOnLastFrame = new Date().getTime();
}

function handleInput(){
    if(inputs.up == true && prevInputs.up == false && !buildMode && !removeMode && !settingRecipe && !escMenu && !selectingSell && !buyingMode && Math.abs(playerPosOffset.y) < 10){
        updatePlayerPos(tiles,0,-1);
    }
    if(inputs.down == true && prevInputs.down == false && !buildMode && !removeMode && !settingRecipe && !escMenu && !selectingSell && !buyingMode && Math.abs(playerPosOffset.y) < 10){
        updatePlayerPos(tiles,0,+1);
    }
    if(inputs.up == true && prevInputs.up == true && !buildMode && !removeMode && !settingRecipe && !escMenu && !selectingSell && !buyingMode && Math.abs(playerPosOffset.y) < 10){
        updatePlayerPos(tiles,0,-1);
    }
    if(inputs.down == true && prevInputs.down == true && !buildMode && !removeMode && !settingRecipe && !escMenu && !selectingSell && !buyingMode && Math.abs(playerPosOffset.y) < 10){
        updatePlayerPos(tiles,0,+1);
    }
    if(inputs.up == true && prevInputs.up == false && buildMode){
        selectedBuilding = Math.max(0,selectedBuilding - 1);
        zzfx().start();
    }
    if(inputs.down == true && prevInputs.down == false && buildMode){
        selectedBuilding = Math.max(0,Math.min(playerBuildings.length - 1,selectedBuilding + 1));
        zzfx().start();
    }
    if(inputs.up == true && prevInputs.up == false && settingRecipe){
        selectedBuilding = Math.max(0,selectedBuilding - 1);
        zzfx().start();
    }
    if(inputs.down == true && prevInputs.down == false && settingRecipe){
        selectedBuilding = Math.max(0,Math.min(recipes.length - 1,selectedBuilding + 1));
        zzfx().start();
    }
    if(inputs.up == true && prevInputs.up == false && selectingSell){
        interactTimer = 0;
        selectedSell = Math.max(0,selectedSell - 1);
        zzfx().start();
    }
    if(inputs.down == true && prevInputs.down == false && selectingSell){
        interactTimer = 0;
        selectedSell = Math.min(prices.filter(p => playerResources.some(r => p.type == r.type && r.value >= p.ammount) || p.type == "EXIT").length - 1,selectedSell + 1);
        zzfx().start();
    }
    if(inputs.up == true && prevInputs.up == false && buyingMode){
        interactTimer = 0;
        selectedBuy= Math.max(0,selectedBuy - 1);
        zzfx().start();
    }
    if(inputs.down == true && prevInputs.down == false && buyingMode){
        interactTimer = 0;
        selectedBuy = Math.min(shopItems.length - 1,selectedBuy + 1);
        zzfx().start();
    }

    if(inputs.up == true && prevInputs.up == true && selectingSell){
        if(interactTimer >= 1){
            selectedSell = Math.max(0,selectedSell - 1);
            interactTimer = 0;
            zzfx().start();
        } else {
            interactTimer += (frameSpeedFactor/100);
        }
    }
    if(inputs.down == true && prevInputs.down == true && selectingSell){
        if(interactTimer >= 1){
            selectedSell = Math.min(prices.filter(p => playerResources.some(r => p.type == r.type && r.value >= p.ammount) || p.type == "EXIT").length - 1,selectedSell + 1);
            interactTimer = 0;
            zzfx().start();
        } else {
            interactTimer += (frameSpeedFactor/100);
        }
    }
    if(inputs.up == true && prevInputs.up == true && buyingMode){
        if(interactTimer >= 1){
            selectedBuy= Math.max(0,selectedBuy - 1);
            interactTimer = 0;
            zzfx().start();
        } else {
            interactTimer += (frameSpeedFactor/100);
        }
    }
    if(inputs.down == true && prevInputs.down == true && buyingMode){
        if(interactTimer >= 1){
            selectedBuy = Math.min(shopItems.length - 1,selectedBuy + 1);
            interactTimer = 0;
            zzfx().start();
        } else {
            interactTimer += (frameSpeedFactor/100);
        }
    }


    if(inputs.right == true && prevInputs.right == false && !buildMode && !removeMode && !escMenu && !selectingSell && !buyingMode && Math.abs(playerPosOffset.x) < 10){
        updatePlayerPos(tiles,+1,0);
    }
    if(inputs.left == true && prevInputs.left == false && !buildMode && !removeMode && !escMenu && !selectingSell && !buyingMode && Math.abs(playerPosOffset.x) < 10){
        updatePlayerPos(tiles,-1,0);
    }
    if(inputs.right == true && prevInputs.right == true && !buildMode && !removeMode && !escMenu && !selectingSell && !buyingMode && Math.abs(playerPosOffset.x) < 10){
        updatePlayerPos(tiles,+1,0);
    }
    if(inputs.left == true && prevInputs.left == true && !buildMode && !removeMode && !escMenu && !selectingSell && !buyingMode && Math.abs(playerPosOffset.x) < 10){
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
                if(addToPlayerResources(playerTile.resource.type,totalMined,true) > 0){
                    mineTile(playerTile);
                    zzfx(...[soundFxVolume,,320,.01,,0,4,0,,,,,,,,.1,,0,.01]).start();
                } else {
                    messages.push({text:"Resource full",time:0});
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
                if(addToPlayerResources(playerTile.resource.type,totalMined,true) > 0){
                    mineTile(playerTile);
                    zzfx(...[soundFxVolume,,320,.01,,0,4,0,,,,,,,,.1,,0,.01]).start();
                } else {
                    messages.push({text:"Resource full",time:0});
                }
            }
        }
    } else if(inputs.inter == true && prevInputs.inter == true && !buildMode && !removeMode && !escMenu){
        interactTimer += (frameSpeedFactor/100) * interactTimerSpeed;
    }

    //If B is pressed and not in any modes and player has buildings
    if(inputs.build == true && prevInputs.build == false && !buildMode && !removeMode && !settingRecipe && !escMenu && !selectingSell && !buyingMode){
        if(playerBuildings.length > 0){
            selectedBuilding = 0;
            buildMode = true;
            interactTiles = getSurroundingTiles(tiles,tiles.find(t => t.hasPlayer)).filter(t => t.isVisible && t.building.type == "NONE");
            interactTiles.forEach(t => t.highlighted = true);
        } else {
            messages.push({text:"No Buildings",time:0});
        }
    } else if(inputs.build == true && prevInputs.build == false && buildMode){
        selectedTile = 0;
        buildMode = false;
        interactTiles = [];
    }

    //If R is pressed and not in any modes and player has buildings
    if(inputs.remove == true && prevInputs.remove == false && !buildMode && !removeMode && !settingRecipe && !selectingSell && !buyingMode && !escMenu){
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
    if(inputs.esc == true && prevInputs.esc == false && (buildMode || removeMode || selectingSell || buyingMode || settingRecipe)){
        buildMode = false;
        removeMode = false;
        selectingSell = false;
        buyingMode = false;
        settingRecipe = false;

        interactTiles = [];
        selectedTile = 0;
        selectedBuilding = 0;
        selectingSell = 0;
    } else if (inputs.esc == true && prevInputs.esc == false){
        escMenu = true;
    }
}

function handleMenuInput(){
    if(inputs.up == false && prevInputs.up == true){
        selectedMenuItem = Math.max(0,selectedMenuItem - 1);
        zzfx().start();
    }
    if(inputs.down == false && prevInputs.down == true){
        selectedMenuItem = Math.min(menuItems.length - 1, selectedMenuItem + 1);
        zzfx().start();
    }
    if (inputs.esc == true && prevInputs.esc == false){
        escMenu = false;
    }
    if(inputs.inter == false && prevInputs.inter == true){
        switch(menuItems[selectedMenuItem]){
            case "Resume":
                escMenu = false;
                break;
            case "Main Menu":
                mainMenu = true;
                escMenu = false;
                runGameBool = false;
                selectedMenuItem = 0;
                break;
            case "Save Game":
                var ls = window.localStorage;
                ls.setItem('Planet404_TYUDHSJ_TILES', JSON.stringify(tiles));
                ls.setItem('Planet404_TYUDHSJ_TIME', JSON.stringify(time));
                ls.setItem('Planet404_TYUDHSJ_SOLS', JSON.stringify(sols));

                ls.setItem('Planet404_TYUDHSJ_RESOURCES', JSON.stringify(playerResources));
                ls.setItem('Planet404_TYUDHSJ_BUILDINGS', JSON.stringify(playerBuildings));
                ls.setItem('Planet404_TYUDHSJ_BALANCE', JSON.stringify(playerBalance));
                ls.setItem('Planet404_TYUDHSJ_PLAYERENERGY', JSON.stringify(playerEnergy));
                ls.setItem('Planet404_TYUDHSJ_QUOTA', JSON.stringify(currentQuota));

                ls.setItem('Planet404_TYUDHSJ_RECIPES', JSON.stringify(recipes));
                ls.setItem('Planet404_TYUDHSJ_SHOP', JSON.stringify(shopItems));

                ls.setItem('Planet404_TYUDHSJ_playerMaxEnergy', JSON.stringify(playerMaxEnergy));
                ls.setItem('Planet404_TYUDHSJ_playerDrainRate', JSON.stringify(playerDrainRate));
                ls.setItem('Planet404_TYUDHSJ_playerSpeed', JSON.stringify(playerSpeed));
                ls.setItem('Planet404_TYUDHSJ_maxStepHeight', JSON.stringify(maxStepHeight));
                ls.setItem('Planet404_TYUDHSJ_mineFactor', JSON.stringify(mineFactor));
                ls.setItem('Planet404_TYUDHSJ_maxStorage', JSON.stringify(maxStorage));
                ls.setItem('Planet404_TYUDHSJ_radarRange', JSON.stringify(radarRange));

                ls.setItem('Planet404_TYUDHSJ_solarOutput', JSON.stringify(solarOutput));
                ls.setItem('Planet404_TYUDHSJ_craftSpeed', JSON.stringify(craftSpeed));
                ls.setItem('Planet404_TYUDHSJ_minerFactor', JSON.stringify(minerFactor));
                ls.setItem('Planet404_TYUDHSJ_mineSpeed', JSON.stringify(mineSpeed));
                ls.setItem('Planet404_TYUDHSJ_minerTransmit', JSON.stringify(minerTransmit));
                ls.setItem('Planet404_TYUDHSJ_constructorTransmit', JSON.stringify(constructorTransmit));
                ls.setItem('Planet404_TYUDHSJ_batteryDischarge', JSON.stringify(batteryDischarge));
                ls.setItem('Planet404_TYUDHSJ_RTGOutput', JSON.stringify(RTGOutput));
                ls.setItem('Planet404_TYUDHSJ_constructorMaxEnergy', JSON.stringify(constructorMaxEnergy));
                messages.push({text:"Game Saved",time:0});
                escMenu = false;
                break;
            case "Load Game":
                loadGame();
                escMenu = false;
                break;
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
        confirmSound();
    }
}

function loadGame(){
    buildMode = false;
    removeMode = false;
    selectingSell = false;
    buyingMode = false;
    settingRecipe = false;

    interactTiles = [];
    selectedTile = 0;
    selectedBuilding = 0;
    selectingSell = 0;

    var ls = window.localStorage;
    tiles = JSON.parse(ls.getItem('Planet404_TYUDHSJ_TILES'));
    time = JSON.parse(ls.getItem('Planet404_TYUDHSJ_TIME'));
    sols = JSON.parse(ls.getItem('Planet404_TYUDHSJ_SOLS'));

    playerResources = JSON.parse(ls.getItem('Planet404_TYUDHSJ_RESOURCES'));
    playerBuildings = JSON.parse(ls.getItem('Planet404_TYUDHSJ_BUILDINGS'));
    playerBalance = JSON.parse(ls.getItem('Planet404_TYUDHSJ_BALANCE'));
    playerEnergy = JSON.parse(ls.getItem('Planet404_TYUDHSJ_PLAYERENERGY'));
    currentQuota = JSON.parse(ls.getItem('Planet404_TYUDHSJ_QUOTA'));

    recipes = JSON.parse(ls.getItem('Planet404_TYUDHSJ_RECIPES'));
    shopItems = JSON.parse(ls.getItem('Planet404_TYUDHSJ_SHOP'));

    playerMaxEnergy = JSON.parse(ls.getItem('Planet404_TYUDHSJ_playerMaxEnergy'));
    playerDrainRate = JSON.parse(ls.getItem('Planet404_TYUDHSJ_playerDrainRate'));
    playerSpeed = JSON.parse(ls.getItem('Planet404_TYUDHSJ_playerSpeed'));
    maxStepHeight = JSON.parse(ls.getItem('Planet404_TYUDHSJ_maxStepHeight'));
    mineFactor = JSON.parse(ls.getItem('Planet404_TYUDHSJ_mineFactor'));
    maxStorage = JSON.parse(ls.getItem('Planet404_TYUDHSJ_maxStorage'));
    radarRange = JSON.parse(ls.getItem('Planet404_TYUDHSJ_radarRange'));

    solarOutput = JSON.parse(ls.getItem('Planet404_TYUDHSJ_solarOutput'));
    craftSpeed = JSON.parse(ls.getItem('Planet404_TYUDHSJ_craftSpeed'));
    minerFactor = JSON.parse(ls.getItem('Planet404_TYUDHSJ_minerFactor'));
    mineSpeed = JSON.parse(ls.getItem('Planet404_TYUDHSJ_mineSpeed'));
    minerTransmit = JSON.parse(ls.getItem('Planet404_TYUDHSJ_minerTransmit'));
    constructorTransmit = JSON.parse(ls.getItem('Planet404_TYUDHSJ_constructorTransmit'));
    batteryDischarge = JSON.parse(ls.getItem('Planet404_TYUDHSJ_batteryDischarge'));
    RTGOutput = JSON.parse(ls.getItem('Planet404_TYUDHSJ_RTGOutput'));
    constructorMaxEnergy = JSON.parse(ls.getItem('Planet404_TYUDHSJ_constructorMaxEnergy'));
    updatePlayerPos(tiles,0,0);
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
                            playerTile.building.energy -= selectedRecipe.energy;
                            confirmSound();
                        } else {
                            recipeItems.forEach(i => {
                                var missingItem = playerResources.find(ii => ii.type == i.type && ii.value < i.value);
                                if(missingItem != null){
                                    messages.push({text:(i.value - missingItem.value) + " more " + i.type + " needed",time:0});
                                } else if(!playerResources.some(ii => ii.type == i.type)){
                                    messages.push({text:i.value + " more " + i.type + " needed",time:0});
                                }
                            });
                            denySound();
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
                confirmSound();
                playerTile.building.craftTimer = 0;
            } else if(playerTile.building.recipe == null){
                settingRecipe = true;
                selectedBuilding = 0;
            }
            break;
        case "MINER":
            if(!minerTransmit){
                if(playerTile.building.storedResource == 0){
                    messages.push({text:"Resource full",time:0});
                } else {
                    var added = addToPlayerResources(playerTile.building.storedType,playerTile.building.storedResource,false);
                    if(added == 0){
                        denySound();
                        messages.push({text:"Resource full" + added + playerTile.building.storedType,time:0});
                    } else {
                        playerTile.building.storedResource -= addToPlayerResources(playerTile.building.storedType,playerTile.building.storedResource,false);
                        messages.push({text:"Gained " + added + playerTile.building.storedType,time:0});
                        confirmSound();
                    }
                }
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
                        zzfx(...[soundFxVolume,.01,287,.11,,0,3,.01,,,198,.09,,,,,.06,.5]).start();
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
        case "ROBOSHOP":
            if(buyingMode){
                if(shopItems[selectedBuy].type != "EXIT"){
                    if(playerBalance >= shopItems[selectedBuy].cost){
                        playerBalance -= shopItems[selectedBuy].cost;
                        switch(shopItems[selectedBuy].item){
                            case "RESOURCE STORAGE":
                                maxStorage = Math.round(maxStorage * 1.20);
                                shopItems[selectedBuy].cost = Math.round(shopItems[selectedBuy].cost * shopItems[selectedBuy].costMulti);
                                break;
                            case "BATTERY EFFICENCY":
                                playerMaxEnergy = Math.round(playerMaxEnergy * 1.25);
                                shopItems[selectedBuy].cost = Math.round(shopItems[selectedBuy].cost * shopItems[selectedBuy].costMulti);
                                break;
                            case "CPU EFFICENCY":
                                playerDrainRate = playerDrainRate * 0.8;
                                shopItems[selectedBuy].cost = Math.round(shopItems[selectedBuy].cost * shopItems[selectedBuy].costMulti);
                                break;
                            case "CRAFT SPEED":
                                playerSpeed = playerSpeed * 1.10;
                                shopItems[selectedBuy].cost = Math.round(shopItems[selectedBuy].cost * shopItems[selectedBuy].costMulti);
                                break;
                            case "CRAFT HEIGHT TOLERANCE":
                                maxStepHeight += 1;
                                shopItems[selectedBuy].cost = Math.round(shopItems[selectedBuy].cost * shopItems[selectedBuy].costMulti);
                                break;

                            case "CONSTRUCTOR SPEED":
                                craftSpeed = craftSpeed * 1.5;
                                shopItems[selectedBuy].cost = Math.round(shopItems[selectedBuy].cost * shopItems[selectedBuy].costMulti);
                                break;
                            case "CONSTRUCTOR TRANSMITTER":
                                constructorTransmit = true;
                                shopItems = shopItems.filter(i => i.item != "CONSTRUCTOR TRANSMITTER");
                                break;
                            case "MINER SPEED":
                                mineSpeed = mineSpeed * 1.5;
                                shopItems[selectedBuy].cost = Math.round(shopItems[selectedBuy].cost * shopItems[selectedBuy].costMulti);
                                break;
                            case "MINER TRANSMITTER":
                                minerTransmit = true;
                                shopItems = shopItems.filter(i => i.item != "MINER TRANSMITTER");
                                break;
                            case "RTG OUTPUT":
                                RTGOutput += 1;
                                shopItems[selectedBuy].cost = Math.round(shopItems[selectedBuy].cost * shopItems[selectedBuy].costMulti);
                                break;
                            case "SOALR OUTPUT":
                                solarOutput += 1;
                                shopItems[selectedBuy].cost = Math.round(shopItems[selectedBuy].cost * shopItems[selectedBuy].costMulti);
                                break;
                            case "GENERATOR OUTPUT":
                                generatorOutput += 1;
                                shopItems[selectedBuy].cost = Math.round(shopItems[selectedBuy].cost * shopItems[selectedBuy].costMulti);
                                break;
                            case "RADAR RADIUS":
                                radarRange += 3;
                                updateRadarVisableTiles(tiles);
                                shopItems[selectedBuy].cost = Math.round(shopItems[selectedBuy].cost * shopItems[selectedBuy].costMulti);
                                break;

                            case "CONSTRUCTOR":
                                recipes.push({product:"CONSTRUCTOR",items:[{type:"IRON",value:20},{type:"COPPER",value:20}],energy:2});
                                shopItems = shopItems.filter(i => i.item != "CONSTRUCTOR");
                                break;
                            case "MINER":
                                recipes.push({product:"MINER",items:[{type:"IRON",value:35},{type:"COPPER",value:10},{type:"CARBON",value:15}],energy:4});
                                shopItems = shopItems.filter(i => i.item != "MINER");
                                break;
                            case "GENERATOR":
                                recipes.push({product:"GENERATOR",items:[{type:"IRON",value:30},{type:"COPPER",value:30},{type:"ROCK",value:15}],energy:5});
                                shopItems = shopItems.filter(i => i.item != "GENERATOR");
                                break;
                            case "BATTERY":
                                recipes.push({product:"BATTERY",items:[{type:"IRON",value:50},{type:"COPPER",value:25},{type:"LITHIUM",value:15}],energy:8});
                                shopItems = shopItems.filter(i => i.item != "BATTERY");
                                break;
                            case "SOLAR":
                                recipes.push({product:"SOLAR",items:[{type:"COPPER",value:15},{type:"SILICON",value:25}],energy:10});
                                shopItems = shopItems.filter(i => i.item != "SOLAR");
                                break;
                            case "RTG":
                                recipes.push({product:"RTG",items:[{type:"IRON",value:50},{type:"COPPER",value:30},{type:"PLUTONIUM",value:20}],energy:10});
                                shopItems = shopItems.filter(i => i.item != "RTG");
                                break;
                        }
                        confirmSound();
                    } else {
                        messages.push({text:"Cannot afford " + shopItems[selectedBuy].item,time:0});
                        denySound();
                    }
                } else {
                    buyingMode = false;
                }
            } else {
                buyingMode = true;
            }
            break;
        case "GENERATOR":
            var carbonRes = playerResources.find(r => r.type == "CARBON");
            if(carbonRes != null){
                if(playerTile.building.coal < playerTile.building.maxCoal){
                    playerTile.building.coal += 1;
                    carbonRes.value -= 1;
                    confirmSound();
                } else {
                    messages.push({text:"Generator is full",time:0});
                }
            } else {
                messages.push({text:"No available carbon",time:0});
                denySound();
            }
            break;
    }
}

function handleHUD(){
    var modeHeight = canvas.height * 0.12;
    var selectionHeight = 40;
    var rightInfoHeight = 55;
    var rightInfoStep = 25;

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

    var rightHeight = rightInfoHeight + (rightInfoStep * playerResources.length) + canvas.height * 0.05;
    ctx.fillStyle = hudColourScheme.infill;
    var points = generateHudOverlay(rightHeight);
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
    while(messages.length > 3){
        messages.shift();
    }
    messages = messages.filter(m => m.time < 2000);
    var topHeight = messages.length * 25;
    messages.forEach(message => {
        ctx.fillText(message.text,canvas.width * 0.01,canvas.height * 0.42 + (6 * 25) - topHeight + (messages.indexOf(message) * 25));
        message.time += frameSpeedFactor;
    });

    ctx.textAlign = "center"; 
    ctx.textBaseline = "middle";
    ctx.font = "25px Arial";
    ctx.fillText("Inventory",canvas.width * 0.92,30);
    ctx.font = "15px Arial";
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
        
        ctx.fillText(r.value + "/" + maxStorage + " units of " + r.type,canvas.width * 0.92, 25 + rightInfoHeight + (playerResources.indexOf(r) * rightInfoStep));
    });
    

    ctx.fillStyle = hudColourScheme.text;
    ctx.fillText("Sol: " + (sols + 1) + " Planet Rotation: " + time.toFixed(0) + "°", canvas.width/2,15);

    if(!buildMode && !removeMode && !settingRecipe && !selectingSell && !buyingMode && time <= 8){
        if(time < 3){
            ctx.strokeStyle = hudColourScheme.outline;
            ctx.fillStyle = hudColourScheme.infill;
            generateUIOverlay(ctx,0.05,0.14,0.39);
            ctx.font = "30px Tahoma";
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText("Sol " + (sols + 1) + "/7",canvas.width/2,modeHeight);
        } else if(time <= 8){
            var fade = componentToHex(255 - (255 * ((time-3)/5)));
            console.log(fade);
            ctx.strokeStyle = hudColourScheme.outline + fade;
            ctx.fillStyle = hudColourScheme.infill;
            generateUIOverlay(ctx,0.05,0.14,0.39);
            ctx.font = "30px Tahoma";
            ctx.fillStyle = "#FFFFFF" + fade;
            ctx.fillText("Sol " + (sols + 1) + "/7",canvas.width/2,modeHeight);
        }
    }


    if(buildMode){
        ctx.strokeStyle = hudColourScheme.outline;
        ctx.fillStyle = hudColourScheme.infill;
        generateUIOverlay(ctx,0.05,0.5,0.4);
        ctx.font = "30px Tahoma";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("Build Mode",canvas.width/2,modeHeight);
        ctx.font = "20px Tahoma";
        var number = 5;
        var visableOptions = playerBuildings.filter(p => Math.abs(playerBuildings.indexOf(p) - selectedBuilding) < number + (Math.max(0,number - 1 - selectedBuilding)));
        visableOptions.forEach(p => {
            var index = playerBuildings.indexOf(p);
            if(selectedBuilding == index){
                ctx.fillStyle = hudColourScheme.dynamicText;
            } else {
                ctx.fillStyle = hudColourScheme.staticText;
            }
            if(p.type != "EXIT"){
                ctx.fillText(p.value + " " + p.type,canvas.width/2,modeHeight + selectionHeight + (25 * visableOptions.indexOf(p)));
            } else {
                ctx.fillText(p.type ,canvas.width/2,modeHeight + selectionHeight + (25 * visableOptions.indexOf(p)));
            }
        });
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

    if(buyingMode){
        ctx.strokeStyle = hudColourScheme.outline;
        ctx.fillStyle = hudColourScheme.infill;
        generateUIOverlay(ctx,0.05,0.5,0.2);
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.5,canvas.height * 0.07);
        ctx.lineTo(canvas.width * 0.5,canvas.height * 0.53);
        ctx.stroke();
        if(shopItems[selectedBuy].type != "EXIT"){
            ctx.beginPath();
            ctx.moveTo(canvas.width * 0.5,canvas.height * 0.46);
            ctx.lineTo(canvas.width * 0.78,canvas.height * 0.46);
            ctx.stroke();
        }
        ctx.font = "30px Tahoma";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("Buy Mode",canvas.width * 0.36,modeHeight);
        ctx.font = "20px Tahoma";
        var number = 5;
        var visableOptions = shopItems.filter(p => Math.abs(shopItems.indexOf(p) - selectedBuy) < number + (Math.max(0,number - 1 - selectedBuy)));
        visableOptions.forEach(i => {
            var index = shopItems.indexOf(i);
            if(selectedBuy == index){
                ctx.fillStyle = hudColourScheme.dynamicText;
            } else {
                ctx.fillStyle = hudColourScheme.staticText;
            }
            ctx.textAlign = "center"; 
            ctx.textBaseline = "middle";
            if(i.type != "EXIT"){
                ctx.font = "20px Tahoma";
                ctx.fillText(i.item ,canvas.width * 0.36,modeHeight + 20 + selectionHeight + (25 * visableOptions.indexOf(i)));
                if(selectedBuy == index){
                    ctx.fillText(i.type ,canvas.width * 0.65,modeHeight + 20);
                    ctx.fillText("₿" + selectedSellDisplayPrice.toLocaleString('en-US', {maximumFractionDigits: 0}) ,canvas.width * 0.64,canvas.height * 0.495);
                    ctx.font = "20px Tahoma";
                    ctx.textAlign = "start"; 
                    //ctx.textBaseline = "alphabetic";
                    i.desc.forEach(s => ctx.fillText(s ,canvas.width * 0.51,modeHeight + 20 + selectionHeight + (25 * i.desc.indexOf(s))));
                }
            } else {
                ctx.font = "20px Tahoma";
                ctx.fillText(i.type ,canvas.width * 0.36,modeHeight + 20 + selectionHeight + (25 * visableOptions.indexOf(i)));
            }
        });
        selectedSellDisplayPrice = lerp(shopItems[selectedBuy].cost,selectedSellDisplayPrice,(frameSpeedFactor/80));
    }

    ctx.textAlign = "center"; 
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "20px Tahoma";
    ctx.fillText("JMC",canvas.width * 0.05,canvas.height * 0.14);
    drawLogo(ctx,canvas.width * 0.05,canvas.height * 0.070,50);
    ctx.fillText("Daily Quota:",canvas.width * 0.05,canvas.height * 0.22);
    ctx.font = "25px Tahoma";
    ctx.fillText("₿" + playerBalanceDisplayed.toLocaleString('en-US', {maximumFractionDigits: 0}) ,canvas.width * 0.05,canvas.height * 0.18);
    playerBalanceDisplayed = lerp(playerBalance,playerBalanceDisplayed,(frameSpeedFactor/100));
    if(playerBalance >= quotas[currentQuota]){
        ctx.fillStyle = "#00FF00";
    } else if(time > 300 && Math.trunc(time) % 2 == 0){
        ctx.fillStyle = "#FF0000";
    }
    ctx.fillText("₿" + quotas[currentQuota].toLocaleString('en-US', {maximumFractionDigits: 0}) ,canvas.width * 0.05,canvas.height * 0.26);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "15px Tahoma";
    var batteryStatusHeight = 0.45;
    drawBattery(ctx,canvas.width * 0.02,canvas.height * batteryStatusHeight,100,playerEnergy/playerMaxEnergy);
    if(hudSwap){
        ctx.fillStyle = "#FF0000";
    }
    ctx.fillText("Battery",canvas.width * 0.07,canvas.height * (batteryStatusHeight - 0.13));
    ctx.fillText("Status:",canvas.width * 0.07,canvas.height * (batteryStatusHeight - 0.11));
    var percentEnergy = playerEnergy/playerMaxEnergy;
    ctx.font = "12px Tahoma";
    ctx.fillText(batteryStatusMessage,canvas.width * 0.07,canvas.height * (batteryStatusHeight - 0.09));
    ctx.fillStyle = "#FFFFFF";
    if(tiles.find(t => t.hasPlayer).hazard > 0){
        ctx.font = "50px Tahoma";
        ctx.fillText("☢",canvas.width * 0.07,canvas.height * (batteryStatusHeight - 0.032));
    }
    if(percentEnergy > 0.6){
        batteryStatusMessage = "Nominal";
        hudFlash = false;
    } else if(percentEnergy > 0.4) {
        batteryStatusMessage = "Satisfactory";
        hudFlash = false;
    } else if(percentEnergy > 0.3) {
        batteryStatusMessage = "Low";
        hudFlash = false;
        hudFlashTimer = 0;
    } else if(percentEnergy > 0.1) {
        batteryStatusMessage = "Very Low";
        hudFlash = true;
        hudFlashTimer += (frameSpeedFactor/400);
    } else if(percentEnergy > 0.05) {
        batteryStatusMessage = "Critical";
        hudFlash = true;
        hudFlashTimer += (frameSpeedFactor/150);
    } else if(percentEnergy < 0.05) {
        batteryStatusMessage = "Deadly";
        hudFlash = true;
        hudFlashTimer += (frameSpeedFactor/50);
    };
}

function handleTileUpdates(t) {
    var infoX = canvas.width * 0.85;
    var infoY = canvas.height * 0.45;
    var infoStep = 20;
    ctx.lineWidth = 2;
    ctx.textAlign = "start"; 
    ctx.textBaseline = "alphabetic";
    switch(t.building.type){
        case "SOLAR":
            var totalEnergy = solarOutput * Math.max(0.1,Math.sin(time * Math.PI/180));
            if(t.hasPlayer && playerEnergy < playerMaxEnergy){
                playerEnergy = Math.min(playerMaxEnergy,playerEnergy + totalEnergy * (frameSpeedFactor/1000));
            } else {
            var surrounding = getSurroundingTiles(tiles,t).filter(tt => tt.building.energy != null).filter(tt => tt.building.energy != tt.building.maxEnergy);
            var induvidualEnergy = (totalEnergy / surrounding.length) * (frameSpeedFactor/1000);
            surrounding.forEach(tt => {
                if(tt.building.energy + induvidualEnergy >= tt.building.maxEnergy){
                    tt.building.energy = tt.building.maxEnergy;
                } else {
                    tt.building.energy += induvidualEnergy;
                }
            });
            }
            if(t.hasPlayer && !escMenu){
                ctx.textAlign = "center"; 
                ctx.fillText("⚡",(infoX + 9) ,infoY + infoStep);
                drawBattery(ctx,infoX,infoY + (infoStep*2) + canvas.height * 0.08,canvas.height * 0.1,Math.min(1,totalEnergy/solarOutput));
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
                            t.building.craftTimer = 0;
                        } else {
                            t.building.storedProduct = true;
                        }
                        t.building.crafting = false;
                    }
                }
            }
            if(t.hasPlayer && !escMenu){
                ctx.fillText("Recipe: " + (t.building.recipe != undefined ? t.building.recipe.product : "None") ,infoX,infoY);
                ctx.textAlign = "center"; 
                ctx.fillText("⚡",(infoX + 9) ,infoY + infoStep);
                ctx.fillText("%",(19 + infoX) + (canvas.height * 0.1) * 0.25,infoY + infoStep);
                drawBattery(ctx,infoX,infoY + (infoStep*2) + canvas.height * 0.08,canvas.height * 0.1,Math.min(1,t.building.energy/t.building.maxEnergy));
                drawBattery(ctx,10 + infoX + (canvas.height * 0.1) * 0.25, infoY + (infoStep*2) + canvas.height * 0.08,canvas.height * 0.1,Math.min(1,t.building.craftTimer));
            }
            break;
        case "MINER":
            if(!t.building.mining){
                if(t.building.energy >= 1 && t.resource.type != "NONE" && t.building.storedResource < t.building.maxStored){
                    t.building.energy -= 1;
                    t.building.mining = true;
                }
            } else {
                t.building.mineTimer += (frameSpeedFactor/25000) * mineSpeed;
                if(t.building.mineTimer >= 1){
                    t.building.storedResource = Math.min(t.building.maxStored, t.building.storedResource + minerFactor);
                    mineTile(t);
                    t.building.mining = false;
                    t.building.mineTimer = 0;
                }
            }
            if(minerTransmit){
                t.building.storedResource -= addToPlayerResources(t.building.storedType,t.building.storedResource,false);
            }
            if(t.hasPlayer && !escMenu){
                ctx.textAlign = "center";
                ctx.fillText("⚡",(infoX + 9) ,infoY + infoStep);
                ctx.fillText("%",(19 + infoX) + (canvas.height * 0.1) * 0.25,infoY + infoStep);
                ctx.fillText("⨆",(29 + infoX) + (canvas.height * 0.1) * 0.5,infoY + infoStep);
                drawBattery(ctx,infoX,infoY + (infoStep*2) + canvas.height * 0.08,canvas.height * 0.1,Math.min(1,t.building.energy/t.building.maxEnergy));
                drawBattery(ctx,10 + infoX + (canvas.height * 0.1) * 0.25, infoY + (infoStep*2) + canvas.height * 0.08,canvas.height * 0.1,Math.min(1,t.building.mineTimer));
                drawBattery(ctx,20 + infoX + (canvas.height * 0.1) * 0.5, infoY + (infoStep*2) + canvas.height * 0.08,canvas.height * 0.1,Math.min(1,t.building.storedResource/t.building.maxStored));
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
                ctx.textAlign = "center"; 
                ctx.fillText("⚡",(infoX + 9) ,infoY + infoStep);
                ctx.fillText("%",(19 + infoX) + (canvas.height * 0.1) * 0.25,infoY + infoStep);
                drawBattery(ctx,infoX,infoY + (infoStep*2) + canvas.height * 0.08,canvas.height * 0.1,Math.min(1,t.building.energy/t.building.maxEnergy));
                drawBattery(ctx,10 + infoX + (canvas.height * 0.1) * 0.25, infoY + (infoStep*2) + canvas.height * 0.08,canvas.height * 0.1,Math.min(1,t.building.dischargeTimer));
            }
            break;
        case "RTG":
            if(t.hasPlayer && playerEnergy < playerMaxEnergy){
                playerEnergy = Math.min(playerMaxEnergy,playerEnergy + RTGOutput * (frameSpeedFactor/1000));
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
            }
            break;
        case "GENERATOR":
            if(t.building.generatingTimer >= 1){
                if(t.hasPlayer && playerEnergy < playerMaxEnergy){
                    playerEnergy = Math.min(playerMaxEnergy,playerEnergy + generatorOutput);
                } else {
                    var surrounding = getSurroundingTiles(tiles,t).filter(tt => tt.building.energy != null).filter(tt => tt.building.energy != tt.building.maxEnergy);
                    var induvidualEnergy = (generatorOutput / surrounding.length);
                    surrounding.forEach(tt => {
                        if(tt.building.energy + induvidualEnergy >= tt.building.maxEnergy){
                            tt.building.energy = tt.building.maxEnergy;
                        } else {
                            tt.building.energy += induvidualEnergy;
                        }
                    });
                }
                t.building.generatingTimer = 0;
                t.building.generating = false;
            } else if(t.building.generatingTimer < 1 && t.building.generating){
                t.building.generatingTimer += (frameSpeedFactor/800);
            } else if(t.building.coal >= 1 && ((t.hasPlayer && playerEnergy < playerMaxEnergy) || (getSurroundingTiles(tiles,t).filter(tt => tt.building.energy != null).filter(tt => tt.building.energy != tt.building.maxEnergy).length > 0))){
                t.building.coal -= 1;
                t.building.generatingTimer = 0;
                t.building.generating = true;
            }
            if(t.hasPlayer){
                ctx.textAlign = "center"; 
                ctx.fillText("⨆",(infoX + 9) ,infoY + infoStep);
                ctx.fillText("%",(19 + infoX) + (canvas.height * 0.1) * 0.25,infoY + infoStep);
                drawBattery(ctx,infoX,infoY + (infoStep*2) + canvas.height * 0.08,canvas.height * 0.1,Math.min(1,t.building.coal/t.building.maxCoal));
                drawBattery(ctx,10 + infoX + (canvas.height * 0.1) * 0.25, infoY + (infoStep*2) + canvas.height * 0.08,canvas.height * 0.1,Math.min(1,t.building.generatingTimer));
            }
            break;
    }
}

function exploreMode(){
    playerDrainRate = 0;
    playerMaxEnergy = 10000000000;
    playerEnergy = 10000000000;
    tiles.forEach(t => t.isVisible = true);
    playerSpeed = 5;
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
        case 32:
            inputs.inter = true;
            break;
        case 66:
            inputs.build = true;
            break;
        case 82:
            inputs.remove = true;
            break;
        case 27:
            inputs.esc = true;
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
        case 32:
            inputs.inter = false;
            break;
        case 66:
            inputs.build = false;
            break;
        case 82:
            inputs.remove = false;
            break;
        case 27:
            inputs.esc = false;
        case 73:
            inputs.info = false;
            break;
    }
});

setInterval(gameloop,50);
document.onmousemove = (e) => mousePosition = {x:e.clientX - canvas.getBoundingClientRect().left,y:e.clientY - canvas.getBoundingClientRect().top};