import {ItemDTO} from "./dto.ts";
import {CategoryDTO} from "./dto.ts";
import {BrandDTO} from "./dto.ts";
import {SizeDTO} from "./dto.ts";
import apiClient from "../shared/Axios.ts";

// Fetch all items
export const fetchItems = (): Promise<ItemDTO[]> => {
    return apiClient.get('/api/items')
        .then(response => response.data)
        .catch(error => {
            console.error(error)
            throw new Error('Failed to fetch items');
        });
};

// Fetch all categories
export const fetchCategories = (): Promise<CategoryDTO[]> => {
    return apiClient.get('/api/categories')
        .then(response => response.data)
        .catch(error => {
            console.error(error)
            throw new Error('Failed to fetch categories');
        });
};


// Fetch all brands
export const fetchBrands = async (): Promise<BrandDTO[]> => {
    return apiClient.get('/api/brands')
        .then(response => response.data)
        .catch(error => {
            console.error(error)
            throw new Error('Failed to fetch brands');
        });
};

// Fetch all sizes
export const fetchSizes = async (): Promise<SizeDTO[]> => {
    return apiClient.get('/api/sizes')
        .then(response => response.data)
        .catch(error => {
            console.error(error)
            throw new Error('Failed to fetch sizes');
        });
};
