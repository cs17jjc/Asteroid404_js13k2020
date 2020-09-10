//zzfx
zzfx=(...t)=>zzfxP(zzfxG(...t))
zzfxP=(...t)=>{let e=zzfxX.createBufferSource(),f=zzfxX.createBuffer(t.length,t[0].length,zzfxR);t.map((d,i)=>f.getChannelData(i).set(d)),e.buffer=f,e.connect(zzfxX.destination);return e}
zzfxG=(a=1,t=.05,h=220,M=0,n=0,s=.1,i=0,r=1,o=0,z=0,e=0,f=0,m=0,x=0,b=0,d=0,u=0,c=1,G=0,I=zzfxR,P=99+M*I,V=n*I,g=s*I,j=G*I,k=u*I,l=2*Math.PI,p=(a=>0<a?1:-1),q=P+j+V+g+k,v=(o*=500*l/I**2),w=(h*=(1+2*t*Math.random()-t)*l/I),y=p(b)*l/4,A=0,B=0,C=0,D=0,E=0,F=0,H=1,J=[])=>{for(;C<q;J[C++]=F)++E>100*d&&(E=0,F=A*h*Math.sin(B*b*l/I-y),F=p(F=i?1<i?2<i?3<i?Math.sin((F%l)**3):Math.max(Math.min(Math.tan(F),1),-1):1-(2*F/l%2+2)%2:1-4*Math.abs(Math.round(F/l)-F/l):Math.sin(F))*Math.abs(F)**r*a*zzfxV*(C<P?C/P:C<P+j?1-(C-P)/j*(1-c):C<P+j+V?c:C<q-k?(q-C-k)/g*c:0),F=k?F/2+(k>C?0:(C<q-k?1:(C-q)/k)*J[C-k|0]/2):F),A+=1-x+1e9*(Math.sin(C)+1)%2*x,B+=1-x+1e9*(Math.sin(C)**2+1)%2*x,h+=o+=500*z*l/I**3,H&&++H>f*I&&(h+=e*l/I,w+=e*l/I,H=0),m&&++D>m*I&&(h=w,o=v,D=1,H=H||1);return J};
zzfxV=0.5
zzfxR=44100
zzfxX=new(top.AudioContext||webkitAudioContext);
//zzfxM
zzfxM=(n,f,t,e=125)=>{let l,o,z,r,g,h,x,a,u,c,d,i,m,p,G,M=0,R=[],b=[],j=[],k=0,q=0,s=1,v={},w=zzfxR/e*60>>2;for(;s;k++)R=[s=a=d=m=0],t.map((e,d)=>{for(x=f[e][k]||[0,0,0],s|=!!f[e][k],G=m+(f[e][0].length-2-!a)*w,p=d==t.length-1,o=2,r=m;o<x.length+p;a=++o){for(g=x[o],u=o==x.length+p-1&&p||c!=(x[0]||0)|g|0,z=0;z<w&&a;z++>w-99&&u?i+=(i<1)/99:0)h=(1-i)*R[M++]/2||0,b[r]=(b[r]||0)-h*q+h,j[r]=(j[r++]||0)+h*q+h;g&&(i=g%1,q=x[1]||0,(g|=0)&&(R=v[[c=x[M=0]||0,g]]=v[[c,g]]||(l=[...n[c]],l[2]*=2**((g-12)/12),g>0?zzfxG(...l):[])))}m=G});return[b,j]}
//Music


var getArr = (n) => Array.from(new Array(n).keys());
var drm = [getArr(18).map(i => i == 2 ? 15 : 0),getArr(18).map(i => i == 2 ? 15 : 0),getArr(18).map(i => i == 10 ? 15 : i == 0 ? 1 : 0),getArr(18).map(i => i == 0 ? 2 : (i % 4 == 0 && i != 12) ? 15 : 0)];
drm[1][14] = 15;
var mkEch = (n) => getArr(18).map(i => i == 0 ? 3 : [2,6,10,14].includes(i) ? n + [0,0.1,0.5,0.7][[2,6,10,14].indexOf(i)] : i == 1 ? -0.1 : 0);
var Ech = [mkEch(18),mkEch(22),mkEch(24),mkEch(30)];
var mainLoop = [8,9,10,11,8,9,10,11];
var song = [
[
[,0,86,,,,,.7,,,,.5,,6.7,1,.05],             //Kick
[.7,0,270,,,.12,3,1.65,-2,,,,,4.5,,.02],    //Snare
[.4,0,2200,,,.04,3,2,,,800,.02,,4.8,,.01,.1],  //Hi-hat
[,0,130.81 ,,,1] //Echo Synth
],
[[Ech[0]],[Ech[1]],[Ech[2]],[Ech[3]],[Ech[0],drm[0],drm[2]],[Ech[1],drm[0],drm[2]],[Ech[2],drm[0],drm[2]],[Ech[3],drm[1],drm[2]],[Ech[0],drm[0],drm[2],drm[3]],[Ech[1],drm[0],drm[2],drm[3]],[Ech[2],drm[0],drm[2],drm[3]],[Ech[3],drm[1],drm[2],drm[3]]],
[0,1,2,3,0,1,2,3,4,5,6,7,4,5,6,7].concat(mainLoop,mainLoop,mainLoop,mainLoop),120];

//Perlin
class Grad {
    constructor(x, y, z) {
        this.x = x; this.y = y; this.z = z;
    }
    dot2(x, y) {
        return this.x * x + this.y * y;
    }
}
  
    var grad3 = [new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
                 new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
                 new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)];
    var p = getArr(256).map(i => Math.trunc(Math.random() * 255));
    var perm = new Array(512);
    var gradP = new Array(512);
    function seed(seed) {
      if(seed > 0 && seed < 1) {
        seed *= 65536;
      }
      seed = Math.floor(seed);
      if(seed < 256) {
        seed |= seed << 8;
      }
      for(var i = 0; i < 256; i++) {
        var v;
        if (i & 1) {
          v = p[i] ^ (seed & 255);
        } else {
          v = p[i] ^ ((seed>>8) & 255);
        }
  
        perm[i] = perm[i + 256] = v;
        gradP[i] = gradP[i + 256] = grad3[v % 12];
      }
    };
    seed(0);
    function fade(t) {
      return t*t*t*(t*(t*6-15)+10);
    }
    function lerp(a, b, t) {
      return (1-t)*a + t*b;
    }
    function perlin2(x, y) {
      var X = Math.floor(x), Y = Math.floor(y);
      x = x - X; y = y - Y;
      X = X & 255; Y = Y & 255;
      var u = fade(x);
      var n00 = gradP[X+perm[Y]].dot2(x, y);
      var n01 = gradP[X+perm[Y+1]].dot2(x, y-1);
      var n10 = gradP[X+1+perm[Y]].dot2(x-1, y);
      var n11 = gradP[X+1+perm[Y+1]].dot2(x-1, y-1);
      return lerp(
        lerp(n00, n10, u),
        lerp(n01, n11, u),
         fade(y));
    };

//Classes
class Tile {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.hasPlayer = false;
        this.resource = {type:"NONE"};
        this.building = {type:"NONE"};
        this.isVisible = false;
        this.screenPos = {x:0,y:0};
        this.hazard = 0;
    }
}


