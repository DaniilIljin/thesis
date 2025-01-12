import {CategoryTreeDTO} from "./dto.ts";
import {BrandDTO} from "./dto.ts";
import {SizeDTO} from "./dto.ts";
import apiClient from "../api/Axios.ts";

export const fetchCategories = (): Promise<CategoryTreeDTO[]> => {
    return apiClient.get('/api/shop/categoriesTree')
        .then(response => response.data)
};

export const fetchBrands = async (): Promise<BrandDTO[]> => {
    return apiClient.get('/api/shop/brands')
        .then(response => response.data)
};

export const fetchSizes = async (): Promise<SizeDTO[]> => {
    return apiClient.get('/api/shop/sizes')
        .then(response => response.data)
};

export const postFavoriteItem = async (itemId: number): Promise<void> => {
    return apiClient.post(`/api/items/favorite`, { id: itemId })
        .then(() => {
            console.log('Item successfully added to favorites');
        })
};

export const fetchFavoriteIds = async (): Promise<number[]> => {
    return apiClient.get('/api/items/favoriteIds')
        .then(response => response.data)
};
