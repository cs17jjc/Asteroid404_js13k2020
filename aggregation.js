//zzfx
zzfx=(...t)=>zzfxP(zzfxG(...t))
zzfxP=(...t)=>{let e=zzfxX.createBufferSource(),f=zzfxX.createBuffer(t.length,t[0].length,zzfxR);t.map((d,i)=>f.getChannelData(i).set(d)),e.buffer=f,e.connect(zzfxX.destination);return e}
zzfxG=(a=1,t=.05,h=220,M=0,n=0,s=.1,i=0,r=1,o=0,z=0,e=0,f=0,m=0,x=0,b=0,d=0,u=0,c=1,G=0,I=zzfxR,P=99+M*I,V=n*I,g=s*I,j=G*I,k=u*I,l=2*Math.PI,p=(a=>0<a?1:-1),q=P+j+V+g+k,v=(o*=500*l/I**2),w=(h*=(1+2*t*Math.random()-t)*l/I),y=p(b)*l/4,A=0,B=0,C=0,D=0,E=0,F=0,H=1,J=[])=>{for(;C<q;J[C++]=F)++E>100*d&&(E=0,F=A*h*Math.sin(B*b*l/I-y),F=p(F=i?1<i?2<i?3<i?Math.sin((F%l)**3):Math.max(Math.min(Math.tan(F),1),-1):1-(2*F/l%2+2)%2:1-4*Math.abs(Math.round(F/l)-F/l):Math.sin(F))*Math.abs(F)**r*a*zzfxV*(C<P?C/P:C<P+j?1-(C-P)/j*(1-c):C<P+j+V?c:C<q-k?(q-C-k)/g*c:0),F=k?F/2+(k>C?0:(C<q-k?1:(C-q)/k)*J[C-k|0]/2):F),A+=1-x+1e9*(Math.sin(C)+1)%2*x,B+=1-x+1e9*(Math.sin(C)**2+1)%2*x,h+=o+=500*z*l/I**3,H&&++H>f*I&&(h+=e*l/I,w+=e*l/I,H=0),m&&++D>m*I&&(h=w,o=v,D=1,H=H||1);return J};
zzfxV=0.5
zzfxR=44100
zzfxX=new(top.AudioContext||webkitAudioContext);
//zzfxM
zzfxM=(n,f,t,e=125)=>{let l,o,z,r,g,h,x,a,u,c,d,i,m,p,G,M=0,R=[],b=[],j=[],k=0,q=0,s=1,v={},w=zzfxR/e*60>>2;for(;s;k++)R=[s=a=d=m=0],t.map((e,d)=>{for(x=f[e][k]||[0,0,0],s|=!!f[e][k],G=m+(f[e][0].length-2-!a)*w,p=d==t.length-1,o=2,r=m;o<x.length+p;a=++o){for(g=x[o],u=o==x.length+p-1&&p||c!=(x[0]||0)|g|0,z=0;z<w&&a;z++>w-99&&u?i+=(i<1)/99:0)h=(1-i)*R[M++]/2||0,b[r]=(b[r]||0)-h*q+h,j[r]=(j[r++]||0)+h*q+h;g&&(i=g%1,q=x[1]||0,(g|=0)&&(R=v[[c=x[M=0]||0,g]]=v[[c,g]]||(l=[...n[c]],l[2]*=2**((g-12)/12),g>0?zzfxG(...l):[])))}m=G});return[b,j]}

let s = (snd) => zzfx(...snd).start();
var gArr = (n) => Array.from(new Array(n).keys());
//Music
//Generate drum patterns
var drm = [gArr(18).map(i => i == 2 ? 15 : 0),gArr(18).map(i => i == 2 ? 15 : 0),gArr(18).map(i => i == 10 ? 15 : i == 0 ? 1 : 0),gArr(18).map(i => i == 0 ? 2 : (i % 4 == 0 && i != 12) ? 15 : 0)];
drm[1][14] = 15;
//Generate note patterns
var mkEch = (n) => gArr(18).map(i => i == 0 ? 3 : [2,6,10,14].includes(i) ? n + [0,0.1,0.5,0.7][[2,6,10,14].indexOf(i)] : i == 1 ? -0.1 : 0);
var Ech = [mkEch(18),mkEch(22),mkEch(24),mkEch(30)];
//Generate song pattern
var wrp = (n) => n - (Math.trunc(n/4)*4);
var ptrn = gArr(32).map(i => i < 8 ? wrp(i) : i < 16 ? 4 + wrp(i) : 8 + wrp(i));
var song = [
[
[,0,86,,,,,.7,,,,.5,,6.7,1,.05],             //Kick
[.7,0,270,,,.12,3,1.65,-2,,,,,4.5,,.02],    //Snare
[.4,0,2200,,,.04,3,2,,,800,.02,,4.8,,.01,.1],  //Hi-hat
[,0,130.81 ,,,1] //Echo Synth
],
[[Ech[0]],[Ech[1]],[Ech[2]],[Ech[3]],[Ech[0],drm[0],drm[2]],[Ech[1],drm[0],drm[2]],[Ech[2],drm[0],drm[2]],[Ech[3],drm[1],drm[2]],[Ech[0],drm[0],drm[2],drm[3]],[Ech[1],drm[0],drm[2],drm[3]],[Ech[2],drm[0],drm[2],drm[3]],[Ech[3],drm[1],drm[2],drm[3]]],
ptrn,120];

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
    var p = gArr(256).map(i => Math.trunc(Math.random() * 255));
    var perm = new Array(512);
    var gradP = new Array(512);
    function seed(seed) {
      seed *= seed > 0 && seed < 1 ? 65536 : 1;
      seed = Math.floor(seed);
      seed = seed < 256 ? seed |= seed << 8 : seed;
      gArr(256).forEach(i => {
        var v = i & 1 ? p[i] ^ (seed & 255) : p[i] ^ ((seed>>8) & 255);
        perm[i] = perm[i + 256] = v;
        gradP[i] = gradP[i + 256] = grad3[v % 12];
      });
    };
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
    constructor(r,g,b){
        this.r = r;
        this.g = g;
        this.b = b;
    }
    toHex(){
        return rgbToHex(this.r,this.g,this.b);
    }
    darkend(factor){
        return new Colour(this.r * factor,this.g * factor,this.b * factor);
    }
}

//Game code

var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

var messages = [];
var tileWithPlayer;

//Utils
let tileRadius = 60;
let perspRatio = 0.4;
let offsets = [{x:1,y:0},{x:0.5,y:0.866025},{x:-0.5,y:0.866025},{x:-1,y:0},{x:-0.5,y:-0.866025},{x:0.5,y:-0.866025}];
let tileViewRadius = 11;
let tileStepHeight = 5;
var roverImgScale = 1;
var playerPosOffset = {x:0,y:0};

var resColMap = new Map();
resColMap.set("NONE",new Colour(0,0,0));
resColMap.set("ROCK",new Colour(100,100,100));
resColMap.set("IRON",new Colour(165,42,42));
resColMap.set("COPPER",new Colour(184,115,51));
resColMap.set("CARBON",new Colour(18,18,18));
resColMap.set("LITHIUM",new Colour(169,169,169));
resColMap.set("SILICON",new Colour(0,153,204));
resColMap.set("PLUTONIUM",new Colour(0,255,0));

var dG = (strId) => document.getElementById(strId);
var roverImg = dG("0");
var buildingImg = dG("1");
var radarImg = dG("2");
var solarImg = dG("3");

var flashRates = new Map();
flashRates.set("Deadly",50);
flashRates.set("Critical",150);
flashRates.set("Very Low",400);

function drawLines(points,x,y,fill = true){
    ctx.beginPath();
    ctx.moveTo(points[0].x + x,points[0].y + y);
    gArr(points.length-1).forEach(i => ctx.lineTo(points[i+1].x + x,points[i+1].y + y));
    ctx.closePath();
    if(fill){ctx.fill()};
    ctx.stroke();
}

function renderStars(rot){
    ctx.fillStyle = "#FFFFF0";
    ctx.save();
    ctx.translate(canW/2,canH/2);
    ctx.rotate(rot);
    stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x,s.y,s.r,0, 2 * Math.PI);
        ctx.fill();
    });
    ctx.restore();
}

