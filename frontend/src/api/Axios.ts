import axios from 'axios';
// import { useHistory } from 'react-router-dom'; // For redirection (if using React Router)

// Create an Axios instance with a base URL
const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // Replace with your API base URL
});

// Add a request interceptor to include JWT token in headers (except for login and register)
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');

        // console.log('Request URL:', config.url); // Logs the URL
        // console.log('Request Method:', config.method); // Logs the method (GET, POST, etc.)
        // console.log('Request Headers:', config.headers); // Logs the headers
        // console.log('Request Body:', config.data); // Logs the body (for POST, PUT requests)// Get the JWT from localStorage (or context if needed)

        console.log(config)

        // Skip adding token for login and register endpoints
        if (token && config.url !== '/login' && config.url !== '/register') {
            config.headers.Authorization = `Bearer ${token}`;
            console.log(token)
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle expired token (401 Unauthorized)
apiClient.interceptors.response.use(
    (response) => response, // Return the response if no error
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token has expired or is invalid, clear token and redirect to login page
            localStorage.removeItem('jwtToken');
            // If you're using React Router, you can redirect to login page
            // Here, use history.push for redirection to the login page
            // const history = useHistory();
            // history.push('/login');
        }

        return Promise.reject(error);
    }
);

export default apiClient;
