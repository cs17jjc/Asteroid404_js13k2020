class Tile {
    constructor(x,y,colour,resource){
        this.colour = colour;
        this.x = x;
        this.y = y;
        this.height = 5 * Math.trunc(Math.max(0,noise.perlin2(x/5, y/5)) * 10);
        console.log(this.height);
        this.hasPlayer = false;
        this.resource = resource;
        this.building = null;
    }
}