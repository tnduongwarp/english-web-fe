export default class ApiRoot {
    static baseUrl = "https://jsonplaceholder.typicode.com";

    static async getRequestBase(url, query = undefined) {
        url = this.baseUrl + url;
        if(query !== undefined && query !== null) {
            url = url + new URLSearchParams(query);
        }
        return await fetch(url, {
            method: "GET"
        })
        .then((response) => response.json())
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
            data: JSON.stringify(data)
        })
        .then((response) => response.json())
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
            data: JSON.stringify(data | {})
        })
        .then((response) => response.json())
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
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => err);
    }
}