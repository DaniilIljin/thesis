import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');
        if (token && config.url !== '/login' && config.url !== '/register') {
            config.headers.Authorization = `Bearer ${token}`;
            console.log(token)
        }
        return config;
    },
    (error) => {
        console.log(error)
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('jwtToken');
        }
        return Promise.reject(error);
    }
);

export default apiClient;
