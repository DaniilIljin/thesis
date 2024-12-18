import {ItemDTO} from "../shop/dto.ts";
import apiClient from "../shared/Axios.ts";

export const fetchUserItems = (): Promise<ItemDTO[]> => {
    return apiClient.get('/api/items')
        .then(response => response.data)
        .catch(error => {
            console.error(error)
            throw new Error('Failed to fetch items');
        });
};