import React, { useState, ChangeEvent } from "react";
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
} from "@mui/material";
import { Delete as DeleteIcon, Save as SaveIcon, UploadFile as UploadFileIcon } from "@mui/icons-material";
import Carousel from "react-material-ui-carousel";
import { fetchCategories, fetchBrands, fetchSizes, addItem } from "../api";
import { useNavigate } from "react-router-dom";

interface FormValues {
    name: string;
    categoryId: number;
    brandId?: number;
    sizeId?: number;
    description: string;
    price: number;
}

const AddItem: React.FC = () => {
    const [images, setImages] = useState<{ src: string; file: File }[]>([]);
    const { control, handleSubmit } = useForm<FormValues>();
    const navigate = useNavigate();

    const { data: categories = [] } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    const { data: brands = [] } = useQuery({
        queryKey: ["brands"],
        queryFn: fetchBrands,
    });

    const { data: sizes = [] } = useQuery({
        queryKey: ["sizes"],
        queryFn: fetchSizes,
    });


    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImages = Array.from(files).map((file) => ({
                src: URL.createObjectURL(file),
                file,
            }));
            setImages((prev) => [...prev, ...newImages]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (data: FormValues) => {
        const itemDTO = {
            ...data,
            pictures: images.map((img) => img.src),
        };

        try {
            await addItem(itemDTO);
            navigate("/");
            alert("Item added successfully!");
        } catch (error) {
            alert("Failed to add item. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                {/* Left Column: Image Carousel and Upload */}
                <Grid item xs={12} md={6}>
                    <Carousel navButtonsAlwaysVisible>
                        {images.length > 0 ? (
                            images.map((img, index) => (
                                <CardMedia
                                    key={index}
                                    component="img"
                                    image={img.src}
                                    alt={`Uploaded ${index}`}
                                    sx={{ height: 300, objectFit: "contain", borderRadius: 2 }}
                                />
                            ))
                        ) : (
                            <Typography align="center">No images uploaded</Typography>
                        )}
                    </Carousel>
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        startIcon={<UploadFileIcon />}
                        sx={{ mt: 2 }}
                    >
                        Upload Images
                        <input hidden accept="image/*" multiple type="file" onChange={handleImageUpload} />
                    </Button>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
                        {images.map((img, index) => (
                            <Box
                                key={index}
                                sx={{ position: "relative", width: 100, height: 100, borderRadius: 2 }}
                            >
                                <img
                                    src={img.src}
                                    alt={`Thumbnail ${index}`}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                                <IconButton
                                    onClick={() => handleRemoveImage(index)}
                                    size="small"
                                    sx={{ position: "absolute", top: 4, right: 4, backgroundColor: "rgba(255, 255, 255, 0.7)" }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        ))}
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Add New Item
                    </Typography>

                    {[
                        { name: "name", label: "Item Name", required: true },
                        { name: "categoryId", label: "Category", required: true, options: categories },
                        { name: "brandId", label: "Brand", options: brands },
                        { name: "sizeId", label: "Size", options: sizes },
                        { name: "description", label: "Description", multiline: true, rows: 3, required: true },
                        { name: "price", label: "Price (€)", type: "number", required: true },
                    ].map(({ name, label, options, ...rest }) => (
                        <Controller
                            key={name}
                            name={name as keyof FormValues}
                            control={control}
                            defaultValue={""}
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
                        Add Item
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default AddItem;
