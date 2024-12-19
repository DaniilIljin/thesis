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

export const fetchUserFavorites = (): Promise<ItemDTO[]> => {
    return apiClient.get('/api/items/favorites')
        .then(response => response.data)
        .catch(error => {
            console.error(error)
            throw new Error('Failed to fetch items');
        });
};

export const deleteUserItem = (id: number): Promise<void> => {
    return apiClient.delete(`/api/items/${id}`)
        .then(() => {
            console.log('Item deleted successfully');
        })
        .catch((error) => {
            throw new Error(`Failed to delete item with ID: ${id}`);
        });
};

export const deleteItem = (id: number): Promise<void> => {
    return apiClient.delete(`/api/items/${id}`)
        .then(() => {
            alert('Item deleted successfully');
        })
        .catch(error => {
            throw new Error(`Failed to delete item with ID: ${id}`);
        });
};