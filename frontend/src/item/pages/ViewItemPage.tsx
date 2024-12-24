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
import {useParams} from "react-router-dom";
import {ItemDTO, UserDTO} from "../dto.ts";
import {useQuery} from "@tanstack/react-query";
import {fetchItemById, fetchUserByItemId} from "../api.ts";
import LikeButton from "../../shared/components/LikeButton.tsx";
import {useFavoriteIds} from "../../hooks/useFaviteIds.tsx";
import {useAuth} from "../../context/AuthProvider.tsx";
import {useState} from "react";
import UserContactModal from "../component/UserContactModal.tsx";


const ViewItemPage = () => {

    const {id} = useParams<{ id: string }>();

    const {data: item, isLoading, error} = useQuery<ItemDTO>({
        queryKey: ['item', id],
        queryFn: () => fetchItemById(id!),
        enabled: Boolean(id)
    });

    const {isAuthorized} = useAuth()

    const user = useQuery<UserDTO>({
        queryKey: ["userByItemId", id],
        queryFn: () => fetchUserByItemId(id!),
        enabled: isAuthorized && !!id
    });

    const {data: favoriteIds} = useFavoriteIds(isAuthorized)

    const [openModal, setOpenModal] = useState(false);

    const toggleModal = () => {
        console.log('toggled')
        setOpenModal((prev) => !prev);
    };

    if (!id) {
        return <Typography variant="h4" color="inherit">Invalid Item ID</Typography>;
    }

    if (isLoading) return <div>Loading...</div>;

    if (error instanceof Error)
        return <div>Error: {error.message}</div>;

    if (!item) return <Typography variant="h4" color="inherit">No item found</Typography>;

    return (
        <Box sx={{padding: 4}}>
            <Grid alignItems="center" container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Carousel
                        autoPlay={false}
                        navButtonsAlwaysVisible={true}
                    >
                        {item.pictures.map((image, index) => (
                            <CardMedia
                                key={index}
                                component="img"
                                // image={image}
                                alt={`Image ${image.id}`}
                                sx={{
                                    height: "auto",
                                    objectFit: "cover",
                                    borderRadius: 1,
                                    overflow: "hidden",
                                }}
                            />
                        ))}
                    </Carousel>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{height: "100%"}}>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                {item.name}
                            </Typography>
                            <Typography
                                variant="h6"
                                color="textSecondary"
                                gutterBottom
                            >
                                {item.price}€
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                gutterBottom
                            >
                                Category: {item.category.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                gutterBottom
                            >
                                Brand: {item.brand.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                gutterBottom
                            >
                                Size: {item.size.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                gutterBottom
                            >
                                Seller: {item.sellerName}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {item.description}
                            </Typography>

                            {isAuthorized && <Box sx={{
                                display: "flex", gap: 2, justifyContent: "space-between",
                            }}>
                                <LikeButton itemId={id} initialIsToggled={favoriteIds?.includes(id) || false}/>
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
                            </Box>}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ViewItemPage;
