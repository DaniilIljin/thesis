import React from "react";
import {Box, Button, IconButton, Typography, CardMedia} from "@mui/material";
import {UploadFile as UploadFileIcon, Delete as DeleteIcon} from "@mui/icons-material";
import Carousel from "react-material-ui-carousel";

interface ImageUploaderProps {
    images: { src: string; file: File }[];
    onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveImage: (index: number) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({images, onImageUpload, onRemoveImage}) => (
    <div>
        {images.length > 0 ? (
            <Carousel navButtonsAlwaysVisible>
                {images.map((img, index) => (
                    <CardMedia
                        key={index}
                        component="img"
                        image={img.src}
                        alt={`Uploaded ${index}`}
                        sx={{height: 300, objectFit: "contain", borderRadius: 2}}
                    />
                ))}
            </Carousel>
        ) : (
            <Box
                sx={{
                    height: 300,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2,
                    border: "1px dashed gray",
                }}
            >
                <Typography variant="h5">Pildid pole lisatud</Typography>
            </Box>
        )}
        <Button
            variant="contained"
            component="label"
            fullWidth
            startIcon={<UploadFileIcon />}
            sx={{mt: 2}}
        >
            Lisa pilt
            <input hidden accept="image/*" multiple type="file" onChange={onImageUpload} />
        </Button>
        {images.length > 0 && (
            <Box sx={{display: "flex", gap: 1, flexWrap: "wrap", mt: 2}}>
                {images.map((img, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: 100,
                            height: 100,
                            borderRadius: 2,
                            position: "relative",
                            border: "1px solid #ddd",
                        }}
                    >
                        <img
                            src={img.src}
                            alt={`Thumbnail ${index}`}
                            style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: 2}}
                        />
                        <IconButton
                            onClick={() => onRemoveImage(index)}
                            size="small"
                            sx={{
                                position: "absolute",
                                bottom: -10,
                                left: "50%",
                                transform: "translateX(-50%)",
                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                            }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                ))}
            </Box>
        )}
    </div>
);

export default ImageUploader;
