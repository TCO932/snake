class Fruit{
    constructor(x, y){
        this.count = 0;
        this.x = x;
        this.y = y;
    }
    eat(maxW, maxH){
        this.count++
        this.x = Math.floor(Math.random() * maxW);
        this.y = Math.floor(Math.random() * maxH);
    }
}