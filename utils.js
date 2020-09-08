let tileRadius = 60;
let perspRatio = 0.4;
let offsets = [{x:1,y:0},{x:0.5,y:0.8660254037844386},{x:-0.5,y:0.8660254037844387},{x:-1,y:0},{x:-0.5,y:-0.8660254037844387},{x:0.5,y:-0.8660254037844387}];
let tileViewRadius = 11;
let tileStepHeight = 5;
let roverImgScale = 1;


function drawHexTile(context, tile){

    var scrPos = tile.screenPos;
    drawHexagon(context,scrPos);

    if(tile.isVisible && tile.resource.type != "NONE"){
        var resourceColour = null;
        switch(tile.resource.type){
            case "IRON":
                resourceColour = new Colour(165,42,42,255);
                break;
            case "COPPER":
                resourceColour = new Colour(184,115,51,255);
                break;
            case "CARBON":
                resourceColour = new Colour(18,18,18,255);
                break;
            case "LITHIUM":
                resourceColour = new Colour(169,169,169,255);
                break;
            case "SILICON":
                resourceColour = new Colour(0,153,204,255);
                break;
            case "ROCK":
                resourceColour = new Colour(100,100,100,255);
                break;
            case "PLUTONIUM":
                resourceColour = new Colour(0,255,0,255);
                break;
        }
        context.lineWidth = 3;
        context.fillStyle = resourceColour.toHex();
        context.strokeStyle = resourceColour.darkend(0.4).toHex();
        tile.resource.lines.forEach(l => {
            context.beginPath();
            context.moveTo(l[0].x + scrPos.x,l[0].y + scrPos.y);
            for(var ll = 1; ll < l.length;ll++){
                context.lineTo(l[ll].x + scrPos.x,l[ll].y + scrPos.y);
            }
            context.closePath();
            context.fill();
            context.stroke();
        });
    }
}

