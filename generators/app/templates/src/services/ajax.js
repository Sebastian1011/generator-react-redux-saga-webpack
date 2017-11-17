import axios from 'axios';

class AjaxService {
	get(subPath, data) {
		return axios.get(CONFIGS.apiUrl + subPath, {
			params: data || {}
		}).then(this.handleSuccess, this.handleError);
	}

	post(subPath, data, options) {
		if (!options) {
			options = {};
		}
		if (!options.headers) {
			options.headers = {
				"Content-Type": "application/json;charset=utf-8",
			};
		}
		return axios.post(CONFIGS.apiUrl + subPath, data, options).then(this.handleSuccess, this.handleError);
	}

	upload(subPath, data) {
		return axios.post(CONFIGS.apiUrl + subPath, data).then(this.handleSuccess, this.handleError);
	}

	put(subPath, data) {
		return axios.request({
			method: "put",
			url: CONFIGS.apiUrl + subPath,
			data: data,
			contentType: "application/json;charset=utf-8",
			dataType: 'json'
		}).then(this.handleSuccess, this.handleError);
	}

	delete(subPath, data) {
		let uri = CONFIGS.apiUrl + subPath;
		return axios.request({
			method: "delete",
			url: uri,
			data: JSON.stringify(data),
			dataType: 'json',
			contentType: 'application/json;charset=utf-8'
		}).then(this.handleSuccess, this.handleError);
	}

	handleError(error) {
		// console.log(error);
		if (error.status === 408){
			alert("请求超时！")
		}
		console.error("请求错误:", error);
		throw error;
	}

	handleSuccess(response) {
		return response.data;
	}
}

export default new AjaxService();

