window.onload = function () {

    
    const reg_btn = document.getElementById('reg_btn');
    const login_btn = document.getElementById('login_btn');
    const logout_btn = document.getElementById('logout_btn');
    const names = Array.from(document.querySelectorAll('.names'));
    const scores = Array.from(document.querySelectorAll('.scores'));
    
    const server = new Server();

    if (login_btn) {
        login_btn.addEventListener('click', async function () {
            const login = document.getElementById('login').value;
            const password = document.getElementById('password').value;
            console.log('вход');
            console.log(login, password);
            const result = await server.login({ login, password });
            if (result) {
                console.log('вход: ок');
                document.location.href = "./game.html";
            } else {
                console.log('вход: неок');
            }
        })
    }

    if (reg_btn) {
        reg_btn.addEventListener('click', async function () {
            const name = document.getElementById('reg_name').value;
            const login = document.getElementById('reg_login').value;
            const password = document.getElementById('reg_password').value;
            console.log('регистрация');
            console.log(name, login, password);
            const result = await server.registration({ name, login, password });
                if (result) { // регистрация и логин успешные, войти в игру
                    console.log('регистрация: ок -> вход');
                    document.location.href = "./game.html";
                } else { // показать сообщение об ошибке
                    console.log('регистрация: неок');
                }
        })
    }

    if (logout_btn) {
        logout_btn.addEventListener('click', async function () {
            console.log('выход');
            const result = await server.logout();
                if (result) { 
                    console.log('выход: ок -> выход');
                    document.location.href = "./index.html";
                } else { 
                    console.log('выход: неок');
                }
        })
    }

    //console.log(names, scores);
    
    async function getRecords() {
        const records = await server.getRecords();
        if (names.length != 0 && scores.length != 0) {
            for (let i = 0; i < 5; i++) {
                names[i].innerHTML = (records[i]) ? (records[i]['name']) : '—';
                scores[i].innerHTML = (records[i]) ? (records[i]['score']) : '—';
            }
        }
    }
    if (names.length != 0 && scores.length != 0) {
        setInterval(() => getRecords(), 2000)
    }
    
    if (document.getElementById('canvas')) {

        setInterval(() => server.sendScore(fruit.count), 2000);

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
    
        let game = true;

        const canvas = new Canvas({
            id: "canvas",
            WIDTH: 500,
            HEIGHT: 500,
            SPLIT: 10
        });
    
        let snake = new Snake(0, 0, 5, 1);
        let fruit = new Fruit(20, 20);
        
        window.addEventListener("keydown", onKeyDown, false);
        but = document.getElementById("restart");
        but.onclick = function(){
            if (!game){
                game = true;
                snake = new Snake(0, 0, 5, 1);
                fruit = new Fruit(20, 20);
            }
        }
    
        //Движения змеи(игрока)
        function onKeyDown(event){
            var keyCode = event.keyCode;
            snake.ChangeDir(keyCode);
        }

        //Игровой процесс
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
    
                //Проверка на столкновение с едой
                if (snake.coord[0].x == fruit.x && snake.coord[0].y == fruit.y){
                    fruit.eat(50, 50);
                    snake.grow();
                }
                //Проверка на столкновение змеи с собой
                for (let i = 1; i < snake.size; i++){
                    if (snake.coord[0].x == snake.coord[i].x && snake.coord[0].y == snake.coord[i].y){
                        game = false;
                        alert("You are dead");
                    }
                }
            }
                render();//рисуем сцену
                requestAnimFrame(animloop); //зацикливаем отрисовку
        })();
    
        //Отрисовка изображения
        function render() {
            canvas.clear();
            canvas.drawSnake(snake);
            canvas.drawFruit(fruit);
            canvas.drawText(10, 10, "Score: " + fruit.count);
        }
    }
}