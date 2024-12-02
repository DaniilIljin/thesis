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

const ViewItemPage = () => {
    const item = {
        name: "Example Item",
        price: "$99.99",
        category: "Electronics",
        description:
            "This is a detailed description of the item. It provides information about the features and benefits of the product.",
        sellerName: "John Doe",
        images: [
            "https://via.placeholder.com/600x400?text=Image+1",
            "https://via.placeholder.com/600x400?text=Image+2",
            "https://via.placeholder.com/600x400?text=Image+3",
        ],
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Grid alignItems="center" container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Carousel
                        autoPlay={false} // Disables automatic sliding
                        // indicators={true} // Optional: Display indicators
                        navButtonsAlwaysVisible={true} // Optional: Always show navigation buttons
                    >
                        {item.images.map((image, index) => (
                            <CardMedia
                                key={index}
                                component="img"
                                image={image}
                                alt={`Image ${index + 1}`}
                                sx={{
                                    height: "auto",
                                    objectFit: "cover",
                                    borderRadius: 1, // Applies rounded corners
                                    overflow: "hidden", // Ensures image stays within rounded corners
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
                                {item.price}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                                gutterBottom
                            >
                                Category: {item.category}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {item.description}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                gutterBottom
                            >
                                Seller: {item.sellerName}
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
