import {
    Box,
    Grid,
    CardMedia,
    Card,
    CardContent,
    Typography,
    Button,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import {useParams} from "react-router-dom";
import {ItemDTO} from "../dto.ts";
import {useQuery} from "@tanstack/react-query";
import {fetchItemById} from "../api.ts";


const ViewItemPage = () => {

    const { id } = useParams<{ id: string }>();

    const { data: item, isLoading, error } = useQuery<ItemDTO>({
        queryKey: ['item', id],
        queryFn: () => fetchItemById(id!),
        enabled: Boolean(id)
    });


    if (!id) {
        return <Typography variant="h4" color="inherit">Invalid Item ID</Typography>;
    }

    if (isLoading) return <div>Loading...</div>;

    if (error instanceof Error)
        return <div>Error: {error.message}</div>;

    if (!item) return <Typography variant="h4" color="inherit">No item found</Typography>;

    return (
        <Box sx={{ padding: 4 }}>
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
                    <Card sx={{ height: "100%" }}>
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
                                Category: {item.brand.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                gutterBottom
                            >
                                Category: {item.size.name}
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

                            <Box sx={{ display: "flex", gap: 2 }}>
                                <Button variant="contained" color="primary">
                                    Like
                                </Button>
                                <Button variant="outlined" color="primary">
                                    Contact Seller
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ViewItemPage;
