let tileRadius = 60;
let perspRatio = 0.4;
let offsets = [{x:1,y:0},{x:0.5,y:0.8660254037844386},{x:-0.5,y:0.8660254037844387},{x:-1,y:0},{x:-0.5,y:-0.8660254037844387},{x:0.5,y:-0.8660254037844387}];
let tileViewRadius = 11;
let tileStepHeight = 5;
var maxStepHeight = 1;
let roverImgScale = 1;


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

    if(tile.resource.type == "IRON"){
        var size = tile.resource.value;
        context.strokeStyle = "#000000";
        context.fillStyle = new Colour(170,86,71,255).toHex();
        context.fillRect(scrX - size*5/2,scrY - size*5/2,size*5,size*5);
    }
}

function renderMap(context,tiles){
    var tileWithPlayer = tiles.find(t => t.hasPlayer);
    var visableTiles = tiles.filter(t => Math.abs(t.x - tileWithPlayer.x) <= tileViewRadius).sort((a,b) => a.height - b.height).sort((a,b) => a.isVisible - b.isVisible);
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
            context.lineWidth = 3;
            drawHexTile(context,scrX,scrY,t);
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

    var tilesWithBuildings = visableTiles.filter(t => t.building.type != "NONE");
    tilesWithBuildings.forEach(t => {
        var scrPos = screenCoords[visableTiles.indexOf(t)];
        if(t.building.type == "RADAR"){
            context.drawImage(towerImg,scrPos.x - Math.trunc(towerImg.width/2),scrPos.y - Math.trunc(towerImg.height*0.9));
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
                    messages.push({text:"Incline too steep",time:0});
                }
            } else {
                messages.push({text:"Cannot enter unknown tile",time:0});
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
        tile.building = building;
        if(building.type == "RADAR"){
            tiles.filter(t => Math.abs(t.x - tile.x) < 5).forEach(t => t.isVisible = true);
        }
    } else {
        messages.push({text:"Cannot place building",time:0});
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