let tileRadius = 60;
let perspRatio = 0.4;
let offsets = [{x:1,y:0},{x:0.5,y:0.8660254037844386},{x:-0.5,y:0.8660254037844387},{x:-1,y:0},{x:-0.5,y:-0.8660254037844387},{x:0.5,y:-0.8660254037844387}];
let tileViewRadius = 11;
let tileStepHeight = 5;
var maxStepHeight = 1;
let roverImgScale = 1;
let radarRange = 5;


function drawHexTile(context, scrX, scrY, tile){

    var screenPoints = []
    for(var offset = 0; offset < offsets.length;offset++){
        screenPoints.unshift({x:scrX + tileRadius * offsets[offset].x,y:scrY + tileRadius * offsets[offset].y * perspRatio});
    }

    context.beginPath();
    context.moveTo(screenPoints[0].x,screenPoints[0].y);
    for(var points = 1; points < screenPoints.length;points++){
            context.lineTo(screenPoints[points].x,screenPoints[points].y);
    }
    context.closePath();
    context.fill();
    context.stroke();

    if(tile.isVisible){
        switch(tile.resource.type){
            case "IRON":
                var size = tile.resource.value;
                context.strokeStyle = "#000000";
                context.fillStyle = new Colour(170,86,71,255).toHex();
                context.fillRect(scrX - size*5/2,scrY - size*5/2,size*5,size*5);
                break;
        }
    }
}

function renderMap(context,tiles){
    var tileWithPlayer = tiles.find(t => t.hasPlayer);
    var visableTiles = tiles.filter(t => Math.abs(t.x - tileWithPlayer.x) <= tileViewRadius).sort((a,b) => a.height - b.height).sort((a,b) => a.y - b.y).sort((a,b) => a.isVisible - b.isVisible);
    var screenCoords = []
    visableTiles.forEach(t => {
        var scrX = t.x * tileRadius * 1.5 + canvas.width/2 - tileWithPlayer.x * tileRadius * 1.5;
        var scrY = t.y * tileRadius * 2 * 0.8660254037844387 * perspRatio + 0.5 * canvas.height;
    
        if(t.x % 2 != 0){
            scrY += 0.8660254037844387 * tileRadius * perspRatio;
        }

        if(t.isVisible){
            scrY -= t.height;
            screenCoords.push({x:scrX,y:scrY});
            context.strokeStyle = t.colour.darkend(0.2).toHex();
            context.fillStyle = t.colour.toHex();
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
            drawHexTile(context,scrX,scrY,t);
            switch(t.building.type){
                case "RADAR":
                    context.drawImage(towerImg,Math.trunc(scrX - towerImg.width/2),Math.trunc(scrY - towerImg.height*0.9));
                    break;
                case "CONSTRUCTOR":
                    context.drawImage(constructorImg,Math.trunc(scrX - constructorImg.width/2),Math.trunc(scrY - constructorImg.height*0.8));
                    break;
                case "SOLAR":
                    context.drawImage(solarImg,Math.trunc(scrX - solarImg.width/2),Math.trunc(scrY - solarImg.height*0.5));
                    break;
                default:
                    break;
            }
        } else {
            screenCoords.push({x:scrX,y:scrY});
            context.strokeStyle = "#000000";
            context.fillStyle = "#FFFFFF";
            context.lineWidth = 3;
            drawHexTile(context,scrX,scrY,t);
            context.fillStyle = "#000000";
            var fontSize = Math.trunc(tileRadius*perspRatio);
            context.font = fontSize + "px Arial";
            context.textAlign = "center"; 
            context.textBaseline = "middle"; 
            context.fillText("404",scrX ,scrY);
        }
    });
    var playerTile = visableTiles.find(t => t.hasPlayer);
    var playerTileCoords = screenCoords[visableTiles.indexOf(playerTile)];
    context.drawImage(roverImg,playerTileCoords.x - Math.trunc(roverImg.width*roverImgScale/2),Math.trunc(playerTileCoords.y - (roverImg.height*roverImgScale/2) - 10 + (Math.sin(millisOnLastFrame/300) * 2.5)),Math.trunc(roverImg.width*roverImgScale),Math.trunc(roverImg.height*roverImgScale));
}
function updatePlayerPos(tiles,deltaX,deltaY){
    var playerTile = tiles.find(t => t.hasPlayer);
    if(playerTile == null){
        playerTile = tiles.find(t => t.x == 20 && t.y == 0);
        playerTile.hasPlayer = true;
    } else {
        var newTile = tiles.find(t => t.x == playerTile.x + deltaX && t.y == playerTile.y + deltaY);
        if(newTile != null){
            if(newTile.isVisible){
                if(Math.abs(newTile.height - playerTile.height) <= maxStepHeight * tileStepHeight){
                    playerTile.hasPlayer = false;
                    newTile.hasPlayer = true;
                } else {
                    messages.unshift({text:"Incline too steep",time:0});
                }
            } else {
                messages.unshift({text:"Cannot enter unfound tile",time:0});
            }
        }
    }
}
function mineTile(tile){
    if(tile.resource.type != "NONE"){
        var type = tile.resource.type;
        if(tile.resource.value == 1){
            tile.resource = {type:"NONE",value:0};
        } 
        else {
            tile.resource.value -= 1;
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
                tiles.filter(t => Math.abs(t.x - tile.x) < radarRange).forEach(t => t.isVisible = true);
                break;
            case "CONSTRUCTOR":
                tile.building.storedItems = [];
                tile.building.energy = 0;
                tile.building.maxEnergy = 10;
                tile.building.crafting = false;
                tile.building.craftTimer = 0;
                break;
        }
        building.value -= 1;
    } else {
        messages.unshift({text:"Cannot place building",time:0});
    }
}
function removeBuilding(tile){
    if(tile.building.type != "NONE"){
        if(tile.building.storedItems != null){
            tile.building.storedItems.forEach(i => addToPlayerResources(i.type,i.value));
        }
        switch(tile.building.type){
            case "RADAR":
                var playerTile = tiles.find(t => t.hasPlayer);
                var tilesInPlayerRange = tiles.filter(t => Math.abs(t.x - playerTile.x) < radarRange);
                var radarsInPlayerRange = tilesInPlayerRange.filter(t => t.building.type == "RADAR" && t != tile);
                if(radarsInPlayerRange.length >= 1){
                    addToPlayerBuildings(tile.building.type,1);
                    tile.building = {type:"NONE"};
                    tiles.filter(t => Math.abs(t.x - tile.x) < radarRange).forEach(t => t.isVisible = false);
                    tiles.filter(t => radarsInPlayerRange.some(t2 => Math.abs(t.x - t2.x) < radarRange)).forEach(t => t.isVisible = true);
                } else {
                    messages.unshift({text:"No other radar in range",time:0});
                }
                break;
            default:
                addToPlayerBuildings(tile.building.type,1);
                tile.building = {type:"NONE"};
                break;
        }
    } else {
        messages.unshift({text:"Tile has no building",time:0});
    }
}