function updateRadarVisableTiles(){
    var radarTiles = gameData[0].filter(t => t.building.type == "RADAR");
    gameData[0].forEach(t => t.isVisible = radarTiles.some(r => Math.abs(r.x - t.x) <= gameData[12]));
}
function drawLogo(x,y,size){
    ctx.lineWidth = size/10;
    ctx.save();
    ctx.translate(x,y);
    ctx.strokeStyle = "#A2A2A2";
    drawLines([{x:0,y:-size/2},{x:-size/2,y:size/2},{x:size/2,y:size/2}],0,0,false);
    var drawCirc = (xx,yy) => {ctx.beginPath();ctx.arc(xx, yy, size/4, 0, 2 * Math.PI);ctx.fill();}
    ctx.fillStyle = "#FF0000";
    drawCirc(0, -size/2);
    ctx.fillStyle = "#FFF500";
    drawCirc(-size/2,size/2);
    ctx.fillStyle = "#0045FF";
    drawCirc(size/2,size/2);
    ctx.restore();
}
function drawBattery(x,y,size,percentage){
    var width = size * 0.25;
    var p = Math.min(1,percentage);
    ctx.save();
    ctx.translate(x,y);
    ctx.fillStyle = new Colour(255 - (255 * p),255 * p,0).toHex();
    ctx.fillRect(0,-size * p,width,size * p);
    ctx.strokeStyle = "#FFFFFF";
    drawLines([{x:0,y:-size},{x:width,y:-size},{x:width,y:0},{x:0,y:0}],0,0,false);
    ctx.restore();
}
function updatePlayerPos(deltaX,deltaY){
    interactTimer = 0;
    tileWithPlayer = tileWithPlayer != null ? tileWithPlayer : gameData[0].find(t => t.hasPlayer);
    var newTile = gameData[0].find(t => t.x == tileWithPlayer.x + deltaX && t.y == tileWithPlayer.y + deltaY);
    if(newTile != null){
        if(newTile.isVisible){
            if(Math.abs(newTile.height - tileWithPlayer.height) <= gameData[10] * tileStepHeight){
                tileWithPlayer.hasPlayer = false;
                newTile.hasPlayer = true;
                playerPosOffset = {x:tileWithPlayer.screenPos.x - newTile.screenPos.x,y:tileWithPlayer.screenPos.y - newTile.screenPos.y};
                tileWithPlayer = newTile;
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
        tile.resource=tile.resource.value==1?{type:"NONE"}:{type:tile.resource.type,value:tile.resource.value-1,lines:generateResourcePoints(tile.resource.value-1)};
}
function placeBuilding(tile,building){
        tile.building.type = building.type;
        var tb = tile.building;
        if(tb.type == "RADAR"){updateRadarVisableTiles()}
        if(tb.type == "CONSTRUCTOR" || tb.type == "MINER"){
            tb.energy = 0;
            tb.maxEnergy = 10;
            tb.timer = 0;
            tb.processing = false;
            if(tb.type == "CONSTRUCTOR"){tb.storedProduct = false;}
            if(tb.type == "MINER"){tb.storedResource = 0;tb.storedType = tile.resource.type;tb.maxStored = 50;tb.counter = 0;}
        }
        building.value -= 1;
        s([soundFxVolume,,191,,,.07,1,1.09,-5.4,,,,,.4,-0.4,.3,,.7]);
}
function removeBuilding(tile){
    addToPlayerBuildings(tile.building.type,1);
    var type = tile.building.type;
    tile.building = {type:"NONE"};
    if(type == "RADAR"){updateRadarVisableTiles();}
    s([soundFxVolume,,400,,,.07,1,1.09,-5.4,,,,,.4,-0.4,.3,,.7]);
}

function addToPlayerResources(type,ammount){
    var addedValue = Math.min(gameData[11],ammount);
    var playerRes = gameData[3].find(r => r.type == type);
    if(playerRes != null){
        if(playerRes.value + addedValue > gameData[11]){
            addedValue = gameData[11] - playerRes.value;
        }
        playerRes.value += addedValue;
    } else {
        gameData[3].push({type:type,value:addedValue});
    }
    return addedValue;
}
function addToPlayerBuildings(type,ammount){
    var playerBuild = gameData[4].find(r => r.type == type);
    playerBuild != null ? playerBuild.value += ammount : gameData[4].push({type:type,value:ammount});
}

function drawHexagon(pos){
    //Create then draw hexagon lines from offsets array
    drawLines(offsets.map(o => {return {x:tileRadius * o.x,y:tileRadius * o.y * perspRatio}}),pos.x,pos.y);
}

function componentToHex(c) {
    var hex = Math.max(0,Math.min(255,Math.trunc(c))).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b, a=255) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b) + componentToHex(a);
  }

  function generateHudOverlay(rightHeight){
    drawLines([{x:0,y:canH * 0.29},
    {x:canW * 0.09,y:canH * 0.29},
    {x:canW * 0.1,y:canH * 0.27},
    {x:canW * 0.1,y:0},
    {x:0,y:0},
    {x:0,y:canH * 0.48},
    {x:canW * 0.09,y:canH * 0.48},
    {x:canW * 0.1,y:canH * 0.46 - 0.02},
    {x:canW * 0.1,y:canH * 0.29},
    {x:0,y:canH * 0.29},
    {x:0,y:0},
    {x:canW * 0.39,y:0},
    {x:canW * 0.42,y:canH * 0.04},
    {x:canW * 0.58,y:canH * 0.04},
    {x:canW * 0.61,y:0},
    {x:canW * 0.83,y:0},
    {x:canW * 0.83,y:rightHeight - canH * 0.02},
    {x:canW * 0.85,y:rightHeight},
    {x:canW,y:rightHeight},
    {x:canW,y:0},
    {x:0,y:0}],0,0);
  }

  function generateUIOverlay(height,length,width){
      var cornerLength = 0.04;
      var rightX = 1 - width;
      drawLines([{x:canW * (width + cornerLength),y:canH * height},
      {x:canW * (rightX - cornerLength),y:canH * height},
      {x:canW * (rightX),y:canH * (height + cornerLength)},
      {x:canW * (rightX),y:canH * ((height + length) - cornerLength)},
      {x:canW * (rightX - cornerLength),y:canH * (height + length)},
      {x:canW * (width + cornerLength),y:canH * (height + length)},
      {x:canW * (width),y:canH * (height + length - cornerLength)},
      {x:canW * (width),y:canH * (height + cornerLength)}],0,0);

      var sizeOffset = 0.02;
      var height2 = height + sizeOffset;
      var length2 = length - sizeOffset * 2;
      drawLines([{x:canW * (width + sizeOffset + cornerLength),y:canH * height2},
      {x:canW * (rightX - sizeOffset - cornerLength),y:canH * height2},
      {x:canW * (rightX - sizeOffset),y:canH * (height2 + cornerLength)},
      {x:canW * (rightX - sizeOffset),y:canH * ((height2 + length2) - cornerLength)},
      {x:canW * (rightX - sizeOffset - cornerLength),y:canH * (height2 + length2)},
      {x:canW * (width + sizeOffset + cornerLength),y:canH * (height2 + length2)},
      {x:canW * (width + sizeOffset),y:canH * (height2 + length2 - cornerLength)},
      {x:canW * (width + sizeOffset),y:canH * (height2 + cornerLength)}],0,0);
  }

  function getSurroundingTiles(tile){
      return gameData[0].filter(t => {
        var yDelta = t.y - tile.y;
        var xDelta = t.x - tile.x;
        return (Math.abs(yDelta) == 1 && xDelta == 0) || (yDelta == 0 && Math.abs(xDelta) == 1) || (tile.x % 2 == 0 && yDelta == -1 && Math.abs(xDelta) == 1) || (tile.x % 2 != 0 && yDelta == 1 && Math.abs(xDelta) == 1);
      });
  }

  function generateResourcePoints(value){
    var points = 5 + Math.trunc(Math.random() * 5);
    var size = value/20;
    var xOffset = (Math.random() - 0.5) * (tileRadius*0.2) * size;
    var yOffset = (Math.random() - 0.5) * (tileRadius*0.2) * size;
    //Create circle vertices from 360/points at radius size with randomness and constraints
    return gArr(points).map(i => {return {x:Math.max(-tileRadius * 0.6 + 5,Math.min(tileRadius * 0.6 - 5,xOffset + (Math.cos((i * ((Math.PI*2)/points))) * size * tileRadius + (Math.random() * 15 * size)))),y:Math.max(-tileRadius * perspRatio + 5,Math.min(tileRadius * perspRatio - 5,yOffset + (Math.sin((i * ((Math.PI*2)/points))) * size * (tileRadius*perspRatio) + (Math.random() * 15 * size * perspRatio))))}});
  }

  function generateMap(){

    gameData[0] = gArr(mapWidth).flatMap(x => gArr(5).map(y => new Tile(x,y)));
    gameData[0].forEach(t => {
        var heightNumber = Math.max(0,Math.min(9,Math.trunc(Math.abs((perlin2(t.x/10, t.y/10)+1)/2 * 9))));
        t.height = tileStepHeight * heightNumber;
        //Calculate colour for tile
        t.colour = (heightNumber < 2 ? new Colour(41, 0, 37) : 
                    heightNumber < 4 ? new Colour(69, 56, 35) : 
                    heightNumber < 5 ? new Colour(120, 192, 145) : 
                    heightNumber < 7 ? new Colour(116, 79, 198) :
                    new Colour(203, 144, 77))
                    .darkend(1 - (Math.random() - 0.5)/3);
        var absDelta = Math.abs(spawnX - t.x);
        if(absDelta < (mapWidth * 0.5) && Math.random() > 0.9) { addResourceToTile(t,"ROCK",Math.random() * 15,10,0.5)}
        if(absDelta > (mapWidth * 0.005) && Math.random() > 0.85) { addResourceToTile(t,"IRON",Math.random() * 15,10,0.5)}
        if(absDelta > (mapWidth * 0.04) && Math.random() > 0.90) { addResourceToTile(t,"COPPER",Math.random() * 15,10,0.5)}
        if(absDelta > (mapWidth * 0.08) && Math.random() > 0.92) { addResourceToTile(t,"CARBON",Math.random() * 15,10,0.6)}
        if(absDelta > (mapWidth * 0.10) && Math.random() > 0.92) { addResourceToTile(t,"SILICON",Math.random() * 15,10,0.5)}
        if(absDelta > (mapWidth * 0.15) && Math.random() > 0.88) { addResourceToTile(t,"LITHIUM",Math.random() * 15,10,0.6)}
        if(absDelta > (mapWidth * 0.22) && Math.random() > 0.9) { addResourceToTile(t,"PLUTONIUM",Math.random() * 15,10,0.7)}
        if(t.resource.type == "PLUTONIUM") { addHazardToTile(t,t.resource.value)}
        if(absDelta > (mapWidth * 0.10) && Math.random() > 0.8) { addHazardToTile(t,3 * Math.random())}
    });
    gameData[0].find(t => t.x == spawnX).hasPlayer = true;
    //Generate lines for tiles with resources
    gameData[0].forEach(t => {if(t.resource.type != "NONE"){t.resource.lines = generateResourcePoints(t.resource.value)}});
  }

function addResourceToTile(tile,type,ammount,minimum,expansion) {
    tile.resource = {type:type,value:Math.max(minimum,Math.trunc(ammount))};
    getSurroundingTiles(tile).forEach(t => {if(Math.random() > expansion){t.resource = {type:type,value:Math.max(5,Math.trunc(tile.resource.value * Math.random()))}}});
  }

  function addHazardToTile(tile,ammount) {
    tile.hazard = Math.ceil(ammount);
    getSurroundingTiles(tile).forEach(t => t.hazard = Math.ceil(ammount * 0.8));
  }

//Source
var menuItems = ["Resume","Main Menu","Save Game","Load Game","Toggle Music","Toggle Sound FX"];
var selectedMenuItem = 0;

var mainMenuItems = ["New Game","Load Game"];
var mainMenu = true;

var soundFxVolume = 0.5;
var confirmSound = () => s([soundFxVolume,.01,593,,.03,0,1,2.04,.1,.1,50,.01,,-0.1,,,.06,.96,.08]);
var denySound = () => s([soundFxVolume,0,604,,,.13,4,2.01,-0.1,.2,50,,.01,,,.4,.05,.68,.05]);

var startRecipes = [{product:"RADAR",items:[{type:"IRON",value:20}],energy:8}];
[{type:"ROCK",price:1,},{type:"IRON",price:5,},{type:"COPPER",price:10,},{type:"CARBON",price:25,},{type:"SILICON",price:50},{type:"LITHIUM",price:75},{type:"PLUTONIUM",price:100}]

var prices = gArr(21).map(i => {
    var thirds = Math.trunc(i/3);
    var p = [{type:"ROCK",price:1,},{type:"IRON",price:5,},{type:"COPPER",price:25,},{type:"CARBON",price:50,},{type:"SILICON",price:80},{type:"LITHIUM",price:100},{type:"PLUTONIUM",price:200}][thirds];
    return {type:p.type,price:p.price,ammount:[1,10,50][i - thirds*3]};
});

var shopItemsStart = [{item:"RESOURCE STORAGE",cost:200,costMulti:1.2,desc:["Increases max resource capacity","by 25%"]},
                 {item:"BATTERY EFFICENCY",cost:100,costMulti:1.5,desc:["Increases max battery capacity","by 20%"]},
                 {item:"CRAFT HEIGHT TOLERANCE",cost:180,costMulti:1.2,desc:["Allows passage between tiles with a","larger height difference."]},

                 {item:"CONSTRUCTOR",cost:500,desc:["Allows construction of constructors.","Constructors manufacture other","buildings."]},
                 {item:"MINER",cost:750,desc:["Allows construction of miners.","Miners gather resources 10 times","more efficent than manual mining."]},
                 {item:"SOLAR",cost:1250,desc:["Allows construction of solars.","Solars generate fluctuating energy."]},
                 {item:"RTG",cost:2500,desc:["Allows construction of RTGs.","RTGs generate constant energy."]},

                 {item:"RADAR RADIUS",cost:1000,costMulti:1.5,desc:["Increases radar uncover","distance by 2 tiles."]},
                 {item:"CONSTRUCTOR SPEED",cost:50,costMulti:1.6,desc:["Increases constructor speed","by 30%"]},
                 {item:"CONSTRUCTOR TRANSMITTER",cost:1850,desc:["Constructor transmits finished","constructions to inventory."]},
                 {item:"MINER SPEED",cost:750,costMulti:1.8,desc:["Incrases Miner speed by 50%"]},
                 {item:"MINER TRANSMITTER",cost:1985,desc:["Miner transmits mined","resources to inventory."]},
                 {item:"RTG OUTPUT",cost:250,costMulti:1.8,desc:["Increases RTG output by 1."]},
                 {item:"SOLAR OUTPUT",cost:550,costMulti:1.4,desc:["Increases Solar output by 1."]}];

// 0 => tiles, 1 => time, 2 => sols, 3 => playerResources
// 4 => playerBuildings, 5 => playerBalance, 6 => playerEnergy, 7 => recipes
// 8 => shopItems, 9 => playerMaxEnergy, 10 => maxStepHeight, 11 => maxStorage
// 12 => radarRange, 13 => solarOutput, 14 => craftSpeed, 15 => mineSpeed
// 16 => minerTransmit, 17 => constructorTransmit, 18 => RTGOutput, 19 => endlessMode
var gameData;

var playerSpeed = 1;
var prevPlayerEnergy;
var playerDeadState = false;

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

var prevInputs = {up:false,down:false,left:false,right:false,inter:false,build:false,remove:false,esc:false,speve:false,shop:false};
var inputs = {up:false,down:false,left:false,right:false,inter:false,build:false,remove:false,esc:false,speve:false,shop:false};

var selectedSell = 0;
var selectedSellDisplayPrice = 0;
var selectedBuy = 0;

var selectedBuilding = 0;

//Modes
var buildMode = false;
var settingRecipe = false;
var escMenu = false;
var selectingSell = false;
var buyingMode = false;

var hudFlashTimer = 0;
var hudFlash = false;
var hudSwap = false;

var interactTimer = 0;

var batteryStatusMessage = "Nominal";

let mySongData = zzfxM(...song);
let myAudioNode = zzfxP(...mySongData);
myAudioNode.loop = true;
myAudioNode.start();
var musicToggle = true;

var stars = gArr(500).map(i => {return {x:(Math.random() * 2 * canW) - canW,y:(Math.random() * 2 * canH) - canH,r:Math.random() * 3}});

var mapWidth = 500;
var spawnX = 240;

var runGameBool = false;
var runIntro = false;

var fT = (s,x,y) => ctx.fillText(s, x, y);

var millisOnLastFrame = new Date().getTime();
var frameSpeedFactor = 0;
function gameloop(){
    frameSpeedFactor =  escMenu ? 0 : new Date().getTime() - millisOnLastFrame;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);
    //Check which function to run
    mainMenu ? handleMainMenu() : runIntro ? intro() : runGameBool ? runGame() : null;
    prevInputs = Object.assign({},inputs);
    millisOnLastFrame = new Date().getTime();
}

