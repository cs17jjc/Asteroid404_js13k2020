let tileRadius = 40;
let perspRatio = 0.4;
let offsets = [{x:1,y:0},{x:0.5,y:0.8660254037844386},{x:-0.5,y:0.8660254037844387},{x:-1,y:0},{x:-0.5,y:-0.8660254037844387},{x:0.5,y:-0.8660254037844387}];
let tileViewRadius = 5;


function drawHexTile(context, scrX, scrY){

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
}

function renderMap(context,tiles){
    var tileWithPlayer = tiles.find(t => t.hasPlayer);
    var visableTiles = tiles.filter(t => Math.abs(t.x - tileWithPlayer.x) <= tileViewRadius).sort((a,b) => a.height - b.height);
    visableTiles.forEach(t => {
        var scrX = t.x * tileRadius * 1.5 + canvas.width/2 - tileWithPlayer.x * tileRadius * 1.5;
        var scrY = t.y * tileRadius * 2 * 0.8660254037844387 * perspRatio + 0.5 * canvas.height - t.height;
    
        if(t.x % 2 != 0){
            scrY += 0.8660254037844387 * tileRadius * perspRatio;
        }

        context.strokeStyle = t.colour.toHex();
        context.fillStyle = "#000000";
        drawHexTile(context,scrX,scrY);
        if(t.hasPlayer){
            context.strokeStyle = "#000000";
            context.fillStyle = "#0000FF";
            context.fillRect(scrX - 5,scrY - 5,10,10);
        }
    });
}
function updatePlayerPos(tiles,newX,newY){
    var playerTile = tiles.find(t => t.hasPlayer);
    if(playerTile == null){
        tiles.find(t => t.x == Math.trunc(newX) && t.y == Math.trunc(newY)).hasPlayer = true;
    } else if(playerTile.x != Math.trunc(newX) || playerTile.y != Math.trunc(newY)){
        playerTile.hasPlayer = false;
        playerTile = tiles.find(t => t.x == Math.trunc(newX) && t.y == Math.trunc(newY));
        playerTile.hasPlayer = true;
    }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b, a) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b) + componentToHex(a);
  }