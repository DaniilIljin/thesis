export type ItemDTO = {
    name: string;
    price: string;
    category: CategoryDTO;
    brand: BrandDTO;
    size: SizeDTO
    description: string;
    sellerName: string;
    pictures: PictureDTO[];
};

export type BrandDTO = {
    id: number;
    name: string;
};

export type CategoryDTO = {
    id: number;
    name: string;
};

export type SizeDTO = {
    id: number;
    name: string;
};

export type PictureDTO = {
    id: number;
    name: string;
    location: string
}

export interface ItemAddDTO {
    name: string;
    categoryId: number;
    brandId?: number;
    sizeId?: number;
    description: string;
    price: number;
    images?: string[];
}