import ApiRoot from "./ApiRoot";

export default class Api {
    async login(username, password) {
        return new ApiRoot().postRequestBase("/auth/login", {username, password});
    }

    async signUp(username, password, email) {
        let role = "user";
        return new ApiRoot().postRequestBase("/auth/signUp", {username, password, email, role});
    }

    async refreshToken() {
        
    }

    async loginWithGG(data) {
       return await new ApiRoot().postRequestBase('/auth/login-with-gg',data);
    }

    async logout() {
        return await new ApiRoot().postRequestBase('/auth/logout', {refreshToken:localStorage["refresh-token"]});
    }
}