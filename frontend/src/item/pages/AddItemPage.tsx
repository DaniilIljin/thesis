import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useQuery} from "@tanstack/react-query";
import {Grid, Button, Typography} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import {useNavigate} from "react-router-dom";

import ImageUploader from "../component/ImageUploader";
import FormField from "../component/FormField";
import LoadingDialog from "../component/LoadingDialog";
import {fetchCategories, fetchBrands, fetchSizes, addItem, uploadImagesToS3} from "../api";
import { ItemAddDTO, PictureDTO} from "../dto";

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
    const [loading, setLoading] = useState(false);
    const {control, handleSubmit} = useForm<FormValues>();
    const navigate = useNavigate();

    const {data: categories = []} = useQuery({queryKey: ["categories"], queryFn: fetchCategories});
    const {data: brands = []} = useQuery({queryKey: ["brands"], queryFn: fetchBrands});
    const {data: sizes = []} = useQuery({queryKey: ["sizes"], queryFn: fetchSizes});

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImages = Array.from(files).map((file) => ({
                src: URL.createObjectURL(file),
                file,
            }));
            setImages((prev) => [...prev, ...newImages]);
        }
    };

    const handleRemoveImage = (index: number) => setImages((prev) => prev.filter((_, i) => i !== index));

    const onSubmit = async (data: FormValues) => {
        try {

            setLoading(true);
            let itemDTO: ItemAddDTO = {...data};
            if (images.length) {
                const files = images.map((img) => ({file: img.file}));
                const uploadedFileNames = await uploadImagesToS3(files);
                const uploadedImages: PictureDTO[] = uploadedFileNames.map((fileName) => ({id: undefined, fileName}));
                itemDTO.pictures = uploadedImages;
            }
            console.log(itemDTO)
            await addItem(itemDTO);
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Failed to add item. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <ImageUploader images={images} onImageUpload={handleImageUpload} onRemoveImage={handleRemoveImage} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Kuulutuse lisamine
                    </Typography>
                    <FormField name="name" label="Nimetus" control={control} required />
                    <FormField name="categoryId" label="Kategooria" control={control} options={categories} required />
                    <FormField name="brandId" label="Bränd" control={control} options={brands} />
                    <FormField name="sizeId" label="Suurus" control={control} options={sizes} />
                    <FormField name="description" label="Kirjeldus" control={control} multiline rows={3} required />
                    <FormField name="price" label="Hind (€)" control={control} type="number" required />
                    <Button type="submit" variant="contained" color="primary" fullWidth startIcon={<SaveIcon />}>
                        lisa kuulutus
                    </Button>
                </Grid>
            </Grid>
            <LoadingDialog open={loading} />
        </form>
    );
};

export default AddItem;
