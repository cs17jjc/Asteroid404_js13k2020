class Tile {
    constructor(x,y,colour,resource){
        this.colour = colour;
        this.x = x;
        this.y = y;
        this.height = Math.random() * 10;
        this.hasPlayer = false;
        this.resource = resource;
        this.building = null;
    }
}