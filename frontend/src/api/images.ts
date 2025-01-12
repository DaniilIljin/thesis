import {FilePresignedUrlDTO} from "../dto/common.ts";
import apiClient from "./Axios.ts";

export const fetchItemImageUrls = (fileNames: string[]): Promise<FilePresignedUrlDTO[]> => {
    return apiClient.post(`/api/s3/download`, { fileNames: fileNames })
        .then(response => response.data)
};

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