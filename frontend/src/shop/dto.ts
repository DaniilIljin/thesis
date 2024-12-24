export type BrandDTO = {
    id: number;
    name: string;
};

export type CategoryDTO = {
    id: number;
    name: string;
    subCategories: CategoryDTO[];
};

export type SizeDTO = {
    id: number;
    name: string;
};

export type ItemDTO = {
    id: number;
    name: string;
    price: number;
    sizeName: string;
    brandName: string;
    firstPictureUrl: string;
};
