class Server {

	constructor(callbackGetRecords) {
		this.token = localStorage.getItem('token');
        this.interval;
        //this.recordsHash = {};
		this.callbackGetRecords = callbackGetRecords || function() {};
		if (this.token) {
            this.interval = setInterval(() => this.getRecords(), 1000);

        }
	}

    async getData(method, data = {}) {
        let url = `api/?method=${method}`;
        if (this.token) {
            url += `&token=${this.token}`;
        }
        const arr = [];
        for (let key in data) {
            arr.push(`${key}=${data[key]}`);
        }
        if (arr.length) {
            url += `&${arr.join('&')}`;
        }
        console.log(url);
        const request = await fetch(url);
        console.log(request);
        const answer = await request.json();
        return (answer && answer.result == 'ok') ? answer.data : false;
    }

    async login(data) {
        const result = await this.getData('login', data);
        if (result && result.token) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('name', result.name);
            this.token = result.token;
        }
        return result;
    }

    logout() {
		clearInterval(this.interval);
		localStorage.setItem('token', '');
        return this.getData('logout');
    }

    async registration(data) {
        const result = await this.getData('registration', data);
        console.log(data);
        if (result && result.token) {
            this.token = result.token;
        }
        return result;
    }
	
	async getRecords() {
		const result = await this.getData('getRecords');
		if (result) {
            //console.log(result);
			//this.recordsHash = result.hash;
			this.callbackGetRecords(result.records);
		}
	}
	
	sendScore(score) {
		this.getData('sendScore', { score });
	}
}