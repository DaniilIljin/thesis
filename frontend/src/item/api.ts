import apiClient from "../shared/Axios.ts";
import {ItemDTO, BrandDTO, CategoryDTO, SizeDTO, ItemAddDTO} from "./dto.ts";

export const fetchItemById = (id: string): Promise<ItemDTO> => {
    return apiClient.get(`/api/shop/items/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw new Error(`Failed to fetch item with ID: ${id}`);
        });
};

export const fetchCategories = (): Promise<CategoryDTO[]> => {
    return apiClient.get('/api/shop/categories')
        .then(response => response.data)
        .catch(error => {
            throw new Error('Failed to fetch categories');
        });
};


export const fetchBrands = async (): Promise<BrandDTO[]> => {
    return apiClient.get('/api/shop/brands')
        .then(response => response.data)
        .catch(error => {
            throw new Error('Failed to fetch brands');
        });
};

export const fetchSizes = async (): Promise<SizeDTO[]> => {
    return apiClient.get('/api/shop/sizes')
        .then(response => response.data)
        .catch(error => {
            throw new Error('Failed to fetch sizes');
        });
};


export const addItem = (data: ItemAddDTO): Promise<void> => {
    return apiClient.post('/api/items', data)
        .then(response => {
            console.log('Item added successfully:', response.data);
        })
        .catch(error => {
            throw new Error('Failed to add item');
        });
};