function intro(){
    renderStars(0);
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
    fT("Over the course of the next 7 days your mining effectiveness will be assesed by", textX,50 + textY);
    fT("your ability to meet daily monetary quotas.", textX,75 + textY);

    fT("Quotas can be met by mining and selling resources to the TELEDEPOT.", textX,100 + textY);

    fT("Failure to complete these quotas will result in immediate nuclear vapourisation.", textX,150 + textY);
    fT("JMC™ Operations & Managment regrets to inform you that terrain maps", textX,200 + textY);
    fT("for JMC™ Planet 404 have been lost, you are required to use RADARs and uncover more terrain.", textX,225 + textY);

    fT("Use the CONSTRUCTOR to create buildings, such as RADARs, from resources and energy.", textX,300 + textY);
    fT("An RTG has been made available to provide energy and charge your JMC™ Craft.", textX,375 + textY);

    ctx.textAlign = "center";
    fT("WASD to move, left shift to sprint, E to interact/mine.", canW/2,450 + textY);
    fT("B to build, R to remove, Q to access upgrade shop.", canW/2,475 + textY);

    fT("Good Luck.", canW/2,canH * 0.82);
    fT("Press E to start",canW/2,25 + canH * 0.85);
    if(inputs.inter == true && prevInputs.inter == false){
        runIntro = false;
        runGameBool = true;
    }
}

