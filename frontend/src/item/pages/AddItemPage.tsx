import React, {useState, ChangeEvent} from "react";
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
    DialogContent,
    DialogTitle,
} from "@mui/material";
import {Delete as DeleteIcon, Save as SaveIcon, UploadFile as UploadFileIcon} from "@mui/icons-material";
import Carousel from "react-material-ui-carousel";
import {fetchCategories, fetchBrands, fetchSizes, addItem, uploadImagesToS3} from "../api";
import {useNavigate} from "react-router-dom";
import {ItemAddDTO, PictureDTO} from "../dto.ts";

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
    const [loading, setLoading] = useState(false); // State for loading indicator
    const {control, handleSubmit} = useForm<FormValues>();
    const navigate = useNavigate();

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

            let itemDTO: ItemAddDTO = {
                ...data,
            };

            if (images.length !== 0) {

                const files = images.map((img) => ({file: img.file}));
                const uploadedFileNames: string[] = await uploadImagesToS3(files);
                const uploadedImages: PictureDTO[] = uploadedFileNames.map((fileName) => ({
                    id: undefined,
                    fileName,
                } as PictureDTO));
                itemDTO = {
                    ...data,
                    pictures: uploadedImages,
                };
            }
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
            <br/>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Carousel navButtonsAlwaysVisible
                    >
                        {images.length > 0 ? (
                            images.map((img, index) => (
                                <CardMedia
                                    key={index}
                                    component="img"
                                    image={URL.createObjectURL(img.file)}
                                    alt={`Uploaded ${index}`}
                                    sx={{height: 300, objectFit: "contain", borderRadius: 2}}
                                />
                            ))
                        ) : (
                            <CardMedia sx={
                                {
                                    height: "300px",
                                    textAlign: "center",
                                }
                            }>
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
                                        pildid pole lisatud
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
                                    src={URL.createObjectURL(img.file)}
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
                        Kuulutuse lisamine
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
                        lisa kuulutus
                    </Button>
                </Grid>
            </Grid>

            <Dialog open={loading}>
                <DialogTitle>Uploading Images</DialogTitle>
                <DialogContent>
                    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <CircularProgress/>
                    </Box>
                    <Typography variant="body1" align="center" sx={{mt: 2}}>
                        Please wait while the images are being uploaded...
                    </Typography>
                </DialogContent>
            </Dialog>
        </form>
    );
};

export default AddItem;
