import ajax from './ajax';
import axios from 'axios';
class AuthService {
	login(username, password) {
		return axios.post("login", {
			username,
			password
		}).then(res => res.data);
	}

	logout() {
		return axios.get('logout').then((res) => res.data);
	}

	checkUsername(username) {
		return axios.get('checkUsername?name=' + username).then((res) => res.data);
	}

	checkInviteCode(code) {
		return axios.get('checkInviteCode?code=' + code).then(res => res.data);
	}

	generateInvitationCode(limit) {
		return ajax.get('/invite', { limit });
	}

	reset(password, new_password) {
		return ajax.post('/password', {
			password,
			new_password
		});
	}

	getSelf() {
		return ajax.get('/getself');
	}
}

export default new AuthService();