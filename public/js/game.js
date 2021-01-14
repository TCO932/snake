window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.onload = function (){

    const canvas = new Canvas({
        id: "canvas",
        WIDTH: 500,
        HEIGHT: 500,
        SPLIT: 10
    });

    snake = new Snake(0, 0, 5, 1);
    fruit = new Fruit(20, 20);
    
    window.addEventListener("keydown", onKeyDown, false);

    //Движения змеи(игрока)
    function onKeyDown(event){
        var keyCode = event.keyCode;
        snake.ChangeDir(keyCode);
    }

    //Появление фруктов

    //Игровой процесс
    let game = true;
    let FPS = 0;
    let FPSout = 0;
    let timestamp = (new this.Date()).getTime();
    //console.log(snake.coord);
    //Обновление отрисовки
    (function animloop() {
        if (game){
            FPS++;
            const currentTimestamp = (new Date()).getTime();
            if (currentTimestamp - timestamp >= 1000) {
                timestamp = currentTimestamp;
                FPSout = FPS;
                FPS = 0;
            }

            //Движение змеи
            snake.Move();
            //Перемещение на случай выхода из экрана
            if(snake.coord[0].x > canvas.fieldW){
                snake.coord[0].x = 0
            }
            if(snake.coord[0].y > canvas.fieldH){
                snake.coord[0].y = 0
            }
            if(snake.coord[0].x < 0){
                snake.coord[0].x = canvas.fieldW;
            }
            if(snake.coord[0].y < 0){
                snake.coord[0].y = canvas.fieldH;
            }

             //Проверка на столкновение змеи с собой
             for (let i = 1; i < snake.size; i++){
                if (snake.coord[0].x == snake.coord[i].x && snake.coord[0].y == snake.coord[i].y){
                    game = false;
                    alert("You are dead");
                }
            }

            //Проверка на столкновение с едой
            if (snake.coord[0].x == fruit.x && snake.coord[0].y == fruit.y){
                fruit.eat(50, 50);
                snake.grow();
            }

            render();//рисуем сцену
            requestAnimFrame(animloop); //зацикливаем отрисовку
            canvas.drawText(10, 10, "Score: " + fruit.count);
    }})();

    //Отрисовка изображения
    function render() {
        canvas.clear();
        canvas.drawSnake(snake);
        canvas.drawFruit(fruit);
    }

};
