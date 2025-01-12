import {BrandDTO, SingleCategoryDTO, PictureDTO, SizeDTO} from "./common.ts";

export type ItemDTO = {
    id: number;
    name: string;
    price: number;
    sizeName: string;
    brandName: string;
    pictureFileName: string;
};

export type ItemFullDTO = {
    name: string;
    price: string;
    category: SingleCategoryDTO;
    brand: BrandDTO;
    size: SizeDTO
    description: string;
    sellerName: string;
    pictures: PictureDTO[];
};

export interface ItemAddDTO {
    name: string;
    categoryId: number;
    brandId?: number;
    sizeId?: number;
    description: string;
    price: number;
    pictures: PictureDTO[];
}

