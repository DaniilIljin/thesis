import {ItemAddDTO, ItemDTO, ItemFullDTO} from "../dto/itemDto.ts";
import apiClient from "./Axios.ts";

export const fetchItems = (
    categoryId?: number,
    brandId?: number,
    sortDirection: 'asc' | 'desc' = 'asc',
    searchQuery:string = ""
): Promise<ItemDTO[]> => {
    const params: any = {};
    if (categoryId) params.categoryId = categoryId;
    if (brandId) params.brandId = brandId;
    if (sortDirection) params.sortDirection = sortDirection;
    if (searchQuery != "") params.searchQuery = searchQuery;
    return apiClient.get('/api/shop/items',  { params })
        .then(response => response.data)
};

export const fetchItemById = (id: number): Promise<ItemFullDTO> => {
    return apiClient.get(`/api/shop/items/${id}`)
        .then(response => {
            return response.data
        })
};

export const fetchUserItems = (): Promise<ItemDTO[]> => {
    return apiClient.get('/api/items')
        .then(response => response.data)
};

export const fetchUserFavorites = (): Promise<ItemDTO[]> => {
    return apiClient.get('/api/items/favorites')
        .then(response => response.data)
};

export const deleteUserItem = (id: number): Promise<void> => {
    return apiClient.delete(`/api/items/${id}`)
        .then(() => {
            console.log('Item deleted successfully');
        })
};

export const deleteItem = (id: number): Promise<void> => {
    return apiClient.delete(`/api/items/${id}`)
        .then(() => {
            alert('Item deleted successfully');
        })
};

export const fetchFavoriteIds = async (): Promise<number[]> => {
    return apiClient.get('/api/items/favoriteIds')
        .then(response => response.data)
};

export const postFavoriteItem = async (itemId: number): Promise<void> => {
    return apiClient.post(`/api/items/favorite`, { id: itemId })
        .then(() => {
            console.log('Item successfully added to favorites');
        })
};

export const addItem = (data: ItemAddDTO): Promise<void> => {
    return apiClient.post('/api/items', data)
        .then(response => {
            console.log('Item added successfully:', response.data);
        })
};
