window.onload = function () {

    if (localStorage.getItem('token') == )

    const reg_btn = document.getElementById('reg_btn');
    const login_btn = document.getElementById('login_btn');

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
    
}