import axios from "axios";
const instance = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = JSON.parse(localStorage.getItem('token'));
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token['access-token'];  // for Spring Boot back-end
        //config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
  
      if (!originalConfig.url.includes('auth') && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
  
          try {
            const token = JSON.parse(localStorage.getItem('token'));
            const rs = await instance.post("/auth/refresh-token", {
              refreshToken: token['refresh-token'],
            });
  
            const { accessToken } = rs.data;
            token['access-token'] = accessToken
            localStorage.setItem('token',JSON.stringify(token));
  
            return instance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
  
      return Promise.reject(err);
    }
  );
  export default instance;