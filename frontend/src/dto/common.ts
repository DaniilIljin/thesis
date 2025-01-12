export type BrandDTO = {
    id: number;
    name: string;
};

export type SingleCategoryDTO = {
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

export type FilePresignedUrlDTO = {
    fileName: string;
    url: string;
};

export type UserDTO = {
    fullName: string;
    phone: string;
    email: string;
};

export type CategoryDTO = {
    id: number;
    name: string;
    subCategories: CategoryDTO[];
};