function handleMainMenu(){
    renderStars(0);
    
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
        if(mainMenuItems[selectedMenuItem] == "New Game"){
            soundFxVolume = 0;
            initGame();
            soundFxVolume = 0.5;
            mainMenu = false;
            selectedMenuItem = 0;
            runIntro = true;
            confirmSound();
        }
        if(mainMenuItems[selectedMenuItem] == "Load Game"){
            if(window.localStorage.getItem('Planet404_6473_DATA') != null){
                loadGame();
                runGameBool = true;
                mainMenu = false;
                selectedMenuItem = 0;
                confirmSound();
            } else {
                denySound();
            }
        }
    }

    ctx.font = "40px Tahoma";
    mainMenuItems.forEach(i => {
        ctx.fillStyle = "#AAAAAA";
        if(selectedMenuItem == mainMenuItems.indexOf(i)){
            ctx.drawImage(roverImg, Math.trunc((canW * 0.45) - (ctx.measureText(i).width * 0.5) - (roverImg.width * 0.5)), Math.trunc(canH * 0.3 + (80 * mainMenuItems.indexOf(i)) - (roverImg.height * 0.5)));
            ctx.drawImage(roverImg, Math.trunc((canW * 0.55) + (ctx.measureText(i).width * 0.5) - (roverImg.width * 0.5)), Math.trunc(canH * 0.3 + (80 * mainMenuItems.indexOf(i)) - (roverImg.height * 0.5)));
            ctx.fillStyle = "#FFFFFF";
        }
        fT(i,canW*0.5,canH * 0.3 + (80 * mainMenuItems.indexOf(i)));
    });

}

//Waypoint
function initGame(){
    //Generate Terrain
    gameData = new Array(20);
    seed(Math.random());
    generateMap();
    //Reset variables
    gameData[4] = [{type:"RADAR",value:1}];
    gameData[3] = [];
    gameData[5] = 0;
    gameData[7] = startRecipes.slice();
    gameData[8] = shopItemsStart.slice();
    gameData[19] = false;

    gameData[9] = 50;
    gameData[6] = gameData[9];
    gameData[10] = 1;
    gameData[11] = 40;

    gameData[13] = 4;
    gameData[14] = 1;
    gameData[15] = 1;
    gameData[16] = false;
    gameData[17] = false;
    gameData[18] = 5;
    gameData[12] = 6;

    gameData[1] = 0;
    gameData[2] = 0;

    failedQuota = false;

    prevInputs = {up:false,down:false,left:false,right:false,inter:false,build:false,remove:false,info:false,esc:false,speve:false,shop:false};
    inputs = {up:false,down:false,left:false,right:false,inter:false,build:false,remove:false,info:false,esc:false,speve:false,shop:false};

    playerPosOffset = {x:0,y:0};

    //Place start buildings
    placeBuilding(gameData[0].find(t => t.x == spawnX && t.y == 2),{type:"RADAR",value:1});
    placeBuilding(gameData[0].find(t => t.x == spawnX && t.y == 0),{type:"RTG",value:1});
    placeBuilding(gameData[0].find(t => t.x == spawnX - 1 && t.y == 0),{type:"CONSTRUCTOR",value:1});
    placeBuilding(gameData[0].find(t => t.x == spawnX + 2 && t.y == 1),{type:"TELEDEPOT",value:1});
    tileWithPlayer = gameData[0].find(t => t.hasPlayer);
    updatePlayerPos(0,0);
    prevPlayerEnergy = gameData[6];
}