class Colour{
    constructor(r,g,b,a){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    toHex(){
        return rgbToHex(this.r,this.g,this.b,this.a);
    }
    darkend(factor){
        return new Colour(Math.min(255, Math.trunc(this.r * factor)),Math.min(255, Math.trunc(this.g * factor)),Math.min(255, Math.trunc(this.b * factor)),this.a);
    }
}

//Game code

var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

var tiles = [];
var messages = [];


//Utils
let tileRadius = 60;
let perspRatio = 0.4;
let offsets = [{x:1,y:0},{x:0.5,y:0.866025},{x:-0.5,y:0.866025},{x:-1,y:0},{x:-0.5,y:-0.866025},{x:0.5,y:-0.866025}];
let tileViewRadius = 11;
let tileStepHeight = 5;
var roverImgScale = 1;

var resColMap = new Map();
resColMap.set("ROCK",new Colour(100,100,100,255));
resColMap.set("IRON",new Colour(165,42,42,255));
resColMap.set("COPPER",new Colour(184,115,51,255));
resColMap.set("CARBON",new Colour(18,18,18,255));
resColMap.set("LITHIUM",new Colour(169,169,169,255));
resColMap.set("SILICON",new Colour(0,153,204,255));
resColMap.set("PLUTONIUM",new Colour(0,255,0,255));

var dG = (strId) => document.getElementById(strId);
var roverImg = dG("0");
var imgMap = new Map();
imgMap.set("RADAR",dG("1"));
imgMap.set("CONSTRUCTOR",dG("2"));
imgMap.set("SOLAR",dG("3"));
imgMap.set("MINER",dG("4"));
imgMap.set("BATTERY",dG("5"));
imgMap.set("RTG",dG("6"));
imgMap.set("TELEDEPOT",dG("7"));
imgMap.set("ROBOSHOP",dG("8"));
imgMap.set("GENERATOR",dG("9"));

function renderMap(drawHeight,playerPosOffset){
    var tileWithPlayer = tiles.find(t => t.hasPlayer);
    var visableTiles = tiles.filter(t => Math.abs(t.x - tileWithPlayer.x) <= tileViewRadius).sort((a,b) => a.height - b.height).sort((a,b) => a.y - b.y).sort((a,b) => a.isVisible - b.isVisible);
    visableTiles.forEach(t => {
        t.screenPos.x = t.x * tileRadius * 1.5 + canW/2 - tileWithPlayer.x * tileRadius * 1.5;
        t.screenPos.y = t.y * tileRadius * 2 * 0.866025 * perspRatio + drawHeight + (t.x % 2 != 0 ? 0.866025 * tileRadius * perspRatio : 0);
        ctx.lineWidth = 3;
        if(t.isVisible){
            t.screenPos.y -= t.height;
            var tileColour = new Colour(Math.max(0,t.colour.r * (1 - (t.hazard/10))),Math.min(255,t.colour.g * (1 + (t.hazard/10))),Math.max(0,t.colour.b * (1 - (t.hazard/10))),255);
            ctx.strokeStyle = t.hazard == 0 ? tileColour.darkend(0.2).toHex() : tileColour.darkend(1.5).toHex();
            ctx.fillStyle = tileColour.toHex();
            drawHexagon(t.screenPos);
            if(t.resource.type != "NONE"){
                var rCol = resColMap.get(t.resource.type);
                ctx.lineWidth = 3;
                ctx.fillStyle = rCol.toHex();
                ctx.strokeStyle = rCol.darkend(0.4).toHex();
                var l = t.resource.lines;
                ctx.beginPath();
                ctx.moveTo(l[0].x + t.screenPos.x,l[0].y + t.screenPos.y);
                for(var ll = 1; ll < l.length;ll++){
                    ctx.lineTo(l[ll].x + t.screenPos.x,l[ll].y + t.screenPos.y);
                }
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }
            var img = imgMap.get(t.building.type);
            img != undefined ? ctx.drawImage(img,Math.trunc(t.screenPos.x - img.width/2),Math.trunc(t.screenPos.y - img.height*0.6)) : null;
        } else {
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#AAAAAA";
            drawHexagon(t.screenPos);
            ctx.fillStyle = "#000000";
            var fontSize = Math.trunc(tileRadius*perspRatio);
            ctx.font = fontSize + "px Arial";
            ctx.textAlign = "center"; 
            ctx.textBaseline = "middle"; 
            fT("404",t.screenPos.x ,t.screenPos.y);
        }
    });
    var playerTileCoords = tileWithPlayer.screenPos;
    ctx.drawImage(roverImg,Math.trunc(playerTileCoords.x - (roverImg.width*roverImgScale/2) + playerPosOffset.x),Math.trunc((playerTileCoords.y - (roverImg.height*roverImgScale/2) - 10) + playerPosOffset.y + (Math.sin(millisOnLastFrame/500)*5)),Math.trunc(roverImg.width*roverImgScale),Math.trunc(roverImg.height*roverImgScale));
}
function updateRadarVisableTiles(){
    var radarTiles = tiles.filter(t => t.building.type == "RADAR");
    tiles.forEach(t => t.isVisible = radarTiles.some(r => Math.abs(r.x - t.x) <= radarRange));
}
function drawLogo(x,y,size){
    ctx.save();
    ctx.translate(x,y);
    ctx.strokeStyle = "#A2A2A2";
    ctx.beginPath();
    ctx.moveTo(0, -size/2);
    ctx.lineTo(-size/2,size/2);
    ctx.lineTo(size/2,size/2);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.arc(0, -size/2, size/4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "#FFF500";
    ctx.beginPath();
    ctx.arc(-size/2,size/2, size/4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "#0045FF";
    ctx.beginPath();
    ctx.arc(size/2,size/2, size/4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}
function drawBattery(x,y,size,percentage){
    var width = size * 0.25;
    var p = Math.min(1,percentage);
    ctx.save();
    ctx.translate(x,y);
    ctx.fillStyle = new Colour(255 - (255 * p),255 * p,0,255).toHex();
    ctx.fillRect(0,-size * p,width,size * p);
    ctx.strokeStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.moveTo(0,-size);
    ctx.lineTo(width,-size);
    ctx.lineTo(width,0);
    ctx.lineTo(0,0);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}
function updatePlayerPos(deltaX,deltaY){
    interactTimer = 0;
    var playerTile = tiles.find(t => t.hasPlayer);
        var newTile = tiles.find(t => t.x == playerTile.x + deltaX && t.y == playerTile.y + deltaY);
        if(newTile != null){
            if(newTile.isVisible){
                if(Math.abs(newTile.height - playerTile.height) <= maxStepHeight * tileStepHeight){
                    playerTile.hasPlayer = false;
                    newTile.hasPlayer = true;
                    playerPos = {x:newTile.x,y:newTile.y};
                    playerPosOffset = {x:playerTile.screenPos.x - newTile.screenPos.x,y:playerTile.screenPos.y - newTile.screenPos.y};
                    s([soundFxVolume,.1,440,,,.07,,,,,50,.07]);
                } else {
                    messages.push({text:"Incline too steep",time:0});
                }
            } else {
                messages.push({text:"Cannot enter unfound tile",time:0});
            }
        }
}
function mineTile(tile){
        if(tile.resource.value == 1){
            tile.resource = {type:"NONE"};
        } 
        else {
            tile.resource.value -= 1;
            tile.resource.lines = generateResourcePoints(tile.resource.value,tile.resource.type);
        }
        return {type:tile.resource.type,value:1};
}
function placeBuilding(tile,building){
        tile.building.type = building.type;
        var tb = tile.building;
        switch(building.type){
            case "RADAR":
                updateRadarVisableTiles();
                break;
            case "CONSTRUCTOR":
                tb.energy = 0;
                tb.maxEnergy = 20;
                tb.crafting = false;
                tb.timer = 0;
                tb.storedProduct = false;
                break;
            case "MINER":
                tb.storedResource = 0;
                tb.storedType = tile.resource.type;
                tb.maxStored = 50;
                tb.energy = 0;
                tb.maxEnergy = 10;
                tb.mining = false;
                tb.timer = 0;
                break;
            case "BATTERY":
                tb.energy = 0;
                tb.maxEnergy = 20;
                tb.timer = 0;
                tb.discharging = false;
                break;
            case "GENERATOR":
                tb.coal = 0;
                tb.maxCoal = 25;
                tb.timer = 0;
                tb.generating = false;
                break;
        }
        building.value -= 1;
        s([soundFxVolume,,191,,,.07,1,1.09,-5.4,,,,,.4,-0.4,.3,,.7]);
}
function removeBuilding(tile){
        switch(tile.building.type){
            case "RADAR":
                var playerTile = tiles.find(t => t.hasPlayer);
                if(tiles.filter(t => Math.abs(t.x - playerTile.x) <= radarRange && t.building.type == "RADAR" && t != tile).length == 0){
                    messages.push({text:"No other radar in range",time:0});
                    return;
                }
                addToPlayerBuildings(tile.building.type,1);
                tile.building = {type:"NONE"};
                updateRadarVisableTiles();
                break;
            case "CONSTRUCTOR":
                if(tile.building.storedProduct == true){
                    addToPlayerBuildings(tile.building.recipe.product,1);
                }
                addToPlayerBuildings(tile.building.type,1);
                break;
            case "GENERATOR":
                addToPlayerResources("CARBON",tile.building.coal);
                addToPlayerBuildings(tile.building.type,1);
                break;
            default:
                addToPlayerBuildings(tile.building.type,1);
                break;
        }
        tile.building = {type:"NONE"};
        s([soundFxVolume,,400,,,.07,1,1.09,-5.4,,,,,.4,-0.4,.3,,.7]);
}

function addToPlayerResources(type,ammount){
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
    playerBuild != null ? playerBuild.value += ammount : playerBuildings.push({type:type,value:ammount});
}

function drawHexagon(pos){
    ctx.beginPath();
    ctx.moveTo(pos.x + tileRadius * offsets[0].x,pos.y + tileRadius * offsets[0].y * perspRatio);
    offsets.slice(1, offsets.length).forEach(o => ctx.lineTo(pos.x + tileRadius * o.x,pos.y + tileRadius * o.y * perspRatio))
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function componentToHex(c) {
    var hex = Math.trunc(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b, a) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b) + componentToHex(a);
  }

  function generateHudOverlay(rightHeight){
    var points = [];
    points.unshift({x:0,y:canH * 0.29});
    points.unshift({x:canW * 0.09,y:canH * 0.29});
    points.unshift({x:canW * 0.1,y:canH * 0.27});
    points.unshift({x:canW * 0.1,y:0});
    points.unshift({x:0,y:0});

    points.unshift({x:0,y:canH * 0.48});
    points.unshift({x:canW * 0.09,y:canH * 0.48});
    points.unshift({x:canW * 0.1,y:canH * 0.46 - 0.02});
    points.unshift({x:canW * 0.1,y:canH * 0.29});
    points.unshift({x:0,y:canH * 0.29});
    points.unshift({x:0,y:0});

    points.unshift({x:canW * 0.39,y:0});
    points.unshift({x:canW * 0.42,y:canH * 0.04});
    points.unshift({x:canW * 0.58,y:canH * 0.04});
    points.unshift({x:canW * 0.61,y:0});

    points.unshift({x:canW * 0.83,y:0});
    points.unshift({x:canW * 0.83,y:rightHeight - canH * 0.02});
    points.unshift({x:canW * 0.85,y:rightHeight});
    points.unshift({x:canW,y:rightHeight});
    points.unshift({x:canW,y:0});
    points.unshift({x:0,y:0});
    return points;
  }

  function generateUIOverlay(height,length,width){
      var cornerLength = 0.04;
      var rightX = 1 - width;
      ctx.beginPath();
      ctx.moveTo(canW * (width + cornerLength),canH * height);
      ctx.lineTo(canW * (rightX - cornerLength),canH * height);
      ctx.lineTo(canW * (rightX),canH * (height + cornerLength));
      ctx.lineTo(canW * (rightX),canH * ((height + length) - cornerLength));
      ctx.lineTo(canW * (rightX - cornerLength),canH * (height + length));
      ctx.lineTo(canW * (width + cornerLength),canH * (height + length));
      ctx.lineTo(canW * (width),canH * (height + length - cornerLength));
      ctx.lineTo(canW * (width),canH * (height + cornerLength));
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      var sizeOffset = 0.02;
      var height2 = height + sizeOffset;
      var length2 = length - sizeOffset * 2;
      ctx.beginPath();
      ctx.moveTo(canW * (width + sizeOffset + cornerLength),canH * height2);
      ctx.lineTo(canW * (rightX - sizeOffset - cornerLength),canH * height2);
      ctx.lineTo(canW * (rightX - sizeOffset),canH * (height2 + cornerLength));
      ctx.lineTo(canW * (rightX - sizeOffset),canH * ((height2 + length2) - cornerLength));
      ctx.lineTo(canW * (rightX - sizeOffset - cornerLength),canH * (height2 + length2));
      ctx.lineTo(canW * (width + sizeOffset + cornerLength),canH * (height2 + length2));
      ctx.lineTo(canW * (width + sizeOffset),canH * (height2 + length2 - cornerLength));
      ctx.lineTo(canW * (width + sizeOffset),canH * (height2 + cornerLength));
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
  }

  function getSurroundingTiles(tile){
      return tiles.filter(t => {
        var yDelta = t.y - tile.y;
        var xDelta = t.x - tile.x;
        return (Math.abs(yDelta) == 1 && xDelta == 0) || (yDelta == 0 && Math.abs(xDelta) == 1) || (tile.x % 2 == 0 && yDelta == -1 && Math.abs(xDelta) == 1) || (tile.x % 2 != 0 && yDelta == 1 && Math.abs(xDelta) == 1);
      });
  }

  function generateResourcePoints(value,type){
    var points = 5 + Math.trunc(Math.random() * 5);
    var size = value/20;
    var xOffset = (Math.random() - 0.5) * (tileRadius*0.2) * size;
    var yOffset = (Math.random() - 0.5) * (tileRadius*0.2) * size;
    var lines = [];
    for(var i = 0; i < points;i++){
        var a = (i * ((Math.PI*2)/points));
        lines.unshift({x:Math.max(-tileRadius * 0.6 + 5,Math.min(tileRadius * 0.6 - 5,xOffset + (Math.cos(a) * size * tileRadius + (Math.random() * 15 * size)))),y:Math.max(-tileRadius * perspRatio + 5,Math.min(tileRadius * perspRatio - 5,yOffset + (Math.sin(a) * size * (tileRadius*perspRatio) + (Math.random() * 15 * size * perspRatio))))});
    }
    return lines;
  }

  function generateMap(width,colours,startX){

    tiles = getArr(width).flatMap(x => getArr(5).map(y => new Tile(x,y)));
    tiles.forEach(t => {
        var heightNumber = Math.max(0,Math.min(10,Math.trunc(Math.abs((perlin2(t.x/10, t.y/10)+1)/2 * 10))));
        t.height = tileStepHeight * heightNumber;
        t.colour = colours.find(c => c.levels.includes(heightNumber)).colour.darkend(1 - (Math.random() - 0.5)/3);

        if(Math.abs(startX - t.x) > (width * 0.005) && Math.random() > 0.85){
            addResourceToTile(t,"IRON",Math.random() * 15,10,0.4);
        } else if(Math.abs(startX - t.x) > (width * 0.05) && Math.random() > 0.90) {
           addResourceToTile(t,"COPPER",Math.random() * 15,10,0.5);
        } else if(Math.abs(startX - t.x) > (width * 0.08) && Math.random() > 0.92) {
            addResourceToTile(t,"CARBON",Math.random() * 15,10,0.6);
        } else if(Math.abs(startX - t.x) > (width * 0.12) && Math.random() > 0.96) {
            addResourceToTile(t,"LITHIUM",Math.random() * 15,10,0.6);
        } else if(Math.abs(startX - t.x) > (width * 0.14) && Math.random() > 0.85) {
            addResourceToTile(t,"SILICON",Math.random() * 15,10,0.5);
        } else if(Math.abs(startX - t.x) > (width * 0.24) && Math.random() > 0.85) {
            addResourceToTile(t,"PLUTONIUM",Math.random() * 15,10,0.7);
            addHazardToTile(t,4);
        } else if(Math.random() > 0.88) {
            addResourceToTile(t,"ROCK",Math.random() * 15,10,0.9);
        }
        if(Math.abs(startX - t.x) > (width * 0.16) && Math.random() > 0.95){
            addHazardToTile(t,Math.random() * 5);
        }
    });
    tiles.find(t => t.x == startX).hasPlayer = true;
    tiles.filter(t => t.resource.type != "NONE").forEach(t => t.resource.lines = generateResourcePoints(t.resource.value,t.resource.type));
  }

function addResourceToTile(tile,type,ammount,minimum,expansion) {
    tile.resource = {type:type,value:Math.max(minimum,Math.trunc(ammount))};
    getSurroundingTiles(tile).filter(t => Math.random() > expansion).forEach(t => t.resource = {type:type,value:Math.max(5,Math.trunc(tile.resource.value * Math.random()))});
  }

  function addHazardToTile(tile,ammount) {
    tile.hazard = ammount;
    getSurroundingTiles(tile).forEach(t => t.hazard = ammount * 0.8);
  }

//Source
var menuItems = ["Resume","Main Menu","Save Game","Load Game","Mute Music","Mute Sound FX"];
var selectedMenuItem = 0;

var mainMenuItems = ["New Game","Load Game","Mute Music","Mute Sound FX"];
var mainMenu = true;

var soundFxVolume = 0;
var confirmSound = () => zzfx(...[soundFxVolume,.01,593,,.03,0,1,2.04,.1,.1,50,.01,,-0.1,,,.06,.96,.08]).start();
var denySound = () => zzfx(...[soundFxVolume,0,604,,,.13,4,2.01,-0.1,.2,50,,.01,,,.4,.05,.68,.05]).start();

var startRecipes = [{product:"EXIT",items:[],energy:0},{product:"RADAR",items:[{type:"IRON",value:18}],energy:8}];
var resPrices = [{type:"ROCK",price:1,},
                 {type:"IRON",price:5,},
                 {type:"COPPER",price:25,},
                 {type:"CARBON",price:50,},
                 {type:"LITHIUM",price:75},
                 {type:"SILICON",price:100},
                 {type:"PLUTONIUM",price:200}];

var prices = getArr(21).map(i => {
    var thirds = Math.trunc(i/3);
    var p = resPrices[thirds];
    return {type:p.type,price:p.price,ammount:[1,10,50][i - thirds*3]};
});
prices.unshift({type:"EXIT",price:0,ammount:0});

var shopItemsStart = [{type:"EXIT",item:"EXIT",cost:0,costMulti:0,desc:[]},
                 {type:"CRAFT UPGRADES",item:"RESOURCE STORAGE",cost:350,costMulti:2,desc:["Increases JMC™ Craft resource","capacity by 20%"]},
                 {type:"CRAFT UPGRADES",item:"BATTERY EFFICENCY",cost:200,costMulti:1.6,desc:["Increases JMC™ Craft battery capacity","by 25%"]},
                 {type:"CRAFT UPGRADES",item:"CRAFT HEIGHT TOLERANCE",cost:350,costMulti:1.5,desc:["Allows JMC™ Craft to","move between tiles","with a larger height","difference."]},

                 {type:"RECIPES",item:"CONSTRUCTOR",cost:500,desc:["Adds JMC™ Constructor to","Constructor Database.","Constructors manufacture other","JMC™ Buildings."]},
                 {type:"RECIPES",item:"MINER",cost:750,desc:["Adds JMC™ Miner to Constructor","Database.","JMC™ Miners use energy to","gather resources 5 times","more efficent than","the JMC™ Craft"]},
                 {type:"RECIPES",item:"GENERATOR",cost:1025,desc:["Adds JMC™ Generator to Constructor","Database.","JMC™ Generators create energy from","carbon."]},
                 {type:"RECIPES",item:"SOLAR",cost:1250,desc:["Adds JMC™ Solar Panel to","Constructor Database.","JMC™ Solar Panels generate","fluctuating energy."]},
                 {type:"RECIPES",item:"BATTERY",cost:1650,desc:["Adds JMC™ Battery to","Constructor Database.","JMC™ Batteries store","energy and release it","periodically."]},
                 {type:"RECIPES",item:"RTG",cost:2500,desc:["Adds JMC™ RTG to","Constructor Database.","JMC™ RTGs generate","constant energy."]},

                 {type:"BUILDING UPGRADES",item:"RADAR RADIUS",cost:1000,costMulti:1.5,desc:["Increases JMC™ Radar uncover","distance by 3 tiles."]},
                 {type:"BUILDING UPGRADES",item:"CONSTRUCTOR SPEED",cost:200,costMulti:1.8,desc:["Increases JMC™ Constructor speed","by 30%"]},
                 {type:"BUILDING UPGRADES",item:"CONSTRUCTOR TRANSMITTER",cost:1850,desc:["JMC™ Constructor transmits","finished constructions to","JMC™ Craft."]},
                 {type:"BUILDING UPGRADES",item:"MINER SPEED",cost:750,desc:["Increases JMC™ Miner speed","by 50%"]},
                 {type:"BUILDING UPGRADES",item:"MINER TRANSMITTER",cost:1985,desc:["JMC™ Miner transmits","mined resources to","JMC™ Craft."]},
                 {type:"BUILDING UPGRADES",item:"RTG OUTPUT",cost:250,costMulti:1.8,desc:["Increases JMC™ RTG output","by 1."]},
                 {type:"BUILDING UPGRADES",item:"SOLAR OUTPUT",cost:750,costMulti:1.4,desc:["Increases JMC™ Solar Panel output","by 1."]},
                 {type:"BUILDING UPGRADES",item:"GENERATOR OUTPUT",cost:500,costMulti:2,desc:["Increases JMC™ Generator output","by 1."]}];

var shopItems = shopItemsStart.slice();
var recipes = startRecipes.slice();

var playerPos = {x:0,y:0};
var playerSpeed = 1;
var playerEnergy = 50;
var prevPlayerEnergy = 50;
var playerDeadState = false;

var playerBalance;
var playerBalanceDisplayed = 0;

var quotas = [500,1000,2000,5000,10000,20000,50000];
var failedQuota = false;
var finishedQuotas = false;

var canW = 1280;
var canH = 720;

canvas.width = canW;
canvas.height = canH;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";

var prevInputs = {up:false,down:false,left:false,right:false,inter:false,build:false,remove:false,esc:false,speve:false};
var inputs = {up:false,down:false,left:false,right:false,inter:false,build:false,remove:false,esc:false,speve:false};

var playerPosOffset = {x:0,y:0};

var tiles = [];
var messages = [];
var selectedSell = 0;
var selectedSellDisplayPrice = 0;
var selectedBuy = 0;

var playerResources;
var playerBuildings;
var selectedBuilding = 0;

//Modes
var buildMode = false;
var settingRecipe = false;
var escMenu = false;
var selectingSell = false;
var buyingMode = false;

var endlessMode = false;

//Player Upgrades:
var playerMaxEnergy;
var maxStepHeight;
var maxStorage;

//Building Upgrades:
var solarOutput;
var craftSpeed;
var mineSpeed;
var minerTransmit;
var constructorTransmit;
var batteryDischarge;
var RTGOutput;
var generatorOutput;
var radarRange;

var time;
var sols;

var hudFlashTimer = 0;
var hudFlash = false;
var hudSwap = false;

var interactTimer = 0;
var interactTimerSpeed = 1;

var batteryStatusMessage = "Nominal";

let mySongData = zzfxM(...song);
let myAudioNode = zzfxP(...mySongData);
myAudioNode.loop = true;
myAudioNode.start();

var stars = Array.from(Array(500).keys()).map(i => {return {x:(Math.random() * 2 * canW) - canW,y:(Math.random() * 2 * canH) - canH,r:Math.random() * 3}});

seed(Math.random());

var mapWidth = 500;
var otherColourScheme = [{levels:[0,1,2],colour:new Colour(62, 47, 91,255)},{levels:[3,4],colour:new Colour(190, 184, 235,255)},{levels:[5,6,7],colour:new Colour(64, 121, 140,255)},{levels:[8,9,10],colour:new Colour(115, 251, 211,255)}];
var spawnX = 240;

var runGameBool = false;
var runIntro = false;
var textScroll = false;
var sentanceCounter = 0;

var fT = (s,x,y) => ctx.fillText(s, x, y);

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
    millisOnLastFrame = new Date().getTime();
}

function intro(){
    ctx.strokeStyle = "#FFFFFF";
    ctx.fillStyle = "#000000AA";
    generateUIOverlay(0.02,0.9,0.1);

    var textX = canW * 0.13;
    var textY = canH * 0.11;
    ctx.font = "22px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#000000";
    ctx.textAlign = "start"; 
    ctx.textBaseline = "alphabetic";
    fT("Welcome, valued Roboemployee, to the JMC™ Autonomous Mining Initative.", textX,textY);
    fT("Over the course of the next 7 solar rotations your mining effectiveness will be assesed by", textX,50 + textY);
    fT("your ability to meet daily monetary quotas.", textX,75 + textY);

    fT("Quotas can be met by ", textX,100 + textY);
    var xOff = ctx.measureText("Quotas can be met by ").width;
    ctx.fillStyle = "#00FF00";
    fT("Mining (E/Space)", textX + xOff,100 + textY);
    xOff = xOff + ctx.measureText("Mining (E/Space)").width;
    ctx.fillStyle = "#FFFFFF";
    fT(" and selling resources to the TELEDEPOT.", textX+xOff,100 + textY);

    fT("Failure to complete these quotas will result in immediate nuclear vapourisation.", textX,150 + textY);
    fT("JMC™ Operations & Managment regrets to inform you that terrain maps", textX,200 + textY);
    fT("for JMC™ Planet 404 have been lost, you are required to use your", textX,225 + textY);

    fT("JMC™ Craft's ", textX,250 + textY);
    xOff = ctx.measureText("JMC™ Craft's ").width;
    ctx.fillStyle = "#00FF00";
    fT("Build (B) & Remove (R)", textX + xOff,250 + textY);
    xOff = xOff + ctx.measureText("Build (B) & Remove (R)").width;
    ctx.fillStyle = "#FFFFFF";
    fT(" functionality to place RADARs and uncover more terrain.", textX+xOff,250 + textY);

    fT("The CONSTRUCTOR creates buildings, such as extra RADARs, from resources and energy.", textX,300 + textY);
    fT("Your JMC™ Craft has a limited battery capacity, failure to charge the battery", textX,325 + textY);
    fT("will result in loss of resources and buildings in possesion.", textX,350 + textY);
    fT("An RTG has been made available to provide energy and charge your JMC™ Craft.", textX,375 + textY);
    fT("A ROBOSHOP has been made available for you to purchase upgrades to aid effectiveness.", textX,400 + textY);

    ctx.textAlign = "center";
    fT("WASD to move, left shift to sprint, E/Space to interact.", canW/2,450 + textY);

    fT("Good Luck.", canW/2,canH * 0.82);
    fT("Press E/Space to start",canW/2,25 + canH * 0.85);
    if(inputs.inter == true && prevInputs.inter == false){
        runIntro = false;
        runGameBool = true;
    }
}

function handleMainMenu(){
    ctx.fillStyle = "#FFFFF0";
    ctx.save();
    ctx.translate(canW/2,canH/2);
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
    fT("Planet 404",canW/2,canH*0.1);

    if(inputs.up == true && prevInputs.up == false){
        selectedMenuItem = Math.max(0,selectedMenuItem - 1);
        s([]);
    }
    if(inputs.down == true && prevInputs.down == false){
        selectedMenuItem = Math.min(mainMenuItems.length - 1,selectedMenuItem + 1);
        s([]);
    }
    if(inputs.inter == true && prevInputs.inter == false){
        switch(mainMenuItems[selectedMenuItem]){
            case "New Game":
                initGame();
                soundFxVolume = 0.5;
                mainMenu = false;
                selectedMenuItem = 0;
                runIntro = true;
                break;
            case "Load Game":
                if(window.localStorage.has('Planet404_6473_DATA') != null){
                    loadGame();
                    soundFxVolume = 0.5;
                    runGameBool = true;
                    mainMenu = false;
                    selectedMenuItem = 0;
                }
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
            ctx.drawImage(roverImg, Math.trunc((canW * 0.45) - (textLength * 0.5) - (roverImg.width * 0.5)), Math.trunc(canH * 0.3 + (80 * index) - (roverImg.height * 0.5)));
            ctx.drawImage(roverImg, Math.trunc((canW * 0.55) + (textLength * 0.5) - (roverImg.width * 0.5)), Math.trunc(canH * 0.3 + (80 * index) - (roverImg.height * 0.5)));
            ctx.fillStyle = "#FFFFFF";
        } else {
            ctx.fillStyle = "#AAAAAA";
        }
        fT(i,canW*0.5,canH * 0.3 + (80 * index));
    });

}

//Waypoint
function initGame(){
    //Generate Terrain
    generateMap(mapWidth,otherColourScheme,spawnX);
    updatePlayerPos(0,0);
    //Reset variables
    playerBuildings = [{type:"RADAR",value:1}];
    playerResources = [];
    playerBalance = 0;
    recipes = startRecipes.slice();
    shopItems = shopItemsStart.slice();
    endlessMode = false;

    playerMaxEnergy = 50;
    playerEnergy = playerMaxEnergy;
    maxStepHeight = 1;
    maxStorage = 50;

    solarOutput = 1;
    craftSpeed = 1;
    mineSpeed = 3;
    minerTransmit = false;
    constructorTransmit = false;
    batteryDischarge = 2.5;
    RTGOutput = 5;
    generatorOutput = 2;
    radarRange = 6;

    time = 0;
    sols = 0;

    failedQuota = false;

    prevInputs = {up:false,down:false,left:false,right:false,inter:false,build:false,remove:false,info:false,esc:false,speve:false};
    inputs = {up:false,down:false,left:false,right:false,inter:false,build:false,remove:false,info:false,esc:false,speve:false};

    //Place start buildings
    placeBuilding(tiles.find(t => t.x == spawnX && t.y == 2),{type:"RADAR",value:1});
    placeBuilding(tiles.find(t => t.x == spawnX && t.y == 0),{type:"RTG",value:1});
    placeBuilding(tiles.find(t => t.x == spawnX - 1 && t.y == 0),{type:"CONSTRUCTOR",value:1});
    placeBuilding(tiles.find(t => t.x == spawnX + 3 && t.y == 2),{type:"TELEDEPOT",value:1});
    placeBuilding(tiles.find(t => t.x == spawnX - 3 && t.y == 1),{type:"ROBOSHOP",value:1});
}

function runGame(){
    ctx.fillStyle = "#FFFFF0";
    ctx.save();
    ctx.translate(canW/2,canH/2);
    ctx.rotate((Math.PI/180) * ((sols * 360) + time));
    stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x,s.y,s.r,0, 2 * Math.PI);
        ctx.fill();
    });
    ctx.restore();
    
    renderMap(canH * 0.71,playerPosOffset);


    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center"; 
    if(escMenu && !playerDeadState && !failedQuota){
        ctx.textBaseline = "middle";
        ctx.font = "45px Tahoma";
        fT("Paused",canW/2,30);
        ctx.font = "35px Tahoma";
        menuItems.forEach(i => {
            var index = menuItems.indexOf(i);
            if(selectedMenuItem == index){
                var textLength = ctx.measureText(i).width;
                ctx.drawImage(roverImg, Math.trunc((canW * 0.45) - (textLength * 0.5) - (roverImg.width * 0.5)), Math.trunc(canH * 0.15 + (50 * index) - (roverImg.height * 0.5)));
                ctx.drawImage(roverImg, Math.trunc((canW * 0.55) + (textLength * 0.5) - (roverImg.width * 0.5)), Math.trunc(canH * 0.15 + (50 * index) - (roverImg.height * 0.5)));
                ctx.fillStyle = "#FFFFFF";
            } else {
                ctx.fillStyle = "#AAAAAA";
            }
            fT(i,canW*0.5,canH * 0.15 + (50 * index));
        });
        handleMenuInput();
    } else if(!playerDeadState && !failedQuota && !finishedQuotas) {
        //Tile updates
        tiles.filter(t => t.isVisible && t.building.type != "NONE").forEach(t => handleTileUpdates(t));
        
        playerPosOffset.x = lerp(playerPosOffset.x,0,(frameSpeedFactor/150) * playerSpeed);
        playerPosOffset.y = lerp(playerPosOffset.y,0,(frameSpeedFactor/150) * playerSpeed);
        if(inputs.speve == true && prevInputs.speve == false){
            playerSpeed = 1.8;
        } else if(inputs.speve == false && prevInputs.speve == true){
            playerSpeed = 1;
        }

        playerResources = playerResources.filter(r => r.value > 0);
        selectedSell = Math.min(prices.filter(p => playerResources.some(r => p.type == r.type && r.value >= p.ammount) || p.type == "EXIT").length - 1,selectedSell);
        playerBuildings = playerBuildings.filter(b => b.value > 0);
        selectedBuy = Math.min(shopItems.length - 1,selectedBuy);
    
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
            playerEnergy -= (1 + playerTile.hazard) * (frameSpeedFactor/1000);
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
        fT("You Died",canW/2,canH * 0.2);
        if(roverImgScale < 0.4){
            fT("Press E/Space to respawn",canW/2,canH * 0.3);
            if(inputs.inter == true && prevInputs.inter == false){
                playerEnergy = playerMaxEnergy;
                playerResources = [];
                playerBuildings = [];
                tiles.find(t => t.hasPlayer).hasPlayer = false;
                tiles.find(t => t.x == spawnX).hasPlayer = true;
                updatePlayerPos(0,0);
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
        fT("Quota Failed",canW/2,canH * 0.2);
        tiles.forEach(t => t.hazard = Math.min(6, t.hazard + (frameSpeedFactor/800)));
        if(roverImgScale < 0.4){
            fT("Press E to return to main menu",canW/2,canH * 0.3);
            if(inputs.inter == true && prevInputs.inter == false){
                mainMenu = true;
                escMenu = false;
                runGameBool = false;
                failedQuota = false;
                roverImgScale = 1;
            }
        }
        if(roverImgScale > 0.8){
            ctx.fillStyle = "#FFFFFF" + componentToHex(255 - (255 * ((1 - roverImgScale)/0.2)));
            ctx.beginPath();
            ctx.arc(canW/2, canH/2, canW * ((1 - roverImgScale)/0.2), 0, 2 * Math.PI);
            ctx.fill();
        } else {
            ctx.fillStyle = "#FFFFFF" + componentToHex((255 * (roverImgScale/0.8)));
            ctx.fillRect(0,0,canW, canH);
        }
        
    } else if(finishedQuotas){
        ctx.strokeStyle = "#FFFFFF";
        ctx.fillStyle = "#000000A";
        generateUIOverlay(0.05,0.5,0.2);

        var textX = canW/2 * 0.45;

        ctx.font = "20px Arial";
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#000000";
        ctx.textAlign = "start"; 
        ctx.textBaseline = "alphabetic";
        fT("Congratulations, you have completed all JMC™ Mining Initative quotas.", textX,canH * 0.2);
        fT("Due to the costs of JMC™ Craft recovery, you have been offered an", textX,25 + canH * 0.2);
        fT("involutary position as cheif of planetary excavations and are forbidden", textX,50 + canH * 0.2);
        fT("from leaving this planet.", textX,75 + canH * 0.2);

        ctx.textAlign = "center";
        fT("Thanks for playing!", canW/2,canH * 0.45);
        if(time >= 1.5){
            fT("Press E to enter endless mode",canW/2,25 + canH * 0.45);
            if(inputs.inter == true && prevInputs.inter == false){
                endlessMode = true;
                finishedQuotas = false;
            }
        }
    }

    if(playerEnergy <= 0 && !playerDeadState){
        playerDeadState = true;
        s([soundFxVolume,,160,.01,.2,.04,2,,-0.1,.1,-100,.1]);
    }
    prevPlayerEnergy = playerEnergy;
    if(!playerDeadState){
        time += (frameSpeedFactor/1500);
    }
    if(time >= 359){
        if(playerBalance >= quotas[sols] && !(finishedQuotas || endlessMode)){
            playerBalance -= quotas[sols];
            if(sols == quotas.length - 1){
                finishedQuotas = true;
                s([soundFxVolume,0,220,,2,.08,1.5,,,,50,.07,.1,,,,.01]);
            } else {
                s([soundFxVolume,0,160,,1,.04,2,,,,25,.07,.03,,,,.01]);
            }
        } else if(!(finishedQuotas || endlessMode || failedQuota)){
            failedQuota = true;
            s([soundFxVolume,,299,.01,.03,1.95,3,.1,.9,.6,,,,.5,.9,.6,,.52,.06]);
            s([soundFxVolume,0,160,,1.25,.04,2,,,,-25,.25,.01,,,,.01]);
        }
        sols += 1;
    }
    time = time >= 359 ? 0 : time;
}

function handleInput(){
    if(inputs.up == true && prevInputs.up == false && !buildMode && !settingRecipe && !escMenu && !selectingSell && !buyingMode && Math.abs(playerPosOffset.y) < 10){
        updatePlayerPos(0,-1);
    }
    if(inputs.down == true && prevInputs.down == false && !buildMode && !settingRecipe && !escMenu && !selectingSell && !buyingMode && Math.abs(playerPosOffset.y) < 10){
        updatePlayerPos(0,1);
    }
    if(inputs.up == true && prevInputs.up == true && !buildMode && !settingRecipe && !escMenu && !selectingSell && !buyingMode && Math.abs(playerPosOffset.y) < 10){
        updatePlayerPos(0,-1);
    }
    if(inputs.down == true && prevInputs.down == true && !buildMode && !settingRecipe && !escMenu && !selectingSell && !buyingMode && Math.abs(playerPosOffset.y) < 10){
        updatePlayerPos(0,1);
    }
    if(inputs.up == true && prevInputs.up == false && buildMode){
        selectedBuilding = Math.max(0,selectedBuilding - 1);
        s([]);
    }
    if(inputs.down == true && prevInputs.down == false && buildMode){
        selectedBuilding = Math.max(0,Math.min(playerBuildings.length - 1,selectedBuilding + 1));
        s([]);
    }
    if(inputs.up == true && prevInputs.up == false && settingRecipe){
        selectedBuilding = Math.max(0,selectedBuilding - 1);
        s([]);
    }
    if(inputs.down == true && prevInputs.down == false && settingRecipe){
        selectedBuilding = Math.max(0,Math.min(recipes.length - 1,selectedBuilding + 1));
        s([]);
    }
    if(inputs.up == true && prevInputs.up == false && selectingSell){
        interactTimer = 0;
        selectedSell = Math.max(0,selectedSell - 1);
        s([]);
    }
    if(inputs.down == true && prevInputs.down == false && selectingSell){
        interactTimer = 0;
        selectedSell = Math.min(prices.filter(p => playerResources.some(r => p.type == r.type && r.value >= p.ammount) || p.type == "EXIT").length - 1,selectedSell + 1);
        s([]);
    }
    if(inputs.up == true && prevInputs.up == false && buyingMode){
        interactTimer = 0;
        selectedBuy= Math.max(0,selectedBuy - 1);
        s([]);
    }
    if(inputs.down == true && prevInputs.down == false && buyingMode){
        interactTimer = 0;
        selectedBuy = Math.min(shopItems.length - 1,selectedBuy + 1);
        s([]);
    }

    if(inputs.up == true && prevInputs.up == true && selectingSell){
        if(interactTimer >= 1){
            selectedSell = Math.max(0,selectedSell - 1);
            interactTimer = 0;
            s([]);
        } else {
            interactTimer += (frameSpeedFactor/100);
        }
    }
    if(inputs.down == true && prevInputs.down == true && selectingSell){
        if(interactTimer >= 1){
            selectedSell = Math.min(prices.filter(p => playerResources.some(r => p.type == r.type && r.value >= p.ammount) || p.type == "EXIT").length - 1,selectedSell + 1);
            interactTimer = 0;
            s([]);
        } else {
            interactTimer += (frameSpeedFactor/100);
        }
    }
    if(inputs.up == true && prevInputs.up == true && buyingMode){
        if(interactTimer >= 1){
            selectedBuy= Math.max(0,selectedBuy - 1);
            interactTimer = 0;
            s([]);
        } else {
            interactTimer += (frameSpeedFactor/100);
        }
    }
    if(inputs.down == true && prevInputs.down == true && buyingMode){
        if(interactTimer >= 1){
            selectedBuy = Math.min(shopItems.length - 1,selectedBuy + 1);
            interactTimer = 0;
            s([]);
        } else {
            interactTimer += (frameSpeedFactor/100);
        }
    }


    if(inputs.right == true && prevInputs.right == false && !buildMode && !escMenu && !selectingSell && !buyingMode && Math.abs(playerPosOffset.x) < 10){
        updatePlayerPos(1,0);
    }
    if(inputs.left == true && prevInputs.left == false && !buildMode && !escMenu && !selectingSell && !buyingMode && Math.abs(playerPosOffset.x) < 10){
        updatePlayerPos(-1,0);
    }
    if(inputs.right == true && prevInputs.right == true && !buildMode && !escMenu && !selectingSell && !buyingMode && Math.abs(playerPosOffset.x) < 10){
        updatePlayerPos(1,0);
    }
    if(inputs.left == true && prevInputs.left == true && !buildMode && !escMenu && !selectingSell && !buyingMode && Math.abs(playerPosOffset.x) < 10){
        updatePlayerPos(-1,0);
    }

    if(inputs.inter == true && prevInputs.inter == false && !buildMode && !escMenu){
        interactTimerSpeed = 1;
        interactTimer = 0;
        var playerTile = tiles.find(t => t.hasPlayer);
        if(playerTile.building.type != "NONE"){
            handleBuildingInteraction(playerTile);
        } else {
            if(playerTile.resource.type != "NONE"){
                if(addToPlayerResources(playerTile.resource.type,1) > 0){
                    mineTile(playerTile);
                    s([soundFxVolume,0,320,.01,,0,4,.1,,,,,,,,.2,.01,0,.01]);
                } else {
                    messages.push({text:"Resource full",time:0});
                }
            }
        }
    }
    var playerTile = tiles.find(t => t.hasPlayer);
    if(inputs.inter == true && prevInputs.inter == true && !buildMode && !escMenu && interactTimer >= 1){
        interactTimer = 0;
        var playerTile = tiles.find(t => t.hasPlayer);
        if(playerTile.building.type != "NONE"){
            handleBuildingInteraction(playerTile);
        } else {
            if(playerTile.resource.type != "NONE"){
                if(addToPlayerResources(playerTile.resource.type,1) > 0){
                    mineTile(playerTile);
                    s([soundFxVolume,0,320,.01,,0,4,.1,,,,,,,,.2,.01,0,.01]);
                } else {
                    messages.push({text:"Resource full",time:0});
                }
            }
        }
    } else if(inputs.inter == true && prevInputs.inter == true && !buildMode && !escMenu){
            interactTimer += (frameSpeedFactor/100) * interactTimerSpeed;
    }

    //If B is pressed and not in any modes and player has buildings
    if(inputs.build == true && prevInputs.build == false && !buildMode && !settingRecipe && !escMenu && !selectingSell && !buyingMode){
        if(playerBuildings.length > 0){
            selectedBuilding = 0;
            buildMode = true;
        } else {
            messages.push({text:"No Buildings",time:0});
        }
    } else if(inputs.build == true && prevInputs.build == false && buildMode){
        buildMode = false;
    }

    var playerTile = tiles.find(t => t.hasPlayer);
    //If E is pressed and in build mode and empty spaces
    if(buildMode && inputs.inter == true && prevInputs.inter == false && tiles.some(t => t.hasPlayer && t.building.type == "NONE")){
        placeBuilding(playerTile ,playerBuildings[selectedBuilding]);
        playerBuildings = playerBuildings.filter(b => b.value > 0);
        buildMode = false;
        selectedBuilding = 0;
    }
    //If E is pressed and in remove mode and buildings
    if(inputs.remove == true && prevInputs.remove == false && tiles.some(t => t.hasPlayer && t.building.type != "NONE")){
        removeBuilding(playerTile);
    }
    if(inputs.esc == true && prevInputs.esc == false && (buildMode || selectingSell || buyingMode || settingRecipe)){
        buildMode = false;
        selectingSell = false;
        buyingMode = false;
        settingRecipe = false;

        selectedBuilding = 0;
        selectingSell = 0;
    } else if (inputs.esc == true && prevInputs.esc == false){
        escMenu = true;
    }
}

function handleMenuInput(){
    if(inputs.up == false && prevInputs.up == true){
        selectedMenuItem = Math.max(0,selectedMenuItem - 1);
        s([]);
    }
    if(inputs.down == false && prevInputs.down == true){
        selectedMenuItem = Math.min(menuItems.length - 1, selectedMenuItem + 1);
        s([]);
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
                break;
            case "Save Game":
                saveGame();
                messages.push({text:"Game Saved",time:0});
                escMenu = false;
                break;
            case "Load Game":
                if(window.localStorage.getItem('Planet404_6473_DATA') != null){
                    loadGame();
                } else {
                    messages.push({text:"Game Save not found",time:0});
                }
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

function saveGame(){
    window.localStorage.setItem('Planet404_6473_DATA', JSON.stringify([tiles,time,sols,playerResources,playerBuildings,playerBalance,playerEnergy,recipes,shopItems,
                                                          playerMaxEnergy,maxStepHeight,maxStorage,radarRange,solarOutput,craftSpeed,mineSpeed,minerTransmit,constructorTransmit,
                                                          batteryDischarge,RTGOutput,generatorOutput,endlessMode]));
}

function loadGame(){
    buildMode = false;
    selectingSell = false;
    buyingMode = false;
    settingRecipe = false;

    selectedBuilding = 0;
    selectingSell = 0;

    var data = JSON.parse(window.localStorage.getItem('Planet404_6473_DATA'));
    tiles = data[0];

    time = data[1];
    sols = data[2];

    playerResources = data[3];
    playerBuildings = data[4];
    playerBalance = data[5];
    playerEnergy = data[6];

    recipes = data[7];
    shopItems = data[8];

    playerMaxEnergy = data[9];;
    maxStepHeight = data[10];
    maxStorage = data[11];

    radarRange = data[12];
    solarOutput = data[13];
    craftSpeed = data[14];
    mineSpeed = data[15];
    minerTransmit = data[16];
    constructorTransmit = data[17];;
    batteryDischarge = data[18];
    RTGOutput = data[19];
    generatorOutput = data[20];
    endlessMode = data[21];
    updatePlayerPos(0,0);
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
                playerTile.building.timer = 0;
                confirmSound();
            } else if(playerTile.building.recipe == null){
                settingRecipe = true;
                selectedBuilding = 0;
            }
            break;
        case "MINER":
            if(!minerTransmit){
                if(playerTile.building.storedResource > 0) {
                    var added = addToPlayerResources(playerTile.building.storedType,playerTile.building.storedResource);
                    if(added == 0){
                        denySound();
                        messages.push({text:"Resource full" + added + playerTile.building.storedType,time:0});
                    } else {
                        playerTile.building.storedResource -= addToPlayerResources(playerTile.building.storedType,playerTile.building.storedResource);
                        messages.push({text:"Gained " + added + " " + playerTile.building.storedType,time:0});
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
                        s([soundFxVolume,.01,287,.11,,0,3,.01,,,198,.09,,,,,.06,.5]);
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
                                break;
                            case "BATTERY EFFICENCY":
                                playerMaxEnergy = Math.round(playerMaxEnergy * 1.25);
                                break;
                            case "CRAFT HEIGHT TOLERANCE":
                                maxStepHeight += 1;
                                break;

                            case "CONSTRUCTOR SPEED":
                                craftSpeed = craftSpeed * 1.3;
                                break;
                            case "CONSTRUCTOR TRANSMITTER":
                                constructorTransmit = true;
                                shopItems = shopItems.filter(i => i.item != "CONSTRUCTOR TRANSMITTER");
                                break;
                            case "MINER SPEED":
                                mineSpeed = mineSpeed * 1.5;
                                break;
                            case "MINER TRANSMITTER":
                                minerTransmit = true;
                                shopItems = shopItems.filter(i => i.item != "MINER TRANSMITTER");
                                break;
                            case "RTG OUTPUT":
                                RTGOutput += 1;
                                break;
                            case "SOALR OUTPUT":
                                solarOutput += 1;
                                break;
                            case "GENERATOR OUTPUT":
                                generatorOutput += 1;
                                break;
                            case "RADAR RADIUS":
                                radarRange += 3;
                                updateRadarVisableTiles();
                                break;

                            case "CONSTRUCTOR":
                                recipes.push({product:"CONSTRUCTOR",items:[{type:"IRON",value:10},{type:"COPPER",value:15}],energy:4});
                                shopItems = shopItems.filter(i => i.item != "CONSTRUCTOR");
                                break;
                            case "MINER":
                                recipes.push({product:"MINER",items:[{type:"IRON",value:10},{type:"COPPER",value:15},{type:"CARBON",value:8}],energy:4});
                                shopItems = shopItems.filter(i => i.item != "MINER");
                                break;
                            case "GENERATOR":
                                recipes.push({product:"GENERATOR",items:[{type:"IRON",value:20},{type:"COPPER",value:25},{type:"ROCK",value:15}],energy:5});
                                shopItems = shopItems.filter(i => i.item != "GENERATOR");
                                break;
                            case "BATTERY":
                                recipes.push({product:"BATTERY",items:[{type:"IRON",value:10},{type:"COPPER",value:10},{type:"LITHIUM",value:5}],energy:8});
                                shopItems = shopItems.filter(i => i.item != "BATTERY");
                                break;
                            case "SOLAR":
                                recipes.push({product:"SOLAR",items:[{type:"COPPER",value:5},{type:"SILICON",value:10}],energy:10});
                                shopItems = shopItems.filter(i => i.item != "SOLAR");
                                break;
                            case "RTG":
                                recipes.push({product:"RTG",items:[{type:"IRON",value:25},{type:"COPPER",value:25},{type:"PLUTONIUM",value:10}],energy:10});
                                shopItems = shopItems.filter(i => i.item != "RTG");
                                break;
                        }
                        if(shopItems[selectedBuy].costMulti != null){
                            shopItems[selectedBuy].cost = Math.round(shopItems[selectedBuy].cost * shopItems[selectedBuy].costMulti);
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
    var modeHeight = canH * 0.12;
    var selectionHeight = 40;
    var rightInfoHeight = 55;
    var rightInfoStep = 25;

    if(hudFlash){
        if(hudFlashTimer >= 1){
            s([soundFxVolume,0,500,.2,,0,1,.5,,,50,.12,,,,,,,.01]);
            hudSwap = !hudSwap;
            hudFlashTimer = 0;
        }
    } else {
        hudSwap = false;
    }

    ctx.strokeStyle = hudSwap ? "#FF0000" : "#FFFFFF";
    ctx.fillStyle = "#000000AA";
    var rightHeight = rightInfoHeight + (rightInfoStep * playerResources.length) + canH * 0.05;
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
    ctx.textAlign = "start"; 
    messages = messages.slice(-3,5);
    messages = messages.filter(m => m.time < 2000);
    var topHeight = messages.length * 25;
    messages.forEach(message => {
        fT(message.text,canW * 0.01,canH * 0.42 + (6 * 25) - topHeight + (messages.indexOf(message) * 25));
        message.time += frameSpeedFactor;
    });

    ctx.textAlign = "center"; 
    ctx.textBaseline = "middle";
    ctx.font = "25px Arial";
    fT("Inventory",canW * 0.92,30);
    ctx.font = "15px Arial";
    playerResources.forEach(r => {
        fT(r.value + "/" + maxStorage + " units of " + r.type,canW * 0.92, 25 + rightInfoHeight + (playerResources.indexOf(r) * rightInfoStep));
    });
    
    fT("Sol: " + (sols + 1) + " Planet Rotation: " + time.toFixed(0) + "°", canW/2,15);

    if(!buildMode && !settingRecipe && !selectingSell && !buyingMode && (time <= 8 || time >= 352)){
        ctx.fillStyle = "#000000AA";
        if(time < 3 || time >= 357){
            ctx.strokeStyle = "#FFFFFF";
            generateUIOverlay(0.05,0.14,0.39);
            ctx.font = "30px Tahoma";
            ctx.fillStyle = "#FFFFFF";
            fT("Sol " + (sols + 1) + "/7",canW/2,modeHeight);
        } else if(time <= 8){
            var fade = componentToHex(255 - (255 * ((time-3)/5)));
            ctx.strokeStyle = "#FFFFFF" + fade;
            generateUIOverlay(0.05,0.14,0.39);
            ctx.font = "30px Tahoma";
            ctx.fillStyle = "#FFFFFF" + fade;
            fT("Sol " + (sols + 1) + "/7",canW/2,modeHeight);
        } else if(time >= 352){
            var fade = componentToHex((255 * ((time-352)/5)));
            ctx.strokeStyle = "#FFFFFF" + fade;
            generateUIOverlay(0.05,0.14,0.39);
            ctx.font = "30px Tahoma";
            ctx.fillStyle = "#FFFFFF" + fade;
            fT("Sol " + (sols + 1) + "/7",canW/2,modeHeight);
        }
    }

    ctx.strokeStyle = "#FFFFFF";
    if(buildMode){
        ctx.fillStyle = "#000000AA";
        generateUIOverlay(0.05,0.5,0.4);
        ctx.font = "30px Tahoma";
        ctx.fillStyle = "#FFFFFF";
        fT("Build Mode",canW/2,modeHeight);
        ctx.font = "20px Tahoma";
        var number = 5;
        var visableOptions = playerBuildings.filter(p => Math.abs(playerBuildings.indexOf(p) - selectedBuilding) < number + (Math.max(0,number - 1 - selectedBuilding)));
        visableOptions.forEach(p => {
            var index = playerBuildings.indexOf(p);
            ctx.fillStyle = "#AAAAAA";
            if(selectedBuilding == index){
                ctx.fillStyle = "#FFFFFF";
            }
            if(p.type != "EXIT"){
                fT(p.value + " " + p.type,canW/2,modeHeight + selectionHeight + (25 * visableOptions.indexOf(p)));
            } else {
                fT(p.type ,canW/2,modeHeight + selectionHeight + (25 * visableOptions.indexOf(p)));
            }
        });
    }

    if(settingRecipe){
        ctx.fillStyle = "#000000AA";
        generateUIOverlay(0.05,0.5,0.3);
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.moveTo(canW * 0.5,canH * 0.07);
        ctx.lineTo(canW * 0.5,canH * 0.53);
        ctx.stroke();
        ctx.font = "30px Tahoma";
        fT("Set Recipe:",canW*0.4,modeHeight + (canW*0.01));
        ctx.font = "20px Tahoma";
        var number = 5;
        var visableOptions = recipes.filter(p => Math.abs(recipes.indexOf(p) - selectedBuilding) < number + (Math.max(0,number - 1 - selectedBuilding)));
        visableOptions.forEach(r => {
            var index = recipes.indexOf(r);
            ctx.fillStyle = "#AAAAAA";
            if(selectedBuilding == index){
                ctx.fillStyle = "#FFFFFF";
            }
            if(r.product == "EXIT"){
                fT(r.product,canW*0.4,modeHeight + (canW*0.01) + selectionHeight + (25 * visableOptions.indexOf(r)));
            } else {
                if(selectedBuilding == index){
                    ctx.font = "25px Tahoma";
                    r.items.forEach(i => fT(i.value + " " + i.type, canW*0.59, modeHeight + (canW*0.01) + selectionHeight + (25 * r.items.indexOf(i))));
                    fT(r.energy + " ENERGY", canW*0.59, modeHeight + (canW*0.01) + selectionHeight + (25 * r.items.length))
                }
                ctx.font = "20px Tahoma";
                fT(r.product,canW*0.4,modeHeight + (canW*0.01) + selectionHeight + (25 * visableOptions.indexOf(r)));
            }
        });
    }

    
    if(selectingSell){
        ctx.fillStyle = "#000000AA";
        generateUIOverlay(0.05,0.5,0.4);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "30px Tahoma";
        fT("Sell Mode",canW/2,modeHeight);
        ctx.font = "20px Tahoma";
        var number = 5;
        var options = prices.filter(p => playerResources.some(r => p.type == r.type && r.value >= p.ammount) || p.type == "EXIT");
        var visableOptions = options.filter(p => Math.abs(options.indexOf(p) - selectedSell) < number + (Math.max(0,number - 1 - selectedSell)));
        visableOptions.forEach(p => {
            var index = options.indexOf(p);
            ctx.fillStyle = "#AAAAAA";
            if(selectedSell == index){
                ctx.fillStyle = "#FFFFFF";
            }
            if(p.type != "EXIT"){
                fT(p.ammount + " " + p.type + " : ₿" + p.price * p.ammount,canW/2,modeHeight + selectionHeight + (25 * visableOptions.indexOf(p)));
            } else {
                fT(p.type ,canW/2,modeHeight + selectionHeight + (25 * visableOptions.indexOf(p)));
            }
        });
    }

    if(buyingMode){
        ctx.fillStyle = "#000000AA";
        generateUIOverlay(0.05,0.5,0.2);
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.moveTo(canW * 0.5,canH * 0.07);
        ctx.lineTo(canW * 0.5,canH * 0.53);
        ctx.stroke();
        if(shopItems[selectedBuy].type != "EXIT"){
            ctx.beginPath();
            ctx.moveTo(canW * 0.5,canH * 0.46);
            ctx.lineTo(canW * 0.78,canH * 0.46);
            ctx.stroke();
        }
        ctx.font = "30px Tahoma";
        fT("Buy Mode",canW * 0.36,modeHeight);
        ctx.font = "20px Tahoma";
        var number = 5;
        var visableOptions = shopItems.filter(p => Math.abs(shopItems.indexOf(p) - selectedBuy) < number + (Math.max(0,number - 1 - selectedBuy)));
        visableOptions.forEach(i => {
            var index = shopItems.indexOf(i);
            ctx.fillStyle = "#AAAAAA";
            if(selectedBuy == index){
                ctx.fillStyle = "#FFFFFF";
            }
            ctx.textAlign = "center"; 
            ctx.textBaseline = "middle";
            if(i.type != "EXIT"){
                fT(i.item ,canW * 0.36,modeHeight + 20 + selectionHeight + (25 * visableOptions.indexOf(i)));
                if(selectedBuy == index){
                    fT(i.type ,canW * 0.65,modeHeight + 20);
                    fT("₿" + selectedSellDisplayPrice.toLocaleString('en-US', {maximumFractionDigits: 0}) ,canW * 0.64,canH * 0.495);
                    ctx.textAlign = "start"; 
                    i.desc.forEach(s => fT(s ,canW * 0.51,modeHeight + 20 + selectionHeight + (25 * i.desc.indexOf(s))));
                }
            } else {
                fT(i.type ,canW * 0.36,modeHeight + 20 + selectionHeight + (25 * visableOptions.indexOf(i)));
            }
        });
        selectedSellDisplayPrice = lerp(shopItems[selectedBuy].cost,selectedSellDisplayPrice,(frameSpeedFactor/80));
    }

    ctx.textAlign = "center"; 
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "20px Tahoma";
    fT("JMC",canW * 0.05,canH * 0.14);
    drawLogo(canW * 0.05,canH * 0.070,50);
    if(!endlessMode){
        fT("Daily Quota:",canW * 0.05,canH * 0.22);
    } else {
        fT("Endless",canW * 0.05,canH * 0.22);
        fT("Mode",canW * 0.05,25 + canH * 0.22);
    }
    ctx.font = "25px Tahoma";
    fT("₿" + playerBalanceDisplayed.toLocaleString('en-US', {maximumFractionDigits: 0}) ,canW * 0.05,canH * 0.18);
    playerBalanceDisplayed = lerp(playerBalance,playerBalanceDisplayed,(frameSpeedFactor/100));
    if(!endlessMode){
        if(playerBalance >= quotas[sols]){
            ctx.fillStyle = "#00FF00";
        } else if(time > 300 && Math.trunc(time) % 2 == 0){
            ctx.fillStyle = "#FF0000";
        }
        fT("₿" + quotas[sols].toLocaleString('en-US', {maximumFractionDigits: 0}) ,canW * 0.05,canH * 0.26);
    }

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "15px Tahoma";
    var batteryStatusHeight = 0.45;
    drawBattery(canW * 0.02,canH * batteryStatusHeight,100,playerEnergy/playerMaxEnergy);
    if(hudSwap){
        ctx.fillStyle = "#FF0000";
    }
    fT("Battery",canW * 0.07,canH * (batteryStatusHeight - 0.13));
    fT("Status:",canW * 0.07,canH * (batteryStatusHeight - 0.11));
    var percentEnergy = playerEnergy/playerMaxEnergy;
    ctx.font = "12px Tahoma";
    fT(batteryStatusMessage,canW * 0.07,canH * (batteryStatusHeight - 0.09));
    ctx.fillStyle = "#FFFFFF";
    if(tiles.find(t => t.hasPlayer).hazard > 0){
        ctx.font = "50px Tahoma";
        fT("☢",canW * 0.07,canH * (batteryStatusHeight - 0.032));
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
    } else if(playerEnergy <= 15 && playerEnergy > 10) {
        batteryStatusMessage = "Very Low";
        hudFlash = true;
        hudFlashTimer += (frameSpeedFactor/400);
    } else if(playerEnergy <= 10 && playerEnergy > 5) {
        batteryStatusMessage = "Critical";
        hudFlash = true;
        hudFlashTimer += (frameSpeedFactor/150);
    } else if(playerEnergy <= 5) {
        batteryStatusMessage = "Deadly";
        hudFlash = true;
        hudFlashTimer += (frameSpeedFactor/50);
    };
}

function handleTileUpdates(t) {
    var infoX = canW * 0.85;
    var infoY = canH * 0.45;
    var infoStep = 20;
    ctx.lineWidth = 2;
    ctx.textAlign = "start"; 
    ctx.textBaseline = "alphabetic";
    ctx.font = "15px Arial"
    switch(t.building.type){
        case "SOLAR":
            var totalEnergy = solarOutput * Math.max(0.25,Math.sin(time * Math.PI/180));
            if(t.hasPlayer && playerEnergy < playerMaxEnergy){
                playerEnergy = Math.min(playerMaxEnergy,playerEnergy + totalEnergy * (frameSpeedFactor/1000));
            } else {
            var surrounding = getSurroundingTiles(t).filter(tt => tt.building.energy != null).filter(tt => tt.building.energy != tt.building.maxEnergy);
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
                fT("⚡",infoX ,infoY + infoStep);
                drawBattery(infoX,infoY + (infoStep*2) + canH * 0.08,canH * 0.1,Math.min(1,totalEnergy/solarOutput));
            }
            break;
        case "CONSTRUCTOR":
            if(t.building.recipe != null){
                if(t.building.crafting){
                    t.building.timer += (frameSpeedFactor/10000) * craftSpeed;
                    if(t.building.timer >= 1){
                        if(constructorTransmit){
                            addToPlayerBuildings(t.building.recipe.product,1);
                            t.building.recipe = null;
                            playerTile.building.timer = 0;
                        } else {
                            t.building.storedProduct = true;
                        }
                        t.building.crafting = false;
                    }
                }
            }
            if(t.hasPlayer && !escMenu){
                fT("Recipe: " + (t.building.recipe != undefined ? t.building.recipe.product : "None") ,infoX,infoY);
                fT("⚡",infoX ,infoY + infoStep);
                if(t.building.storedProduct){
                    ctx.fillStyle = "#00FF00";
                }
                fT("%",(infoX + 12) + (canH * 0.1) * 0.25,infoY + infoStep);
                drawBattery(infoX,infoY + (infoStep*2) + canH * 0.08,canH * 0.1,t.building.energy/t.building.maxEnergy);
                drawBattery(10 + infoX + (canH * 0.1) * 0.25, infoY + (infoStep*2) + canH * 0.08,canH * 0.1,t.building.timer);
            }
            break;
        case "MINER":
            if(!t.building.mining){
                if(t.building.energy >= 1 && t.resource.type != "NONE" && t.building.storedResource < t.building.maxStored){
                    t.building.energy -= 1;
                    t.building.mining = true;
                }
            } else {
                t.building.timer += (frameSpeedFactor/25000) * mineSpeed;
                if(t.building.timer >= 1){
                    t.building.storedResource = Math.min(t.building.maxStored, t.building.storedResource + 5);
                    mineTile(t);
                    t.building.mining = false;
                    t.building.timer = 0;
                }
            }
            if(minerTransmit){
                t.building.storedResource -= addToPlayerResources(t.building.storedType,t.building.storedResource);
            }
            if(t.hasPlayer && !escMenu){
                fT("⚡",infoX,infoY + infoStep);
                fT("%",(12 + infoX) + (canH * 0.1) * 0.25,infoY + infoStep);
                fT("⨆",(24 + infoX) + (canH * 0.1) * 0.5,infoY + infoStep);
                drawBattery(infoX,infoY + (infoStep*2) + canH * 0.08,canH * 0.1,Math.min(1,t.building.energy/t.building.maxEnergy));
                drawBattery(10 + infoX + (canH * 0.1) * 0.25, infoY + (infoStep*2) + canH * 0.08,canH * 0.1,t.building.timer);
                drawBattery(20 + infoX + (canH * 0.1) * 0.5, infoY + (infoStep*2) + canH * 0.08,canH * 0.1,t.building.storedResource/t.building.maxStored);
            }
            break;
        case "BATTERY":
            var surrounding = getSurroundingTiles(t).filter(tt => tt.building.energy != null).filter(tt => tt.building.energy != tt.building.maxEnergy);
            var surroundingBatteries = surrounding.filter(tt => tt.building.type == "BATTERY").filter(tt => tt.building.energy + 1 < t.building.energy);
            var surroundingOther = surrounding.filter(tt => tt.building.type != "BATTERY");
            if(t.building.discharging){
                t.building.timer += (frameSpeedFactor/10000) * batteryDischarge;
                if(surrounding.length == 0){
                    t.building.timer = 0;
                    t.building.discharging = false;
                    t.building.energy = Math.min(t.building.energy + 1,t.building.maxEnergy);
                }
                if(t.building.timer >= 1){
                    t.building.timer = 0;
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
                fT("⚡",infoX,infoY + infoStep);
                fT("%",(12 + infoX) + (canH * 0.1) * 0.25,infoY + infoStep);
                drawBattery(infoX,infoY + (infoStep*2) + canH * 0.08,canH * 0.1,t.building.energy/t.building.maxEnergy);
                drawBattery(10 + infoX + (canH * 0.1) * 0.25, infoY + (infoStep*2) + canH * 0.08,canH * 0.1,t.building.timer);
            }
            break;
        case "RTG":
            if(t.hasPlayer && playerEnergy < playerMaxEnergy){
                playerEnergy = Math.min(playerMaxEnergy,playerEnergy + RTGOutput * (frameSpeedFactor/1000));
            } else {
                var surrounding = getSurroundingTiles(t).filter(tt => tt.building.energy != null).filter(tt => tt.building.energy != tt.building.maxEnergy);
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
            if(t.building.timer >= 1){
                if(t.hasPlayer && playerEnergy < playerMaxEnergy){
                    playerEnergy = Math.min(playerMaxEnergy,playerEnergy + generatorOutput);
                } else {
                    var surrounding = getSurroundingTiles(t).filter(tt => tt.building.energy != null).filter(tt => tt.building.energy != tt.building.maxEnergy);
                    var induvidualEnergy = (generatorOutput / surrounding.length);
                    surrounding.forEach(tt => {
                        if(tt.building.energy + induvidualEnergy >= tt.building.maxEnergy){
                            tt.building.energy = tt.building.maxEnergy;
                        } else {
                            tt.building.energy += induvidualEnergy;
                        }
                    });
                }
                t.building.timer = 0;
                t.building.generating = false;
            } else if(t.building.timer < 1 && t.building.generating){
                t.building.timer += (frameSpeedFactor/800);
            } else if(t.building.coal >= 1 && ((t.hasPlayer && playerEnergy < playerMaxEnergy) || (getSurroundingTiles(t).filter(tt => tt.building.energy != null).filter(tt => tt.building.energy != tt.building.maxEnergy).length > 0))){
                t.building.coal -= 1;
                t.building.timer = 0;
                t.building.generating = true;
            }
            if(t.hasPlayer){
                fT("⨆",infoX + 2,infoY + infoStep);
                fT("%",(12 + infoX) + (canH * 0.1) * 0.25,infoY + infoStep);
                drawBattery(infoX,infoY + (infoStep*2) + canH * 0.08,canH * 0.1,t.building.coal/t.building.maxCoal);
                drawBattery(10 + infoX + (canH * 0.1) * 0.25, infoY + (infoStep*2) + canH * 0.08,canH * 0.1,t.building.timer);
            }
            break;
    }
}

function exploreMode(){
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
            break;
        case 16:
            inputs.speve = true;
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
            break;
        case 16:
            inputs.speve = false;
            break;
    }
});

let s = (snd) => zzfx(...snd).start();

setInterval(gameloop,50);