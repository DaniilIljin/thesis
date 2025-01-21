import {
    Box,
    Grid,
    CardMedia,
    Card,
    CardContent,
    Typography,
    IconButton,
} from "@mui/material";

import ContactMailIcon from '@mui/icons-material/ContactMail';
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";
import { ItemFullDTO, UserDTO } from "../dto.ts";
import { useQuery } from "@tanstack/react-query";
import { fetchItemById, fetchUserByItemId } from "../api.ts";
import LikeButton from "../../shared/components/LikeButton.tsx";
import { useFavoriteIds } from "../../hooks/useFaviteIds.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import { useState } from "react";
import UserContactModal from "../component/UserContactModal.tsx";
import { useDefaultImageContext } from "../../context/DefaultImageContext.tsx";
import {fetchItemImageUrls} from "../../api/images.ts";

const ViewItemPage = () => {
    const { id } = useParams<{ id: string }>();
    const { defaultImages, defaultFileNames } = useDefaultImageContext();

    const { data: favoriteIds } = useFavoriteIds();

    const [openModal, setOpenModal] = useState(false);

    const toggleModal = () => {
        setOpenModal((prev) => !prev);
    };

    const { isAuthorized } = useAuth();

    const { data: item} = useQuery<ItemFullDTO>({
        queryKey: ['item', id],
        queryFn: () => fetchItemById(parseInt(id!)),
        enabled: Boolean(id),
    });

    const user = useQuery<UserDTO>({
        queryKey: ["userByItemId", id],
        queryFn: () => fetchUserByItemId(parseInt(id!)),
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

    const images = isOriginalImage ? data : defaultImages;

    console.log(fileNames)

    return (
        <Box sx={{ padding: 4 }}>
            <Grid alignItems="center" container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Box sx={{
                        height: "300px", // Fixed height for the carousel
                        width: "300px", // Fixed width to make it square
                        margin: "0 auto", // Center the carousel
                    }}>
                        <Carousel
                            autoPlay={true}
                            navButtonsAlwaysVisible={true}
                            sx={{
                                height: "100%", // Ensure carousel takes full height of the Box container
                                width: "100%",  // Ensure carousel takes full width of the Box container
                            }}
                        >
                            {images?.map((image, index) => (
                                <CardMedia
                                    key={index}
                                    component="img"
                                    image={image.url}
                                    sx={{
                                        height: "100%", // Fill the container height
                                        width: "100%", // Fill the container width
                                        objectFit: "contain", // Ensure the image fits within the square container without stretching
                                    }}
                                />
                            ))}
                        </Carousel>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                {item.name}
                            </Typography>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                {item.price}€
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Kategooria: {item.category.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Bränd: {item.brand.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Suurus: {item.size.name}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {item.description}
                            </Typography>

                            {isAuthorized && (
                                <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
                                    <LikeButton itemId={parseInt(id!)} initialIsToggled={favoriteIds?.includes(parseInt(id!)) || false} />
                                    <IconButton onClick={toggleModal} color="primary">
                                        <ContactMailIcon />
                                    </IconButton>

                                    {user.data && (
                                        <UserContactModal
                                            user={user.data}
                                            open={openModal}
                                            onClose={toggleModal}
                                        />
                                    )}
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ViewItemPage;
