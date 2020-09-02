
class Tile {
    constructor(x,y,biome){
        this.x = x;
        this.y = y;
        this.biome = biome;
        this.hasPlayer = false;
        this.resource = {type:"NONE"};
        this.building = {type:"NONE"};
        this.highlighted = false;
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