function renderMap(context,tiles,drawHeight,playerPosOffset){
    var tileWithPlayer = tiles.find(t => t.hasPlayer);
    var visableTiles = tiles.filter(t => Math.abs(t.x - tileWithPlayer.x) <= tileViewRadius).sort((a,b) => a.height - b.height).sort((a,b) => a.y - b.y).sort((a,b) => a.isVisible - b.isVisible);
    visableTiles.forEach(t => {
        t.screenPos.x = t.x * tileRadius * 1.5 + canvas.width/2 - tileWithPlayer.x * tileRadius * 1.5;
        t.screenPos.y = t.y * tileRadius * 2 * 0.8660254037844387 * perspRatio + drawHeight;
    
        if(t.x % 2 != 0){
            t.screenPos.y += 0.8660254037844387 * tileRadius * perspRatio;
        }

        if(t.isVisible){
            t.screenPos.y -= t.height;
            var tileColour = new Colour(Math.max(0,t.colour.r * (1 - (t.hazard/10))),Math.min(255,t.colour.g * (1 + (t.hazard/10))),Math.max(0,t.colour.b * (1 - (t.hazard/10))),255);
            context.strokeStyle = t.hazard == 0 ? tileColour.darkend(0.2).toHex() : tileColour.darkend(1.5).toHex();
            context.fillStyle = tileColour.toHex();
            if(interactTiles.includes(t)){
                if(buildMode){
                    context.strokeStyle = "#FFFF00";
                } else if(removeMode){
                    context.strokeStyle = "#FF0000";
                }
                if(interactTiles.indexOf(t) == selectedTile){
                    context.strokeStyle = "#00FF00";
                }
            }
            context.lineWidth = 3;
            drawHexTile(context,t);
            switch(t.building.type){
                case "RADAR":
                    context.drawImage(towerImg,Math.trunc(t.screenPos.x - towerImg.width/2),Math.trunc(t.screenPos.y - towerImg.height*0.9));
                    break;
                case "CONSTRUCTOR":
                    context.drawImage(constructorImg,Math.trunc(t.screenPos.x - constructorImg.width/2),Math.trunc(t.screenPos.y - constructorImg.height*0.6));
                    break;
                case "SOLAR":
                    context.drawImage(solarImg,Math.trunc(t.screenPos.x - solarImg.width/2),Math.trunc(t.screenPos.y - solarImg.height*0.5));
                    break;
                case "MINER":
                    context.drawImage(minerImg,Math.trunc(t.screenPos.x - minerImg.width/2),Math.trunc(t.screenPos.y - minerImg.height*0.8));
                    break;
                case "BATTERY":
                    context.drawImage(batteryImg,Math.trunc(t.screenPos.x - batteryImg.width/2),Math.trunc(t.screenPos.y - batteryImg.height*0.6));
                    break;
                case "RTG":
                    context.drawImage(rtgImg,Math.trunc(t.screenPos.x - rtgImg.width/2),Math.trunc(t.screenPos.y - rtgImg.height*0.6));
                    break;
                case "TELEDEPOT":
                    context.drawImage(teledepotImg,Math.trunc(t.screenPos.x - teledepotImg.width/2),Math.trunc(t.screenPos.y - teledepotImg.height*0.6));
                    break;
                case "ROBOSHOP":
                    context.drawImage(roboshopImg,Math.trunc(t.screenPos.x - roboshopImg.width/2),Math.trunc(t.screenPos.y - roboshopImg.height*0.6));
                    break;
                case "GENERATOR":
                    context.drawImage(generatorImg,Math.trunc(t.screenPos.x - generatorImg.width/2),Math.trunc(t.screenPos.y - generatorImg.height*0.6));
                    break;
            }
        } else {
            context.strokeStyle = "#000000";
            context.fillStyle = "#AAAAAA";
            context.lineWidth = 3;
            drawHexTile(context,t);
            context.fillStyle = "#000000";
            var fontSize = Math.trunc(tileRadius*perspRatio);
            context.font = fontSize + "px Arial";
            context.textAlign = "center"; 
            context.textBaseline = "middle"; 
            context.fillText("404",t.screenPos.x ,t.screenPos.y);
        }
    });
    var playerTile = visableTiles.find(t => t.hasPlayer);
    var playerTileCoords = playerTile.screenPos;
    if(!playerDeadState){
        context.drawImage(roverImg,(playerTileCoords.x - Math.trunc(roverImg.width*roverImgScale/2)) + Math.trunc(playerPosOffset.x),(Math.trunc(playerTileCoords.y - (roverImg.height*roverImgScale/2) - 10 + Math.sin(180 * time * (Math.PI/180)) * 4)) + Math.trunc(playerPosOffset.y),Math.trunc(roverImg.width*roverImgScale),Math.trunc(roverImg.height*roverImgScale));
    } else {
        context.drawImage(roverImg,(playerTileCoords.x - Math.trunc(roverImg.width*roverImgScale/2)) + Math.trunc(playerPosOffset.x),(Math.trunc(playerTileCoords.y - (roverImg.height*roverImgScale/2) - 10)) + Math.trunc(playerPosOffset.y),Math.trunc(roverImg.width*roverImgScale),Math.trunc(roverImg.height*roverImgScale));
    }
    
}
function updateRadarVisableTiles(tiles){
    var radarTiles = tiles.filter(t => t.building.type == "RADAR");
    tiles.forEach(t => {
        if(radarTiles.some(r => Math.abs(r.x - t.x) <= radarRange)){
            t.isVisible = true;
        } else {
            t.isVisible = false;
        }
    });
}
function drawLogo(context,x,y,size){
    var topY = -size/2;
    var bottomY = size/2;
    var leftX = -size/2;
    var rightX = size/2;
    context.save();
    context.translate(x,y);
    context.strokeStyle = "#A2A2A2";
    ctx.beginPath();
    ctx.moveTo(0, topY);
    ctx.lineTo(leftX,bottomY);
    ctx.lineTo(rightX,bottomY);
    ctx.closePath();
    ctx.stroke();
    context.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.arc(0, topY, size/4, 0, 2 * Math.PI);
    ctx.fill();
    context.fillStyle = "#FFF500";
    ctx.beginPath();
    ctx.arc(leftX,bottomY, size/4, 0, 2 * Math.PI);
    ctx.fill();
    context.fillStyle = "#0045FF";
    ctx.beginPath();
    ctx.arc(rightX,bottomY, size/4, 0, 2 * Math.PI);
    ctx.fill();
    context.restore();
}
function drawBattery(context,x,y,size,percentage){
    var topY = -size/2;
    var bottomY = size/2
    var width = size * 0.25;
    context.save();
    context.translate(x,y);
    context.fillStyle = new Colour(255 - (255 * percentage),255 * percentage,0,255).toHex();
    context.fillRect(0,-size * percentage,width,size * percentage);
    context.strokeStyle = "#FFFFFF";
    context.beginPath();
    context.moveTo(0,-size);
    context.lineTo(width,-size);
    context.lineTo(width,0);
    context.lineTo(0,0);
    context.closePath();
    context.stroke();
    context.restore();
}
function updatePlayerPos(tiles,deltaX,deltaY){
    interactTimer = 0;
    moving = true;
    var playerTile = tiles.find(t => t.hasPlayer);
        var newTile = tiles.find(t => t.x == playerTile.x + deltaX && t.y == playerTile.y + deltaY);
        if(newTile != null){
            if(newTile.isVisible){
                if(Math.abs(newTile.height - playerTile.height) <= maxStepHeight * tileStepHeight){
                    playerTile.hasPlayer = false;
                    newTile.hasPlayer = true;
                    playerPos = {x:newTile.x,y:newTile.y};
                    playerPosOffset = {x:playerTile.screenPos.x - newTile.screenPos.x,y:playerTile.screenPos.y - newTile.screenPos.y};
                    zzfx(...[soundFxVolume,.1,440,,,.07,,,,,50,.07]).start();
                } else {
                    messages.push({text:"Incline too steep",time:0});
                }
            } else {
                messages.push({text:"Cannot enter unfound tile",time:0});
            }
        }
}
function lerp(value1, value2, amount) {
    amount = Math.min(1,Math.max(0,amount));
    return value1 + (value2 - value1) * amount;
}
function mineTile(tile){
    if(tile.resource.type != "NONE"){
        var type = tile.resource.type;
        if(tile.resource.value == 1){
            tile.resource = {type:"NONE",value:0};
        } 
        else {
            tile.resource.value -= 1;
            tile.resource.lines = generateResourcePoints(tile.resource.value,tile.resource.type);
        }
        return {type:type,value:1};
    } else {
        return tile.resource;
    }
}
function placeBuilding(tile,building){
    if(tile.building.type == "NONE"){
        tile.building.type = building.type;
        switch(building.type){
            case "RADAR":
                updateRadarVisableTiles(tiles);
                break;
            case "CONSTRUCTOR":
                tile.building.energy = 0;
                tile.building.maxEnergy = 20;
                tile.building.crafting = false;
                tile.building.craftTimer = 0;
                tile.building.storedProduct = false;
                break;
            case "MINER":
                tile.building.storedResource = 0;
                tile.building.storedType = tile.resource.type;
                tile.building.maxStored = 50;
                tile.building.energy = 0;
                tile.building.maxEnergy = 10;
                tile.building.mining = false;
                tile.building.mineTimer = 0;
                break;
            case "BATTERY":
                tile.building.energy = 0;
                tile.building.maxEnergy = 20;
                tile.building.dischargeTimer = 0;
                tile.building.discharging = false;
                break;
            case "GENERATOR":
                tile.building.coal = 0;
                tile.building.maxCoal = 25;
                tile.building.generatingTimer = 0;
                tile.building.generating = false;
                break;
        }
        building.value -= 1;
        zzfx(...[soundFxVolume,,191,,,.07,1,1.09,-5.4,,,,,.4,-0.4,.3,,.7]).start();
    } else {
        messages.push({text:"Cannot place building",time:0});
    }
}
function removeBuilding(tile){
    if(tile.building.type != "NONE"){
        switch(tile.building.type){
            case "RADAR":
                var playerTile = tiles.find(t => t.hasPlayer);
                var tilesInPlayerRange = tiles.filter(t => Math.abs(t.x - playerTile.x) <= radarRange);
                var radarsInPlayerRange = tilesInPlayerRange.filter(t => t.building.type == "RADAR" && t != tile);
                if(radarsInPlayerRange.length >= 1){
                    addToPlayerBuildings(tile.building.type,1);
                    tile.building = {type:"NONE"};
                    updateRadarVisableTiles(tiles);
                    zzfx(...[soundFxVolume,,400,,,.07,1,1.09,-5.4,,,,,.4,-0.4,.3,,.7]).start();
                } else {
                    messages.push({text:"No other radar in range",time:0});
                }
                break;
            case "CONSTRUCTOR":
                if(tile.building.storedProduct == true){
                    addToPlayerBuildings(tile.building.recipe.product,1);
                }
                addToPlayerBuildings(tile.building.type,1);
                tile.building = {type:"NONE"};
                zzfx(...[soundFxVolume,,400,,,.07,1,1.09,-5.4,,,,,.4,-0.4,.3,,.7]).start();
                break;
            case "GENERATOR":
                addToPlayerResources("CARBON",tile.building.coal);
                addToPlayerBuildings(tile.building.type,1);
                tile.building = {type:"NONE"};
                zzfx(...[soundFxVolume,,400,,,.07,1,1.09,-5.4,,,,,.4,-0.4,.3,,.7]).start();
                break;
            default:
                addToPlayerBuildings(tile.building.type,1);
                tile.building = {type:"NONE"};
                zzfx(...[soundFxVolume,,400,,,.07,1,1.09,-5.4,,,,,.4,-0.4,.3,,.7]).start();
                break;
        }
    } else {
        messages.push({text:"Tile has no building",time:0});
    }
}

