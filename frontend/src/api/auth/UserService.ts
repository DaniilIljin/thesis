import apiClient from "../Axios.ts";
// Service function to fetch user data from a protected route
export const fetchUserData = async () => {
    try {
        const response = await apiClient.get('/user'); // Adjust the endpoint as necessary
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // Rethrow or handle error as needed
    }
};

// Service function to test login (no token required, for login)
export const login = async (credentials: { username: string, password: string }) => {
    try {
        const response = await apiClient.post('/login', credentials); // Login request
        const token = response.data.token;
        localStorage.setItem('jwtToken', token); // Save the token to localStorage
        return response.data; // Return the response with token
    } catch (error) {
        console.error('Login failed:', error);
        throw error; // Rethrow or handle error as needed
    }
};

// Register function
export const register = async (userData: { username: string, password: string }) => {
    try {
        const response = await apiClient.post('/register', userData); // Send register request
        const token = response.data.token;
        localStorage.setItem('jwtToken', token); // Save the token to localStorage
        return response.data; // Return the registration response
    } catch (error) {
        console.error('Registration failed:', error);
        throw error; // Rethrow the error to be handled by the component
    }
};