function runGame(){

    renderStars((Math.PI/180) * ((gameData[2] * 360) + gameData[1]));

    //Render map
    var visableTiles = gameData[0].filter(t => Math.abs(t.x - tileWithPlayer.x) <= tileViewRadius).sort((a,b) => a.height - b.height).sort((a,b) => a.y - b.y).sort((a,b) => a.isVisible - b.isVisible);
    visableTiles.forEach(t => {
        t.screenPos.x = t.x * tileRadius * 1.5 + canW/2 - tileWithPlayer.x * tileRadius * 1.5;
        t.screenPos.y = t.y * tileRadius * 2 * 0.866025 * perspRatio + canH * 0.71 + (t.x % 2 != 0 ? 0.866025 * tileRadius * perspRatio : 0) - (t.isVisible ? t.height : 0);
        ctx.lineWidth = 3;

        var tileColour = new Colour(lerp(t.colour.r,0,t.hazard/5 * t.colour.r/255),lerp(t.colour.g,255,t.hazard/5 + (Math.sin(millisOnLastFrame/300)*t.hazard/20)),lerp(t.colour.b,0,t.hazard/5 * t.colour.b/255));
        ctx.strokeStyle = t.isVisible ? t.hazard == 0 ? tileColour.darkend(0.2).toHex() : tileColour.darkend(1.5).toHex() : "#000000";
        ctx.fillStyle = t.isVisible ? tileColour.toHex() : "#AAAAAA";
        drawHexagon(t.screenPos);

        var rCol = resColMap.get(t.resource.type);
        ctx.fillStyle = rCol.toHex();
        ctx.strokeStyle = rCol.darkend(0.2).toHex();
        if(t.isVisible && t.resource.type != "NONE"){drawLines(t.resource.lines,t.screenPos.x,t.screenPos.y)};

        ctx.fillStyle = "#000000";
        ctx.font = "24px Arial";
        ctx.textAlign = "center"; 
        ctx.textBaseline = "middle"; 
        if(!t.isVisible){fT("404",t.screenPos.x ,t.screenPos.y)};

        ctx.font = "500 100px Arial";
        if(t.building.type == "RADAR"){ctx.drawImage(radarImg,Math.trunc(t.screenPos.x - radarImg.width/2),Math.trunc(t.screenPos.y - radarImg.height*0.9))} else
        if(t.building.type == "SOLAR"){ctx.drawImage(solarImg,Math.trunc(t.screenPos.x - solarImg.width/2),Math.trunc(t.screenPos.y - solarImg.height*0.45))} else
        if(t.building.type != "NONE"){
            ctx.drawImage(buildingImg,Math.trunc(t.screenPos.x - buildingImg.width/2),Math.trunc(t.screenPos.y - buildingImg.height*0.7));
            ctx.save();
            ctx.translate(t.screenPos.x,t.screenPos.y);
            drawLogo(0,0,10);
            ctx.fillStyle = "#00FF0099";
            ctx.fillRect(-12,-46,23,27);
            ctx.fillStyle = "#001100FF";
            ctx.scale(0.25,0.25);
            fT(t.building.type == "CONSTRUCTOR" ? "⚒" :
            t.building.type == "MINER" ? "⛏" :
            t.building.type == "RTG" ? "☢" :
            t.building.type == "TELEDEPOT" ? "₿" : ""
            ,0,-130);
            ctx.restore();
        }
    });
    var playerTileCoords = tileWithPlayer.screenPos;
    ctx.drawImage(roverImg,Math.trunc(playerTileCoords.x - (roverImg.width*roverImgScale/2) + playerPosOffset.x),Math.trunc((playerTileCoords.y - (roverImg.height*roverImgScale/2) - 10) + playerPosOffset.y + (Math.sin(millisOnLastFrame/400)*3)),Math.trunc(roverImg.width*roverImgScale),Math.trunc(roverImg.height*roverImgScale));

    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center"; 
    if(escMenu && !playerDeadState && !failedQuota){
        ctx.font = "45px Tahoma";
        fT("Paused",canW/2,30);
        ctx.font = "35px Tahoma";
        menuItems.forEach(i => {
            ctx.fillStyle = "#AAAAAA";
            if(selectedMenuItem == menuItems.indexOf(i)){
                ctx.drawImage(roverImg, Math.trunc((canW * 0.45) - (ctx.measureText(i).width * 0.5) - (roverImg.width * 0.5)), Math.trunc(canH * 0.15 + (50 * menuItems.indexOf(i)) - (roverImg.height * 0.5)));
                ctx.drawImage(roverImg, Math.trunc((canW * 0.55) + (ctx.measureText(i).width * 0.5) - (roverImg.width * 0.5)), Math.trunc(canH * 0.15 + (50 * menuItems.indexOf(i)) - (roverImg.height * 0.5)));
                ctx.fillStyle = "#FFFFFF";
            }
            fT(i,canW*0.5,canH * 0.15 + (50 * menuItems.indexOf(i)));
        });
        handleMenuInput();
    } else if(!playerDeadState && !failedQuota && !finishedQuotas) {
        //Tile updates
        gameData[0].forEach(t => {if(t.isVisible && t.building.type != "NONE"){handleTileUpdates(t)}});
        
        playerSpeed = inputs.speve == true && prevInputs.speve == true ? 1.8 : 1;
        playerPosOffset = {x:lerp(playerPosOffset.x,0,(frameSpeedFactor/180) * playerSpeed),y:lerp(playerPosOffset.y,0,(frameSpeedFactor/180) * playerSpeed)}

        gameData[3] = gameData[3].filter(r => r.value > 0);
        selectedSell = Math.min(prices.filter(p => gameData[3].some(r => p.type == r.type && r.value >= p.ammount)).length - 1,selectedSell);
        gameData[4] = gameData[4].filter(b => b.value > 0);
        selectedBuy = Math.min(gameData[8].length - 1,selectedBuy);
    

        if(prices.filter(p => gameData[3].some(r => p.type == r.type) && selectingSell).length == 0){
            selectedSell = 0;
            selectingSell = false;
        }

        //Drain player battery
        if(prevPlayerEnergy < gameData[6]){
            batteryStatusMessage ="Charging";
        }
        if(selectingSell || buyingMode || ["SOLAR","RTG"].some(s => s == tileWithPlayer.building.type)){
            batteryStatusMessage ="Paused";
        }
        if(["Charging","Paused"].includes(batteryStatusMessage)){
            hudFlash = false;
        } else {
            gameData[6] -= (1 + tileWithPlayer.hazard) * (frameSpeedFactor/1000);
        }
        
        handleHUD();
        handleInput();
    } else if(playerDeadState){
        //dead state
        playerPosOffset.y = lerp(playerPosOffset.y,10,(frameSpeedFactor/1500));
        roverImgScale = lerp(roverImgScale,0,(frameSpeedFactor/1500));
        ctx.font = Math.trunc(50 - (50 * roverImgScale)) + "px Arial";
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#000000";
        fT("You Died",canW/2,canH * 0.2);
        if(roverImgScale < 0.4){
            fT("Press E to respawn",canW/2,canH * 0.3);
            if(inputs.inter == true && prevInputs.inter == false){
                gameData[6] = gameData[9];
                gameData[3] = [];
                gameData[4] = [];
                playerDeadState = false;
                roverImgScale = 1;
                playerPosOffset = {x:0,y:0};
            }
        }

    } else if(failedQuota){
        //Failed state
        playerPosOffset.y = lerp(playerPosOffset.y,10,(frameSpeedFactor/1500));
        roverImgScale = lerp(roverImgScale,0,(frameSpeedFactor/1500));
        ctx.font = Math.trunc(50 - (50 * roverImgScale)) + "px Arial";
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#000000";
        fT("Quota Failed",canW/2,canH * 0.2);
        gameData[0].forEach(t => t.hazard = Math.min(6, t.hazard + (frameSpeedFactor/800)));
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
        ctx.fillStyle = "#000000AA";
        generateUIOverlay(0.05,0.5,0.2);

        ctx.font = "20px Arial";
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#000000";
        fT("Congratulations, you have completed all JMC™ Mining Initative quotas.", canW/2,canH * 0.2);
        fT("Due to the costs of JMC™ Craft recovery, you have been offered an", canW/2,25 + canH * 0.2);
        fT("involutary position as head of planetary excavations.", canW/2,50 + canH * 0.2);
        fT("Thanks for playing!", canW/2,canH * 0.45);
        if(gameData[1] >= 1.5){
            fT("Press E to enter endless mode",canW/2,25 + canH * 0.45);
            gameData[19] = inputs.inter == true && prevInputs.inter == false;
            finishedQuotas = !gameData[19];
        }
    }

    if(gameData[6] <= 0 && !playerDeadState){
        playerDeadState = true;
        s([soundFxVolume,,160,.01,.2,.04,2,,-0.1,.1,-100,.1]);
    }
    prevPlayerEnergy = gameData[6];

    gameData[1] += !playerDeadState ? frameSpeedFactor/1500 : 0;

    if(gameData[1] > 359){

        if(!(finishedQuotas || gameData[19])){
            if(gameData[5] >= quotas[gameData[2]]){
                gameData[5] -= quotas[gameData[2]];
                finishedQuotas = gameData[2] == 6;
                finishedQuotas ? s([soundFxVolume,0,220,,2,.08,1.5,,,,50,.07,.1,,,,.01]) : s([soundFxVolume,0,160,,1,.04,2,,,,25,.07,.03,,,,.01]);
            } else {
                failedQuota = true;
                s([soundFxVolume,,299,.01,.03,1.95,3,.1,.9,.6,,,,.5,.9,.6,,.52,.06]);
                s([soundFxVolume,0,160,,1.25,.04,2,,,,-25,.25,.01,,,,.01]);
            }
        }

        gameData[2] += 1;
        gameData[1] = 0;
    }
}

