import apiClient from "./Axios.ts";
// Function to fetch items from the API
export const fetchItems = async () => {
    try {
        const response = await apiClient.get('/items'); // Adjust the endpoint as needed

        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
};