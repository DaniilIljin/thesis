export type BrandDTO = {
    id: number;
    name: string;
};

export type CategoryTreeDTO = {
    id: number;
    name: string;
    subCategories: CategoryTreeDTO[];
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
    pictureFileName: string;
};