function addToPlayerResources(type,ammount,message){
    var addedValue = Math.min(maxStorage,ammount);
    var playerRes = playerResources.find(r => r.type == type);
    if(playerRes != null){
        if(playerRes.value + addedValue > maxStorage){
            addedValue = maxStorage - playerRes.value;
        }
        playerRes.value += addedValue;
    } else {
        playerResources.push({type:type,value:addedValue});
    }
    return addedValue;
}
function addToPlayerBuildings(type,ammount){
    var playerBuild = playerBuildings.find(r => r.type == type);
    if(playerBuild != null){
        playerBuild.value += ammount;
    } else {
        playerBuildings.push({type:type,value:ammount});
    }
}
function addToBuildingStorage(buildingStorage,type,ammount){
    var buildRes = buildingStorage.find(r => r.type == type);
    if(buildRes != null){
        buildRes.value += ammount;
    } else {
        buildingStorage.push({type:type,value:ammount});
    }
}

function drawHexagon(context,pos){
    var screenPoints = []
    for(var offset = 0; offset < offsets.length;offset++){
        screenPoints.unshift({x:pos.x + tileRadius * offsets[offset].x,y:pos.y + tileRadius * offsets[offset].y * perspRatio});
    }

    context.beginPath();
    context.moveTo(screenPoints[0].x,screenPoints[0].y);
    for(var points = 1; points < screenPoints.length;points++){
            context.lineTo(screenPoints[points].x,screenPoints[points].y);
    }
    context.closePath();
    context.fill();
    context.stroke();
}