function handleInput(){

    if(!buildMode && !escMenu && !selectingSell && !buyingMode && !settingRecipe){
        //If not in any modes then update position based on input
        Math.abs(playerPosOffset.x) < 15 && Math.abs(playerPosOffset.y) < 15 ? inputs.up == true ? updatePlayerPos(0,-1) : inputs.down == true ? updatePlayerPos(0,1) : inputs.right == true ? updatePlayerPos(1,0) : inputs.left == true ? updatePlayerPos(-1,0) : null : null;
    } else {
        //If in a mode, all other moves up & down produce beep
        if(inputs.up == true && prevInputs.up == false || inputs.down == true && prevInputs.down == false){ s([])};
    }

    if(buildMode){
        selectedBuilding = inputs.up == true && prevInputs.up == false ? Math.max(0,selectedBuilding - 1) : inputs.down == true && prevInputs.down == false ? Math.min(gameData[4].length - 1,selectedBuilding + 1) : selectedBuilding;
    }

    if(settingRecipe){
        selectedBuilding = inputs.up == true && prevInputs.up == false ? Math.max(0,selectedBuilding - 1) : inputs.down == true && prevInputs.down == false ? Math.min(gameData[7].length - 1,selectedBuilding + 1) : selectedBuilding;
    }
    if(selectingSell){
        selectedSell = inputs.up == true && prevInputs.up == false ? Math.max(0,selectedSell - 1) : inputs.down == true && prevInputs.down == false ? Math.min(prices.filter(p => gameData[3].some(r => p.type == r.type && r.value >= p.ammount)).length - 1,selectedSell + 1) : selectedSell;
    }
    if(buyingMode){
        selectedBuy = inputs.up == true && prevInputs.up == false ? Math.max(0,selectedBuy - 1) : inputs.down == true && prevInputs.down == false ? Math.min(gameData[8].length - 1,selectedBuy + 1) : selectedBuy;
        if(inputs.inter == true && prevInputs.inter == false){handleShop()}
    }
    if(inputs.shop == true && prevInputs.shop == false && !buildMode && !settingRecipe && !selectingSell){
        buyingMode = !buyingMode;
    }

    if(inputs.inter == true && !buildMode && !escMenu && !buyingMode){
        if(prevInputs.inter == false){
            interactTimer = 0;
        }
        if(interactTimer == 0){
            if(tileWithPlayer.resource.type != "NONE" && tileWithPlayer.building.type == "NONE"){
                if(addToPlayerResources(tileWithPlayer.resource.type,1) > 0){
                    mineTile(tileWithPlayer);
                    s([soundFxVolume,0.02,320,.01,,0,4,.1,,,,,,,,.2,.01,0,.01]);
                } else {
                    messages.push({text:"Resource full",time:0});
                }
            } else if(tileWithPlayer.building.type != "NONE"){
                handleBuildingInteraction();
            }
        }
        interactTimer = interactTimer >= 1 ? 0 : interactTimer + (frameSpeedFactor/100);
    }

    //If B is pressed and not in any modes and player has buildings
    if(inputs.build == true && prevInputs.build == false && !settingRecipe && !escMenu && !selectingSell && !buyingMode){
        if(gameData[4].length == 0){
            messages.push({text:"No Buildings",time:0});
        } else {
            selectedBuilding = 0;
            buildMode = !buildMode;
        }
    }

    if(buildMode && inputs.inter == true && prevInputs.inter == false && gameData[0].some(t => t.hasPlayer && t.building.type == "NONE")){
        placeBuilding(tileWithPlayer ,gameData[4][selectedBuilding]);
        buildMode = false;
        selectedBuilding = 0;
    }

    if(inputs.remove == true && prevInputs.remove == false && gameData[0].some(t => t.hasPlayer && t.building.type != "NONE")){
        removeBuilding(tileWithPlayer);
    }

    if(inputs.esc == true && prevInputs.esc == false){
        if(buildMode || selectingSell || buyingMode || settingRecipe){
            buildMode = false;
            selectingSell = false;
            buyingMode = false;
            settingRecipe = false;
            selectedBuilding = 0;
            selectingSell = 0;
        } else {
            escMenu = true;
        }
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
        var opt = menuItems[selectedMenuItem];
        escMenu = !(opt == "Resume");
        if(opt == "Main Menu"){
            mainMenu = true;
            escMenu = false;
            runGameBool = false;
            selectedMenuItem = 0;
        }
        if(opt == "Save Game"){
            window.localStorage.setItem('Planet404_6473_DATA', JSON.stringify(gameData));
            messages.push({text:"Game Saved",time:0});
            escMenu = false;
        }
        if(opt == "Load Game"){
            if(window.localStorage.getItem('Planet404_6473_DATA') != null){
                loadGame();
            } else {
                messages.push({text:"Game Save not found",time:0});
            }
            escMenu = false;
        }
        if(opt == "Toggle Music"){
            if(musicToggle){
                myAudioNode.disconnect();
            } else {
                myAudioNode.connect(zzfxX.destination);
            }
            musicToggle = !musicToggle;
        }
        if(opt == "Toggle Sound FX"){
            soundFxVolume = soundFxVolume == 0 ? 0.5 : 0;
        }
        confirmSound();
    }
}

function loadGame() {
    buildMode = false;
    selectingSell = false;
    buyingMode = false;
    settingRecipe = false;

    selectedBuilding = 0;
    selectingSell = 0;

    gameData = JSON.parse(window.localStorage.getItem('Planet404_6473_DATA'));

    tileWithPlayer = gameData[0].find(t => t.hasPlayer);
    updatePlayerPos(0,0);
    prevPlayerEnergy = gameData[6];
}

function handleShop(){
        if(gameData[5] >= gameData[8][selectedBuy].cost){
            gameData[5] -= gameData[8][selectedBuy].cost;
            //Update price based on multiplier
            gameData[8][selectedBuy].cost = gameData[8][selectedBuy].costMulti != null ? Math.round(gameData[8][selectedBuy].cost * gameData[8][selectedBuy].costMulti) : gameData[8][selectedBuy].cost;
            var item = gameData[8][selectedBuy].item;
            if(item == "RESOURCE STORAGE"){gameData[11] = Math.round(gameData[11] * 1.25)}
            if(item == "BATTERY EFFICENCY"){gameData[9] *= 1.2}
            if(item == "CRAFT HEIGHT TOLERANCE"){gameData[10] += 1}
            
            if(item == "CONSTRUCTOR SPEED"){gameData[14] *= 1.3}

            gameData[17] = item == "CONSTRUCTOR TRANSMITTER";
            gameData[16] = item == "MINER TRANSMITTER";
            if(item == "MINER TRANSMITTER" || item == "CONSTRUCTOR TRANSMITTER"){gameData[8].splice(selectedBuy,1)};

            if(item == "MINER SPEED"){gameData[15] *= 1.5}
            if(item == "RTG OUTPUT"){gameData[18] += 1};
            if(item == "SOLAR OUTPUT"){gameData[13] += 1};
            if(item == "RADAR RADIUS"){gameData[12] += 1};
            if(item == "RADAR RADIUS"){updateRadarVisableTiles()}

            if(item == "CONSTRUCTOR"){ 
                gameData[7].push({product:"CONSTRUCTOR",items:[{type:"IRON",value:10},{type:"COPPER",value:15}],energy:4});
                gameData[8].splice(selectedBuy,1);
            }
            if(item == "MINER"){ 
                gameData[7].push({product:"MINER",items:[{type:"IRON",value:10},{type:"COPPER",value:15}],energy:4});
                gameData[8].splice(selectedBuy,1);
            }
            if(item == "SOLAR"){ 
                gameData[7].push({product:"SOLAR",items:[{type:"IRON",value:10},{type:"COPPER",value:15}],energy:4});
                gameData[8].splice(selectedBuy,1);
            }
            if(item == "RTG"){ 
                gameData[7].push({product:"RTG",items:[{type:"IRON",value:10},{type:"COPPER",value:15}],energy:4});
                gameData[8].splice(selectedBuy,1);
            }

            confirmSound();
        } else {
            messages.push({text:"Cannot afford " + gameData[8][selectedBuy].item,time:0});
            denySound();
        }
}

