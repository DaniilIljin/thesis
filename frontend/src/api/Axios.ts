import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');
        if (config.url && !['/login', '/register'].includes(config.url) && !config.url.startsWith('api/shop/')) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log(error)
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error)
        return Promise.reject(error);
    }
);

export default apiClient;
