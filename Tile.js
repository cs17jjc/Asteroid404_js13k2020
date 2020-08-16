class Tile {
    constructor(x,y,colours,resource,biome){
        this.x = x;
        this.y = y;

        switch(biome){
            case 0:
                //Flatlands
                var heightNumber = Math.min(6,Math.max(4,Math.trunc(Math.abs((noise.perlin2(x/5, y/5)+1)/2 * 10))));
                this.height = tileStepHeight * heightNumber;
                this.colour = colours.find(c => c.levels.includes(heightNumber)).colour;
                break;
            case 1:
                //Bumpy
                var heightNumber =  Math.trunc(Math.abs((noise.perlin2(x/4, y/4)+1)/2 * 10));
                this.height = tileStepHeight * heightNumber;
                this.colour = colours.find(c => c.levels.includes(heightNumber)).colour;
                break;
            case 2:
                //Lowlands
                var heightNumber =  Math.min(5,Math.max(0,Math.trunc(Math.abs((noise.perlin2(x/5, y/5)+1)/2 * 10))) - 1);
                this.height = tileStepHeight * heightNumber;
                this.colour = colours.find(c => c.levels.includes(heightNumber)).colour;
                break;
        }
        this.hasPlayer = false;
        this.resource = resource;
        this.building = null;
    }
}