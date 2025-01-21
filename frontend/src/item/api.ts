import apiClient from "../api/Axios.ts";
import {ItemFullDTO, BrandDTO, CategoryDTO, SizeDTO, ItemAddDTO, UserDTO} from "./dto.ts";

export const uploadImagesToS3 = async (images: { file: File }[]): Promise<string[]> => {
    const filenames = images.map((img) => img.file.name);

    try {
        const uploadLinks = await apiClient.post('/api/s3/upload', { fileNames: filenames })
            .then((response) => response.data);

        const uploadPromises = images.map((img) => {
            const uploadLink = uploadLinks.find(link => link.fileName.includes(img.file.name))?.url;
            if (!uploadLink) {
                throw new Error(`Missing upload URL for file: ${img.file.name}`);
            }

            return fetch(uploadLink, {
                method: "PUT",
                body: img.file,
                headers: {
                    "Content-Type": img.file.type,
                },
            }).then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to upload file: ${img.file.name}`);
                }
            });
        });

        await Promise.all(uploadPromises);

        return uploadLinks.map(link => link.fileName);
    } catch (error: any) {
        console.error('Error during image upload:', error.message);
        throw new Error('Failed to upload images to S3');
    }
};

export const fetchUserByItemId = (itemId: number): Promise<UserDTO> => {
    return apiClient.get(`/api/items/contact/${itemId}`)
        .then(response => {
            return response.data;
        })
};

export const fetchItemById = (id: number): Promise<ItemFullDTO> => {
    return apiClient.get(`/api/shop/items/${id}`)
        .then(response => {
            return response.data
        })
};

export const fetchCategories = (): Promise<CategoryDTO[]> => {
    return apiClient.get('/api/shop/categories')
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


export const addItem = (data: ItemAddDTO): Promise<ItemAddDTO> => {
    return apiClient.post('/api/items', data)
        .then(response => {
            console.log('Item added successfully:', response.data);
            return data
        })
};

