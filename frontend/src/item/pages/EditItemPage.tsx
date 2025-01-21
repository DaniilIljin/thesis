import React, { useState, useEffect, ChangeEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {
    Box,
    Button,
    CardMedia,
    Grid,
    IconButton,
    MenuItem,
    TextField,
    Typography,
    CircularProgress,
} from "@mui/material";
import { Delete as DeleteIcon, Save as SaveIcon, UploadFile as UploadFileIcon } from "@mui/icons-material";
import Carousel from "react-material-ui-carousel";
import { fetchCategories, fetchBrands, fetchSizes, uploadImagesToS3 } from "../../api/common";
import { fetchItemById, updateItem } from "../../api/item";
import { useNavigate, useParams } from "react-router-dom";
import { useDefaultImageContext } from "../../context/DefaultImageContext";
import {ItemAddDTO, ItemFullDTO} from "../../dto/itemDto";
import { PictureDTO } from "../../dto/common.ts";
import {UserDTO} from "../dto.ts";
import {fetchUserByItemId} from "../api.ts";
import {useAuth} from "../../context/AuthContext.tsx";
import {fetchItemImageUrls} from "../../api/images.ts";

interface FormValues {
    name: string;
    categoryId: number;
    brandId?: number;
    sizeId?: number;
    description: string;
    price: number;
}

const EditItemPage: React.FC = () => {
    const { id } = useParams<{ id: number }>();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, reset } = useForm<FormValues>();
    const { defaultImages, defaultFileNames } = useDefaultImageContext();
    const {isAuthorized} = useAuth()

    const { data: item, isLoading: itemLoading } = useQuery<ItemFullDTO>({
        queryKey: ["item", id],
        queryFn: () => fetchItemById(parseInt(id!)),
        enabled: isAuthorized && !!id,
    });

    useEffect(() => {
        if (item) {
            reset({
                name: item.name,
                categoryId: item.category.id,
                brandId: item.brand?.id,
                sizeId: item.size?.id,
                description: item.description,
                price: parseFloat(item.price),
            });

            const isOriginalImage = item?.pictures && item.pictures.length !== 0 && !defaultFileNames.includes(item.pictures[0].fileName);

            const fileNames = item?.pictures.map(picture => picture.fileName);

            const { data } = useQuery({
                queryKey: ["itemImage", fileNames],
                queryFn: () => fetchItemImageUrls(fileNames!),
                enabled: isOriginalImage,
            });

            // setImages(
            //     item.pictures.length
            //         ? item.pictures.map((pic) => ({ ...pic, file: undefined })) // Mark as existing images
            //         : defaultImages.map((src) => ({ src, file: undefined }))
            // );
        }
    }, [item, reset]);

    const { data: categories = [] } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories});

    const { data: brands = [] } = useQuery({
        queryKey: ["brands"],
        queryFn: fetchBrands});
    const { data: sizes = [] } = useQuery({
        queryKey: ["sizes"],
        queryFn: fetchSizes});

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        // if (files) {
        //     const newImages = Array.from(files).map((file) => ({
        //         file,
        //         src: URL.createObjectURL(file),
        //     }));
        //     setImages((prev) => [...prev, ...newImages]);
        // }
    };

    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (data: FormValues) => {
        // setLoading(true);
        //
        // try {
        //     const uploadedFiles: PictureDTO[] = [];
        //     const filesToUpload = images.filter((img) => img.file) as { file: File }[];
        //
        //     if (filesToUpload.length) {
        //         const uploadedFileNames = await uploadImagesToS3(filesToUpload);
        //         uploadedFiles.push(
        //             ...uploadedFileNames.map((fileName) => ({
        //                 id: undefined,
        //                 fileName,
        //             }))
        //         );
        //     }
        //
        //     const existingImages = images
        //         .filter((img) => !img.file)
        //         .map((img) => ({
        //             id: (img as PictureDTO).id,
        //             fileName: (img as PictureDTO).fileName,
        //         }));
        //
        //     const itemDTO: ItemAddDTO = {
        //         id: Number(id),
        //         ...data,
        //         pictures: [...existingImages, ...uploadedFiles],
        //     };
        //
        //     await updateItem(itemDTO);
        //     navigate("/");
        // } catch (error) {
        //     console.error(error);
        //     alert("Failed to update item.");
        // } finally {
        //     setLoading(false);
        // }
    };

    if (itemLoading || !item) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Carousel navButtonsAlwaysVisible>
                        {images.map((img, index) => (
                            <CardMedia
                                component="img"
                                image={(img as any).src || (img as PictureDTO).fileName}
                                alt={`Uploaded ${index}`}
                                sx={{ height: 300, objectFit: "contain", borderRadius: 2 }}
                            />
                        ))}
                    </Carousel>
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        startIcon={<UploadFileIcon />}
                        sx={{ mt: 2 }}
                    >
                        Lisa pilt
                        <input hidden accept="image/*" multiple type="file" onChange={handleImageUpload} />
                    </Button>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
                        {images.map((img, index) => (
                            <Box
                                key={index}
                                sx={{ position: "relative", width: 100, height: 100, borderRadius: 2 }}
                            >
                                <img
                                    src={(img as any).src || (img as PictureDTO).fileName}
                                    alt={`Thumbnail ${index}`}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                                <IconButton
                                    onClick={() => handleRemoveImage(index)}
                                    size="small"
                                    sx={{
                                        position: "absolute",
                                        top: 4,
                                        right: 4,
                                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                                    }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        ))}
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Muuda Kuulutust
                    </Typography>

                    {[
                        { name: "name", label: "Nimetus", required: true },
                        { name: "categoryId", label: "Kategooria", required: true, options: categories },
                        { name: "brandId", label: "Bränd", options: brands },
                        { name: "sizeId", label: "Suurus", options: sizes },
                        { name: "description", label: "Kirjeldus", multiline: true, rows: 3, required: true },
                        { name: "price", label: "Hind (€)", type: "number", required: true },
                    ].map(({ name, label, options, ...rest }) => (
                        <Controller
                            key={name}
                            name={name as keyof FormValues}
                            control={control}
                            defaultValue=""
                            render={({ field }) =>
                                options ? (
                                    <TextField {...field} label={label} select fullWidth sx={{ mb: 2 }} {...rest}>
                                        {options.map((option: any) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                ) : (
                                    <TextField {...field} label={label} fullWidth sx={{ mb: 2 }} {...rest} />
                                )
                            }
                        />
                    ))}

                    <Button type="submit" variant="contained" color="primary" fullWidth startIcon={<SaveIcon />}>
                        Salvesta muudatused
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default EditItemPage;
