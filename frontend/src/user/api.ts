import apiClient from "../shared/Axios.ts";

export const login = async (credentials: { username: string, password: string }) => {
    try {
        const response = await apiClient.post('/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

export const register = async (userData: { username: string, password: string }) => {
    try {
        const response = await apiClient.post('/register', userData);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
};