function drawHexHeight(context,scrX,scrY,height){
    var screenPoints = []
    for(var offset = 0; offset < offsets.length-2;offset++){
        screenPoints.unshift({x:scrX + tileRadius * offsets[offset].x,y:scrY + tileRadius * offsets[offset].y * perspRatio});
    }
    for(var offset = offsets.length-3; offset >= 0;offset--){
        screenPoints.unshift({x:scrX + tileRadius * offsets[offset].x,y:(scrY + height) + tileRadius * offsets[offset].y * perspRatio});
    }

    context.beginPath();
    context.moveTo(screenPoints[0].x,screenPoints[0].y);
    for(var points = 1; points < screenPoints.length;points++){
            context.lineTo(screenPoints[points].x,screenPoints[points].y);
    }
    context.closePath();
    context.fill();
    context.stroke();
}

function componentToHex(c) {
    var hex = Math.trunc(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b, a) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b) + componentToHex(a);
  }

  function generateHudOverlay(rightHeight){
      var leftHeight = 0.29;
      var leftHeight2 = 0.48;
    var bottomY = canvas.height * 0.55;
    var points = [];

    points.unshift({x:0,y:canvas.height * leftHeight});
    points.unshift({x:canvas.width * 0.09,y:canvas.height * leftHeight});
    points.unshift({x:canvas.width * 0.1,y:canvas.height * (leftHeight - 0.02)});
    points.unshift({x:canvas.width * 0.1,y:0});
    points.unshift({x:0,y:0});

    points.unshift({x:0,y:canvas.height * leftHeight2});
    points.unshift({x:canvas.width * 0.09,y:canvas.height * leftHeight2});
    points.unshift({x:canvas.width * 0.1,y:canvas.height * (leftHeight2 - 0.02)});
    points.unshift({x:canvas.width * 0.1,y:canvas.height * leftHeight});
    points.unshift({x:0,y:canvas.height * leftHeight});
    points.unshift({x:0,y:0});

    var topLength = 0.08;
    points.unshift({x:canvas.width * (0.5 - topLength - 0.03),y:0});
    points.unshift({x:canvas.width * (0.5 - topLength),y:canvas.height * 0.04});
    points.unshift({x:canvas.width * (0.5 + topLength),y:canvas.height * 0.04});
    points.unshift({x:canvas.width * (0.5 + topLength + 0.03),y:0});

    points.unshift({x:canvas.width * 0.83,y:0});
    points.unshift({x:canvas.width * 0.83,y:rightHeight - canvas.height * 0.02});
    points.unshift({x:canvas.width * 0.85,y:rightHeight});
    points.unshift({x:canvas.width,y:rightHeight});
    points.unshift({x:canvas.width,y:0});
    points.unshift({x:0,y:0});
    return points;
  }

  function generateUIOverlay(context,height,length,width){
      var cornerLength = 0.04;
      var rightX = 1 - width;
      context.beginPath();
      context.moveTo(canvas.width * (width + cornerLength),canvas.height * height);
      context.lineTo(canvas.width * (rightX - cornerLength),canvas.height * height);
      context.lineTo(canvas.width * (rightX),canvas.height * (height + cornerLength));
      context.lineTo(canvas.width * (rightX),canvas.height * ((height + length) - cornerLength));
      context.lineTo(canvas.width * (rightX - cornerLength),canvas.height * (height + length));
      context.lineTo(canvas.width * (width + cornerLength),canvas.height * (height + length));
      context.lineTo(canvas.width * (width),canvas.height * (height + length - cornerLength));
      context.lineTo(canvas.width * (width),canvas.height * (height + cornerLength));
      context.closePath();
      context.fill();
      context.stroke();

      var sizeOffset = 0.02;
      var height2 = height + sizeOffset;
      var length2 = length - sizeOffset * 2;
      context.beginPath();
      context.moveTo(canvas.width * (width + sizeOffset + cornerLength),canvas.height * height2);
      context.lineTo(canvas.width * (rightX - sizeOffset - cornerLength),canvas.height * height2);
      context.lineTo(canvas.width * (rightX - sizeOffset),canvas.height * (height2 + cornerLength));
      context.lineTo(canvas.width * (rightX - sizeOffset),canvas.height * ((height2 + length2) - cornerLength));
      context.lineTo(canvas.width * (rightX - sizeOffset - cornerLength),canvas.height * (height2 + length2));
      context.lineTo(canvas.width * (width + sizeOffset + cornerLength),canvas.height * (height2 + length2));
      context.lineTo(canvas.width * (width + sizeOffset),canvas.height * (height2 + length2 - cornerLength));
      context.lineTo(canvas.width * (width + sizeOffset),canvas.height * (height2 + cornerLength));
      context.closePath();
      context.fill();
      context.stroke();
  }

  function getSurroundingTiles(tiles,tile){
      return tiles.filter(t => {
        var yDelta = t.y - tile.y;
        var xDelta = t.x - tile.x;
        if(Math.abs(yDelta) == 1 && xDelta == 0){
            return true;
        }
        if(yDelta == 0 && Math.abs(xDelta) == 1){
            return true;
        }
        if(tile.x % 2 == 0) {
            if(yDelta == -1 && Math.abs(xDelta) == 1){
                return true;
            }
        } else {
            if(yDelta == 1 && Math.abs(xDelta) == 1){
                return true;
            }
        }
        return false;
      });
  }

  function generateResourcePoints(value,type){
    var points = 0;
    switch(type){
        case "ROCK":
            points = 12;
            break;
        case "SILICON":
            points = 5;
            break;
        case "LITHIUM":
            points = 9;
            break;
        case "CARBON":
            points = 15;
            break;
        default:
            points = 7;
            break;
    }
    var number = 1;
    var size = value/20;
    var lines = [];
    for(var n = 0; n < number;n++){
        var xOffset = (Math.random() - 0.5) * (tileRadius*0.2) * size;
        var yOffset = (Math.random() - 0.5) * (tileRadius*0.2) * size;
        lines.unshift(generateBlob(points,size,yOffset,xOffset));
    }
      return lines;
  }

  function generateBlob(points,size,xOffset,yOffset){
    var curLines = []
    var angles = [];
    for(var i = 0; i < points;i++){
        angles.unshift(i * ((Math.PI*2)/points));
    }
    angles.forEach(a => {
        var x = xOffset + (Math.cos(a) * size * tileRadius + (Math.random() * 15 * size));
        var y = yOffset + (Math.sin(a) * size * (tileRadius*perspRatio) + (Math.random() * 15 * size * perspRatio));
        x = Math.min(tileRadius * 0.6 - 5,x);
        x = Math.max(-tileRadius * 0.6 + 5,x);
        y = Math.min(tileRadius * perspRatio - 5,y);
        y = Math.max(-tileRadius * perspRatio + 5,y);
        curLines.unshift({x:x,y:y});
    });
    return curLines;
  }


  function generateMap(width,biomeSeq,colours,startX){

    var tiles = [];
    for(var y = 0; y < 5;y++){
        for(var x = 0; x < width;x++){
                tiles.push(new Tile(x,y,biomeSeq[x]));
        }
    }

    tiles.forEach(t => {

        var heightNumber = 0;
        switch(t.biome){
            case 0:
                //Lowlands
                heightNumber = Math.abs((noise.perlin2(t.x/10, t.y/10)+1)/2 * 3);
                break;
            case 1:
                //Flatlands
                heightNumber = Math.abs((noise.perlin2(t.x/10, t.y/10)+1)/2 * 4);
                break;
            case 2:
                //Bumpy
                heightNumber = Math.abs((noise.perlin2(t.x/10, t.y/10)+1)/2 * 6);
                break;
            case 3:
                //Moutains
                heightNumber = Math.abs((noise.perlin2(t.x/10, t.y/10)+1)/2 * 8);
                break;
            case 4:
                //Peak
                heightNumber = Math.abs((noise.perlin2(t.x/10, t.y/10)+1)/2 * 10);
                break;
        }
        heightNumber = Math.max(0,Math.trunc(heightNumber));
        t.height = tileStepHeight * heightNumber;
        t.colour = colours.find(c => c.levels.includes(heightNumber)).colour;

        if(Math.abs(startX - t.x) > (width * 0.005) && Math.random() * 100 > 85 + Math.min(15,Math.abs(startX - t.x)/15)){
            addResourceToTile(tiles,t,"IRON",Math.random() * 15,10,0.6);
        } else if(Math.abs(startX - t.x) > (width * 0.05) && Math.random() * 100 > 90) {
           addResourceToTile(tiles,t,"COPPER",Math.random() * 15,10,0.5);
        } else if(Math.abs(startX - t.x) > (width * 0.08) && Math.random() * 100 > 92) {
            addResourceToTile(tiles,t,"CARBON",Math.random() * 15,10,0.6);
        } else if(Math.abs(startX - t.x) > (width * 0.12) && Math.random() * 100 > 96) {
            addResourceToTile(tiles,t,"LITHIUM",Math.random() * 15,10,0.6);
        } else if(Math.abs(startX - t.x) > (width * 0.14) && Math.random() * 100 > 85) {
            addResourceToTile(tiles,t,"SILICON",Math.random() * 15,10,0.5);
        } else if(Math.abs(startX - t.x) > (width * 0.24) && Math.random() * 100 > 85) {
            var ammount = Math.random() * 15;
            addResourceToTile(tiles,t,"PLUTONIUM",ammount,10,0.7);
            addHazardToTile(tiles,t,4);
        } else if(Math.random() * 100 > 85 + Math.min(15,Math.abs(startX - t.x)/10)) {
            addResourceToTile(tiles,t,"ROCK",Math.random() * 15,10,0.9);
        }
        if(Math.abs(startX - t.x) > (width * 0.16) && Math.random() * 100 > 95){
            addHazardToTile(tiles,t,Math.random() * 5);
        }
    });
    tiles.find(t => t.x == startX).hasPlayer = true;
    tiles.filter(t => t.resource.type != "NONE").forEach(t => t.resource.lines = generateResourcePoints(t.resource.value,t.resource.type));
    
    return tiles;
  }

  function addResourceToTile(tiles,tile,type,ammount,minimum,expansion){
    var resourceAmmount = Math.max(minimum,Math.trunc(ammount));
    tile.resource = {type:type,value:resourceAmmount};
    getSurroundingTiles(tiles,tile).filter(t => Math.random() > expansion).forEach(t => t.resource = {type:type,value:Math.max(5,Math.trunc(resourceAmmount * Math.random()))});
  }

  function addHazardToTile(tiles,tile,ammount){
    tile.hazard = ammount;
    getSurroundingTiles(tiles,tile).forEach(t => t.hazard = ammount * 0.8);
  }