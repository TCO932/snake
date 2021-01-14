class Snake{
    constructor(x, y, size, dir){
        this.interval = 0;
        this.maxinterval = 3;
        this.size = size;
        this.dir = dir;
        this.coord = [];
        for (let i = 0; i < size; i++){
            //Координаты сегмента змеи
            this.coord[i] = new Point(x, y + i);
        }
       // this.tailcoord = [];
        //this.tailcoord[0] = 0;
        //this.tailcoord[1] = 0;
    }

    //Изменение направления движения
    ChangeDir(keyCode){
        switch(keyCode){
            case 68:  //d
                if(this.dir != 2){
                    this.dir = -2;
                }
                break;
            case 83:  //s
                if(this.dir != 1){
                    this.dir = -1;
                }
               // this.dir = -1;
                break;
            case 65:  //a
                if(this.dir != -2){
                    this.dir = 2;
                }
                //this.dir = 2;
                break;
            case 87: //w
                if(this.dir != -1){
                    this.dir = 1;
                }
              //  this.dir = 1;
                break;
        }
    }

    //Движение
    Move(){
        if (this.interval == this.maxinterval){
            this.interval = 0;

            //Присвоение хвоста
          //  this.tailcoord[0] = this.coord[this.size - 1].x;
          //  this.tailcoord[1] = this.coord[this.size - 1].y;
            //Изменение координат тела
            for (let i = this.size - 1; i > 0; i--){
                this.coord[i].x = this.coord[i - 1].x;
                this.coord[i].y = this.coord[i - 1].y;
            }
            //Изменение позиции головы
            switch(this.dir){
                case 2:
                    this.coord[0].x--
                    break
                case -2:
                    this.coord[0].x++
                    break
                case 1:
                    this.coord[0].y--
                    break
                case -1:
                    this.coord[0].y++
                    break
            }
        }
        this.interval++
    }
    //Рост змеи
    grow(){
        let i = 0;
        let j = 0;
        switch(this.dir){
            case 2:
                i = 1;
                break
            case -2:
                i = -1;
                break
            case 1:
                j = -1;
                break
            case -1:
                j = + 1;
                break
        }
        let x =  this.coord[this.size - 1].x;
        let y =  this.coord[this.size - 1].y;
        this.coord[this.size] = new Point(x + i, y + j);
        this.size++
    }
}