function addToPlayerResources(type,ammount){
    var playerRes = playerResources.find(r => r.type == type);
    if(playerRes != null){
        playerRes.value += ammount;
    } else {
        playerResources.push({type:type,value:ammount});
    }
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

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b, a) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b) + componentToHex(a);
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

  function generateMap(width,biomeSeq,colours){

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
                //Flatlands
                heightNumber = Math.min(6,Math.max(4,Math.trunc(Math.abs((noise.perlin2(t.x/5, t.y/5)+1)/2 * 10))));
                break;
            case 1:
                //Bumpy
                heightNumber = Math.trunc(Math.abs((noise.perlin2(t.x/4, t.y/4)+1)/2 * 10));
                break;
            case 2:
                //Lowlands
                heightNumber = Math.min(5,Math.max(0,Math.trunc(Math.abs((noise.perlin2(t.x/5, t.y/5)+1)/2 * 10))) - 1);
                break;
            case 3:
                //Moutains
                heightNumber = Math.min(9,Math.trunc(Math.abs((noise.perlin2(t.x/3, t.y/3)+1)/2 * 10) + 2));
                break;
        }

        t.height = tileStepHeight * heightNumber;
        t.colour = colours.find(c => c.levels.includes(heightNumber)).colour;

        if(Math.random() * 100 > 95 && t.biome == 0){
            var resourceAmmount = Math.random() * 10;
            t.resource = {type:"IRON",value:Math.max(3,Math.trunc(resourceAmmount))};
            getSurroundingTiles(tiles,t).filter(t => 0.5 > Math.random()).forEach(t => t.resource = {type:"IRON",value:Math.max(1,Math.trunc(resourceAmmount * Math.random()))});
        }
    });

    return tiles;
  }