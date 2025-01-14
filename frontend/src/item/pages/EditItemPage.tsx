import React, {useState, useEffect, ChangeEvent} from "react";
import {useForm, Controller} from "react-hook-form";
import {useQuery} from "@tanstack/react-query";
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
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import {Delete as DeleteIcon, Save as SaveIcon, UploadFile as UploadFileIcon} from "@mui/icons-material";
import Carousel from "react-material-ui-carousel";
import {fetchCategories, fetchBrands, fetchSizes, uploadImagesToS3} from "../../api/common.ts";
import {fetchItemById} from "../../api/item.ts"
import {useNavigate, useParams} from "react-router-dom";
import {ItemFullDTO} from "../../dto/itemDto.ts";
import {FilePresignedUrlDTO, PictureDTO} from "../../dto/common.ts";
import {fetchItemImageUrls} from "../../api/images.ts";
import {useDefaultImageContext} from "../../context/DefaultImageContext.tsx";

interface FormValues {
    name: string;
    categoryId: number;
    brandId?: number;
    sizeId?: number;
    description: string;
    price: number;
}

const EditItemPage: React.FC = () => {
    const {id} = useParams<{ id: number }>();
    const [images, setImages] = useState<FilePresignedUrlDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const {control, handleSubmit, reset} = useForm<FormValues>();
    const navigate = useNavigate();
    const {defaultImages, defaultFileNames} = useDefaultImageContext()
    const { data: item } = useQuery<ItemFullDTO, Error>({
        queryKey: ["item", id],
        queryFn: () => fetchItemById(id!),
        enabled: !!id,
    });

    const isOriginalImage = item?.pictures && item.pictures.length !== 0 && !defaultFileNames.includes(item.pictures[0].fileName);

    const fileNames = item?.pictures.map(picture => picture.fileName);

    const { data } = useQuery({
        queryKey: ["itemImage", fileNames],
        queryFn: () => fetchItemImageUrls(fileNames!),
        enabled: isOriginalImage,
    });

    if (!item) return <Typography variant="h4" color="inherit">No item found</Typography>;

    useEffect(() => {
        if (item) {
            reset({
                name: item.name,
                categoryId: item.category.id,
                brandId: item.brand.id,
                sizeId: item.size.id,
                description: item.description,
                price: parseFloat(item.price),
            });
            setImages(isOriginalImage ? data! : defaultImages)
        }
    }, [item, reset]);

    const {data: categories = []} = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    const {data: brands = []} = useQuery({
        queryKey: ["brands"],
        queryFn: fetchBrands,
    });

    const {data: sizes = []} = useQuery({
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
        try {
            setLoading(true);

            let itemDTO: ItemEditDTO = {
                id: Number(id),
                ...data,
            };

            if (images.length !== 0) {
                const files = images.filter((img) => img.file).map((img) => ({file: img.file!}));

                const uploadedFileNames: string[] = await uploadImagesToS3(files);

                const uploadedImages: PictureDTO[] = uploadedFileNames.map((fileName) => ({
                    id: undefined,
                    fileName,
                }));

                itemDTO = {
                    ...itemDTO,
                    pictures: [
                        ...images.filter((img) => !img.file).map((img) => ({fileName: img.src})),
                        ...uploadedImages,
                    ],
                };
            }

            await updateItem(itemDTO);
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Failed to update item. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <br/>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Carousel navButtonsAlwaysVisible>
                        {images.length > 0 ? (
                            images.map((img, index) => (
                                <CardMedia
                                    key={index}
                                    component="img"
                                    image={img.file ? URL.createObjectURL(img.file) : img.src}
                                    alt={`Uploaded ${index}`}
                                    sx={{height: 300, objectFit: "contain", borderRadius: 2}}
                                />
                            ))
                        ) : (
                            <CardMedia sx={{height: "300px", textAlign: "center"}}>
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography variant="h5" align="center" color='text'>
                                        pildid pole saadaval
                                    </Typography>
                                </Box>
                            </CardMedia>
                        )}
                    </Carousel>
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        startIcon={<UploadFileIcon/>}
                        sx={{mt: 2}}
                    >
                        lisa pilt
                        <input hidden accept="image/*" multiple type="file" onChange={handleImageUpload}/>
                    </Button>
                    <Box sx={{display: "flex", gap: 1, flexWrap: "wrap", mt: 2}}>
                        {images.map((img, index) => (
                            <Box
                                key={index}
                                sx={{position: "relative", width: 100, height: 100, borderRadius: 2}}
                            >
                                <img
                                    src={img.file ? URL.createObjectURL(img.file) : img.src}
                                    alt={`Thumbnail ${index}`}
                                    style={{width: "100%", height: "100%", objectFit: "cover"}}
                                />
                                <IconButton
                                    onClick={() => handleRemoveImage(index)}
                                    size="small"
                                    sx={{
                                        position: "absolute",
                                        top: 4,
                                        right: 4,
                                        backgroundColor: "rgba(255, 255, 255, 0.7)"
                                    }}
                                >
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                            </Box>
                        ))}
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h5" color='text' gutterBottom>
                        Kuulutuse muutmine
                    </Typography>

                    {[
                        {name: "name", label: "Nimetus", required: true},
                        {name: "categoryId", label: "Kategooria", required: true, options: categories},
                        {name: "brandId", label: "Bränd", options: brands},
                        {name: "sizeId", label: "Suurus", options: sizes},
                        {name: "description", label: "Kirjeldus", multiline: true, rows: 3, required: true},
                        {name: "price", label: "Hind (€)", type: "number", required: true},
                    ].map(({name, label, options, ...rest}) => (
                        <Controller
                            key={name}
                            name={name as keyof FormValues}
                            control={control}
                            defaultValue={""}
                            render={({field}) =>
                                options ? (
                                    <TextField {...field} label={label} select fullWidth sx={{mb: 2}} {...rest}>
                                        {options.map((option: any) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                ) : (
                                    <TextField {...field} label={label} fullWidth sx={{mb: 2}} {...rest} />
                                )
                            }
                        />
                    ))}

                    <Button type="submit" variant="contained" color="primary" fullWidth startIcon={<SaveIcon/>}>
                        Salvesta muudatused
                    </Button>
                </Grid>
            </Grid>

            {/* Loading Dialog */}
            <Dialog open={loading}>
                <DialogTitle>Saving Changes</DialogTitle>
                <DialogContent>
                    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <CircularProgress/>
                    </Box>
                    <Typography variant="body1" align="center" sx={{mt: 2}}>
                        Please wait while your changes are being saved...
                    </Typography>
                </DialogContent>
                <DialogActions>
                    {/* Optionally, add a cancel button */}
                </DialogActions>
            </Dialog>
        </form>
    );
};

export default EditItemPage;