function handleBuildingInteraction(){
    switch(tileWithPlayer.building.type){
        case "CONSTRUCTOR":
            if(settingRecipe){
                if(tileWithPlayer.building.energy >= gameData[7][selectedBuilding].energy){
                    var recipeItems = gameData[7][selectedBuilding].items;
                    if(recipeItems.filter(i => gameData[3].some(ii => ii.type == i.type && ii.value >= i.value)).length == recipeItems.length){
                        tileWithPlayer.building.recipe = Object.assign({},gameData[7][selectedBuilding]);

                        gameData[3].forEach(i => {
                            var recipeItem = recipeItems.find(ii => ii.type == i.type);
                            i.value -= recipeItem != null ? recipeItem.value : 0;
                        });

                        messages.push({text:"Crafting " + tileWithPlayer.building.recipe.product,time:0});
                        tileWithPlayer.building.processing = true;
                        tileWithPlayer.building.energy -= gameData[7][selectedBuilding].energy;
                        settingRecipe = false;
                        confirmSound();
                    } else {
                        messages.push({text:"Missing resources",time:0});
                        denySound();
                    }
                } else {
                    messages.push({text:"Not enough energy",time:0});
                }
            }
            if(tileWithPlayer.building.recipe == null){
                settingRecipe = true;
                selectedBuilding = 0;
            }
            if(tileWithPlayer.building.storedProduct){
                addToPlayerBuildings(tileWithPlayer.building.recipe.product,1);
                messages.push({text:"Gained " + tileWithPlayer.building.recipe.product,time:0});
                tileWithPlayer.building.storedProduct = false;
                tileWithPlayer.building.recipe = null;
                tileWithPlayer.building.timer = 0;
                confirmSound();
            }
            break;
        case "MINER":
            if(!gameData[16]){
                if(tileWithPlayer.building.storedResource > 0) {
                    var added = addToPlayerResources(tileWithPlayer.building.storedType,tileWithPlayer.building.storedResource);
                    if(added == 0){
                        denySound();
                        messages.push({text:"Resource full",time:0});
                    } else {
                        tileWithPlayer.building.storedResource -= added;
                        messages.push({text:"Gained " + added + " " + tileWithPlayer.building.storedType,time:0});
                        confirmSound();
                    }
                }
            }
            break;
        case "TELEDEPOT":
            if(selectingSell){
                var price = prices.filter(p => gameData[3].some(r => p.type == r.type && r.value >= p.ammount))[selectedSell];
                gameData[3].find(r => r.type == price.type).value -= price.ammount;
                gameData[5] += price.ammount * price.price;
                s([soundFxVolume,.01,287,.11,,0,3,.01,,,198,.09,,,,,.06,.5]);
            } else {
                selectedSell = 0;
                selectingSell = true;
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
    var rightHeight = rightInfoHeight + (rightInfoStep * gameData[3].length) + canH * 0.05;
    generateHudOverlay(rightHeight);

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
    gameData[3].forEach(r => {
        fT(r.value + "/" + gameData[11] + " units of " + r.type,canW * 0.92, 25 + rightInfoHeight + (gameData[3].indexOf(r) * rightInfoStep));
    });
    
    fT("Sol: " + (gameData[2] + 1) + " Planet Rotation: " + gameData[1].toFixed(0) + "°", canW/2,15);

    if(!buildMode && !settingRecipe && !selectingSell && !buyingMode && (gameData[1] <= 5 || gameData[1] >= 355)){
        ctx.fillStyle = "#000000AA";
        var fade = componentToHex(255 - (255 * Math.min(Math.abs(360 - gameData[1]),gameData[1])/5));
        ctx.strokeStyle = "#FFFFFF" + fade;
        generateUIOverlay(0.05,0.14,0.39);
        ctx.font = "30px Tahoma";
        ctx.fillStyle = "#FFFFFF" + fade;
        fT("Sol " + (gameData[2] + 1) + "/7",canW/2,modeHeight);
    }

    ctx.strokeStyle = "#FFFFFF";
    if(buildMode){
        ctx.fillStyle = "#000000AA";
        generateUIOverlay(0.05,0.5,0.4);
        ctx.font = "30px Tahoma";
        ctx.fillStyle = "#FFFFFF";
        fT("Build Mode",canW/2,modeHeight);
        ctx.font = "20px Tahoma";
        var visableOptions = gameData[4].filter(p => Math.abs(gameData[4].indexOf(p) - selectedBuilding) < 5 + (Math.max(0,4 - selectedBuilding)));
        visableOptions.forEach(p => {
            ctx.fillStyle = selectedBuilding == gameData[4].indexOf(p) ? "#FFFFFF" : "#AAAAAA";
            fT(p.type + ":" + p.value ,canW/2,modeHeight + selectionHeight + (25 * visableOptions.indexOf(p)))
        });
    }

    if(settingRecipe){
        ctx.fillStyle = "#000000AA";
        generateUIOverlay(0.05,0.5,0.3);
        ctx.fillStyle = "#FFFFFF";
        drawLines([{x:canW * 0.5,y:canH * 0.07},{x:canW * 0.5,y:canH * 0.53}],0,0,false);
        ctx.font = "30px Tahoma";
        fT("Set Recipe:",canW*0.4,modeHeight + (canW*0.01));
        ctx.font = "20px Tahoma";
        var visableOptions = gameData[7].filter(p => Math.abs(gameData[7].indexOf(p) - selectedBuilding) < 5 + (Math.max(0,4 - selectedBuilding)));
        visableOptions.forEach(r => {
            ctx.fillStyle = selectedBuilding == gameData[7].indexOf(r) ? "#FFFFFF" : "#AAAAAA";
            if(r.product == "EXIT"){
                fT(r.product,canW*0.4,modeHeight + (canW*0.01) + selectionHeight + (25 * visableOptions.indexOf(r)));
            } else {
                if(selectedBuilding == gameData[7].indexOf(r)){
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
        var options = prices.filter(p => gameData[3].some(r => p.type == r.type && r.value >= p.ammount) || p.type == "EXIT");
        var visableOptions = options.filter(p => Math.abs(options.indexOf(p) - selectedSell) < 5 + (Math.max(0,4 - selectedSell)));
        visableOptions.forEach(p => {
            ctx.fillStyle = selectedSell == options.indexOf(p) ? "#FFFFFF" : "#AAAAAA";
            fT(p.type != "EXIT" ? p.ammount + " " + p.type + " : ₿" + p.price * p.ammount : p.type,canW/2,modeHeight + selectionHeight + (25 * visableOptions.indexOf(p)));
        });
    }

    if(buyingMode){
        ctx.fillStyle = "#000000AA";
        generateUIOverlay(0.05,0.5,0.2);
        ctx.fillStyle = "#FFFFFF";
        drawLines([{x:canW * 0.5,y:canH * 0.07},{x:canW * 0.5,y:canH * 0.53}],0,0,false);
        drawLines([{x:canW * 0.5,y:canH * 0.46},{x:canW * 0.78,y:canH * 0.46}],0,0,false);
        ctx.font = "30px Tahoma";
        fT("Buy Mode",canW * 0.36,modeHeight);
        ctx.font = "20px Tahoma";
        var visableOptions = gameData[8].filter(p => Math.abs(gameData[8].indexOf(p) - selectedBuy) < 5 + (Math.max(0,4 - selectedBuy)));
        visableOptions.forEach(i => {
            ctx.fillStyle = selectedBuy == gameData[8].indexOf(i) ? "#FFFFFF" : "#AAAAAA";
            ctx.textAlign = "center";
            fT(i.item ,canW * 0.36,modeHeight + 20 + selectionHeight + (25 * visableOptions.indexOf(i)));
            if(selectedBuy == gameData[8].indexOf(i)){
                fT("₿" + selectedSellDisplayPrice.toLocaleString('en-US', {maximumFractionDigits: 0}) ,canW * 0.64,canH * 0.495);
                ctx.textAlign = "start";
                i.desc.forEach(s => fT(s ,canW * 0.51,modeHeight + 20 + selectionHeight + (25 * i.desc.indexOf(s))));
            }
            
        });
        selectedSellDisplayPrice = lerp(gameData[8][selectedBuy].cost,selectedSellDisplayPrice,(frameSpeedFactor/80));
    }

    ctx.textAlign = "center"; 
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "20px Tahoma";
    fT("JMC",canW * 0.05,canH * 0.14);
    drawLogo(canW * 0.05,canH * 0.070,50);
    ctx.font = "25px Tahoma";
    fT("₿" + playerBalanceDisplayed.toLocaleString('en-US', {maximumFractionDigits: 0}) ,canW * 0.05,canH * 0.18);
    playerBalanceDisplayed = lerp(gameData[5],playerBalanceDisplayed,(frameSpeedFactor/100));

    ctx.font = "20px Tahoma";
    if(gameData[19]){
        fT("Endless",canW * 0.05,canH * 0.22);
        fT("Mode",canW * 0.05,25 + canH * 0.22);
    } else {
        fT("Daily Quota:",canW * 0.05,canH * 0.22);
        ctx.font = "25px Tahoma";
        ctx.fillStyle = gameData[5] >= quotas[gameData[2]] ? "#00FF00" : gameData[1] > 300 && Math.trunc(gameData[1]) % 2 == 0 ? "#FF0000" : "#FFFFFF";
        fT("₿" + quotas[gameData[2]].toLocaleString('en-US', {maximumFractionDigits: 0}) ,canW * 0.05,canH * 0.26);
    }

    ctx.lineWidth = 2;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "15px Tahoma";
    var batteryStatusHeight = 0.45;
    drawBattery(canW * 0.02,canH * batteryStatusHeight,100,gameData[6]/gameData[9]);
    ctx.fillStyle = hudSwap ? "#FF0000" : "#FFFFFF";
    fT("Battery",canW * 0.07,canH * (batteryStatusHeight - 0.13));
    fT("Status:",canW * 0.07,canH * (batteryStatusHeight - 0.11));
    var percentEnergy = gameData[6]/gameData[9];
    ctx.font = "12px Tahoma";
    fT(batteryStatusMessage,canW * 0.07,canH * (batteryStatusHeight - 0.09));
    ctx.fillStyle = "#FFFFFF";
    if(gameData[0].find(t => t.hasPlayer).hazard > 0){
        ctx.font = "50px Tahoma";
        fT("☢",canW * 0.07,canH * (batteryStatusHeight - 0.032));
    }

    batteryStatusMessage = gameData[6] <= 5 ? "Deadly" : 
    gameData[6] <= 10 ? "Critical" : 
    gameData[6] <= 15 ? "Very Low" : 
    percentEnergy > 0.6 ? "Nominal" :
    percentEnergy > 0.4 ? "Satisfactory" :
    percentEnergy > 0.3 && gameData[6] > 15 ? "Low" : batteryStatusMessage;

    hudFlash = flashRates.has(batteryStatusMessage);
    hudFlashTimer += hudFlash ? frameSpeedFactor/flashRates.get(batteryStatusMessage) : 0;
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

            var totalEnergy = gameData[13] * Math.max(0.5,Math.sin(gameData[1] * Math.PI/180));

            if(t.hasPlayer){
                gameData[6] = Math.min(gameData[9],gameData[6] + totalEnergy * (frameSpeedFactor/1000))
            }
            //Filter by hasPlayer and player energy so that surrounding tiles aren't powered if charging player
            var surrounding = getSurroundingTiles(t).filter(tt => tt.building.energy != null && tt.building.energy != tt.building.maxEnergy && (!t.hasPlayer || !(t.hasPlayer == gameData[6] < gameData[9])));
            surrounding.forEach(tt => tt.building.energy = Math.min(tt.building.maxEnergy,tt.building.energy + (totalEnergy / surrounding.length) * (frameSpeedFactor/1000)));

            if(t.hasPlayer && !escMenu){
                fT("⚡",infoX ,infoY + infoStep);
                drawBattery(infoX,infoY + (infoStep*2) + canH * 0.08,canH * 0.1,totalEnergy/gameData[13]);
            }
            break;
        case "CONSTRUCTOR":
            t.building.timer += t.building.processing ? (frameSpeedFactor/15000) * gameData[14] : 0;
            if(t.building.timer >= 1){
                t.building.processing = false;
                t.building.storedProduct = true;
            }
            if(gameData[17] && t.building.storedProduct){
                addToPlayerBuildings(t.building.recipe.product,1);
                t.building.recipe = null;
                t.building.timer = 0;
                t.building.storedProduct = false;
            }   

            if(t.hasPlayer && !escMenu){
                fT("Recipe: " + (t.building.recipe != undefined ? t.building.recipe.product : "None") ,infoX,infoY);
                fT("⚡",infoX ,infoY + infoStep);
                ctx.fillStyle = t.building.storedProduct ? "#00FF00" : ctx.fillStyle;
                fT("%",(infoX + 12) + (canH * 0.1) * 0.25,infoY + infoStep);
                drawBattery(infoX,infoY + (infoStep*2) + canH * 0.08,canH * 0.1,t.building.energy/t.building.maxEnergy);
                drawBattery(10 + infoX + (canH * 0.1) * 0.25, infoY + (infoStep*2) + canH * 0.08,canH * 0.1,t.building.timer);
            }
            break;
        case "MINER":
            if(!t.building.processing && t.building.energy >= 1 && t.resource.type != "NONE" && t.building.storedResource < t.building.maxStored){
                    t.building.energy -= 1;
                    t.building.processing = true;
            } 
            t.building.timer += t.building.processing ? (frameSpeedFactor/9000) * gameData[15] : 0;
            if(t.building.timer >= 1){
                t.building.storedResource += 1;
                t.building.processing = false;
                t.building.timer = 0;
                t.counter += 1;
            }
            if(t.counter == 10){
                mineTile(t);
                t.counter = 0;
            }
            t.building.storedResource -= gameData[16] ? addToPlayerResources(t.building.storedType,t.building.storedResource) : 0;

            if(t.hasPlayer && !escMenu){
                fT("⚡",infoX,infoY + infoStep);
                fT("%",(12 + infoX) + (canH * 0.1) * 0.25,infoY + infoStep);
                fT("⨆",(24 + infoX) + (canH * 0.1) * 0.5,infoY + infoStep);
                drawBattery(infoX,infoY + (infoStep*2) + canH * 0.08,canH * 0.1,Math.min(1,t.building.energy/t.building.maxEnergy));
                drawBattery(10 + infoX + (canH * 0.1) * 0.25, infoY + (infoStep*2) + canH * 0.08,canH * 0.1,t.building.timer);
                drawBattery(20 + infoX + (canH * 0.1) * 0.5, infoY + (infoStep*2) + canH * 0.08,canH * 0.1,t.building.storedResource/t.building.maxStored);
            }
            break;
        case "RTG":
            if(t.hasPlayer){
                gameData[6] = Math.min(gameData[9],gameData[6] + gameData[18] * (frameSpeedFactor/1000))
            }
            //Filter by hasPlayer and player energy so that surrounding tiles aren't powered if charging player
            var surrounding = getSurroundingTiles(t).filter(tt => tt.building.energy != null && tt.building.energy != tt.building.maxEnergy && (!t.hasPlayer || !(t.hasPlayer == gameData[6] < gameData[9])));
            surrounding.forEach(tt => tt.building.energy = Math.min(tt.building.maxEnergy,tt.building.energy + (gameData[18] / surrounding.length) * (frameSpeedFactor/1000)));
            break;
    }
}

document.addEventListener('keydown', (e) => {
    setInputArr(e.keyCode,true);
});
document.addEventListener('keyup', (e) => {
    setInputArr(e.keyCode,false);
});

function setInputArr(k,b){
    if(k == 87){inputs.up = b};
    if(k == 83){inputs.down = b}
    if(k == 68){inputs.right = b}
    if(k == 65){inputs.left = b}
    if(k == 69){inputs.inter = b}
    if(k == 66){inputs.build = b}
    if(k == 82){inputs.remove = b}
    if(k == 27){inputs.esc = b}
    if(k == 16){inputs.speve = b}
    if(k == 81){inputs.shop = b}
}

setInterval(gameloop,50);