

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
    id?: number;
    fileName: string;
}

export interface ItemAddDTO {
    id?: number;
    name: string;
    categoryId: number;
    brandId?: number;
    sizeId?: number;
    description: string;
    price: number;
    pictures: PictureDTO[];
}

export type ItemFullDTO = {
    name: string;
    price: string;
    category: CategoryDTO;
    brand: BrandDTO;
    size: SizeDTO
    description: string;
    pictures: PictureDTO[];
};

export type UserDTO = {
    fullName: string;
    phone: string;
    email: string;
};
