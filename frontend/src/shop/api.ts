import {ItemDTO} from "./dto.ts";
import {CategoryDTO} from "./dto.ts";
import {BrandDTO} from "./dto.ts";
import {SizeDTO} from "./dto.ts";
import apiClient from "../shared/Axios.ts";

export const fetchItems = (): Promise<ItemDTO[]> => {
    return apiClient.get('/api/shop/items')
        .then(response => response.data)
        .catch(error => {
            console.error(error)
            throw new Error('Failed to fetch items');
        });
};

export const fetchCategories = (): Promise<CategoryDTO[]> => {
    return apiClient.get('/api/shop/categories')
        .then(response => response.data)
        .catch(error => {
            console.error(error)
            throw new Error('Failed to fetch categories');
        });
};


export const fetchBrands = async (): Promise<BrandDTO[]> => {
    return apiClient.get('/api/shop/brands')
        .then(response => response.data)
        .catch(error => {
            console.error(error)
            throw new Error('Failed to fetch brands');
        });
};

export const fetchSizes = async (): Promise<SizeDTO[]> => {
    return apiClient.get('/api/shop/sizes')
        .then(response => response.data)
        .catch(error => {
            console.error(error)
            throw new Error('Failed to fetch sizes');
        });
};

export const postFavoriteItem = async (itemId: number): Promise<void> => {
    return apiClient.post(`/api/items/favorite`, { itemId: itemId })
        .then(() => {
            console.log('Item successfully added to favorites');
        })
        .catch(error => {
            throw new Error('Failed to favorite item');
        });
};
