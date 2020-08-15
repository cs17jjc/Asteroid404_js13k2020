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
}