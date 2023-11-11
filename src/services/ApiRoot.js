export default class ApiRoot {
    baseUrl = "http://localhost:3000";

    async getRequestBase(url, query = undefined) {
        url = this.baseUrl + url;
        if(query !== undefined && query !== null) {
            url = url + new URLSearchParams(query);
        }
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json()).catch(err => console.log(err));
    }

    async postRequestBase(url, data) {
        url = this.baseUrl + url;
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json()).catch(err => console.log(err));
    }

    async putRequestBase(url, data, query = undefined) {
        url = this.baseUrl + url;
        if(query !== undefined && query !== null) {
            url = url + new URLSearchParams(query);
        }
        return fetch(url, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(data | {})
        })
        .then((response) => response.json()).catch(err => console.log(err));
    }

    async deleteRequestBase(url, query = undefined) {
        url = this.baseUrl + url;
        if(query !== undefined && query !== null) {
            url = url + new URLSearchParams(query);
        }
        return fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json()).catch(err => console.log(err));
    }
}