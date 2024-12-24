import {ItemDTO} from "./dto.ts";
import {CategoryDTO} from "./dto.ts";
import {BrandDTO} from "./dto.ts";
import {SizeDTO} from "./dto.ts";
import apiClient from "../shared/Axios.ts";

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
    return apiClient.post(`/api/items/favorite`, { id: itemId })
        .then(() => {
            console.log('Item successfully added to favorites');
        })
        .catch(error => {
            throw new Error('Failed to favorite item');
        });
};

export const fetchFavoriteIds = async (): Promise<number[]> => {
    return apiClient.get('/api/items/favoriteIds')
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw new Error('Failed to fetch favorite item IDs');
        });
};
