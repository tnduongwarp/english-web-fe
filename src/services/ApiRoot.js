export default class ApiRoot {
    static baseUrl = "http://localhost:3000";

    static async getRequestBase(url, query = undefined) {
        url = this.baseUrl + url;
        if(query !== undefined && query !== null) {
            url = url + new URLSearchParams(query);
        }
        return await fetch(url, {
            method: "GET"
        })
        .then(async (response) => await response.json())
        .then((data) => data)
        .catch((err) => err);
    }

    static async postRequestBase(url, data) {
        url = this.baseUrl + url;
        return await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
        .then( async (response) =>  await response.json())
        .then((data) => data)
        .catch((err) => err);
    }

    static async putRequestBase(url, data, query = undefined) {
        url = this.baseUrl + url;
        if(query !== undefined && query !== null) {
            url = url + new URLSearchParams(query);
        }
        return await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(data | {})
        })
        .then( async (response) => await response.json())
        .then((data) => data)
        .catch((err) => err);
    }

    static async deleteRequestBase(url, query = undefined) {
        url = this.baseUrl + url;
        if(query !== undefined && query !== null) {
            url = url + new URLSearchParams(query);
        }
        return await fetch(url, {
            method: "DELETE"
        })
        .then(async (response) => await response.json())
        .then((data) => data)
        .catch((err) => err);
    }
}