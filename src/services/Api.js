import api from './axios-api'
class Api{
    async getAllCategory(){
        return api.get('/category');
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new Api();