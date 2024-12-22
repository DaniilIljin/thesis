import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    IconButton,
    Tooltip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ItemDTO } from "../dto.ts";
import { useAuth } from "../../context/AuthProvider.tsx";
import { postFavoriteItem } from "../api.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

type Props = {
    item: ItemDTO;
    isToggled?: boolean;
};

const ItemCard = (props: Props) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { isAuthorized } = useAuth();

    const [isToggled, setIsToggled] = useState(props.isToggled || false);

    const mutation = useMutation({
        mutationFn: () => postFavoriteItem(props.item.id),
        onSuccess: () => {
            queryClient.invalidateQueries(['favoritemIds']);
        },
        onError: (error) => {
            console.error('Failed to toggle favorite item:', error);
        },
    });

    const handleClick = () => {
        if (props.item?.id) {
            navigate(`/viewItem/${props.item.id}`);
        } else {
            console.error("Item ID is undefined");
        }
    };

    const handleToggle = () => {
        mutation.mutate();
        setIsToggled((prev) => !prev);
    };

    return (
        <>
            <Card elevation={5}>
                <CardMedia
                    onClick={handleClick}
                    component="img"
                    height="160"
                    sx={{ cursor: "pointer" }}
                    // image={item.imageUrl}
                    // alt={item.title}
                />
                <CardContent>
                    <Tooltip title={props.item.name} arrow>
                        <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            sx={{
                                display: "inline-block",
                                maxWidth: "100%",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {props.item.name}
                        </Typography>
                    </Tooltip>
                    <Typography variant="body2" color="text.secondary">
                        {props.item.sizeName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.item.price}€
                    </Typography>
                </CardContent>
                {isAuthorized && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            p: 1,
                        }}
                    >
                        <IconButton onClick={handleToggle} color="primary">
                            {isToggled ? (
                                <FavoriteSharpIcon />
                            ) : (
                                <FavoriteBorderIcon />
                            )}
                        </IconButton>
                        <IconButton color="primary">
                            <ShoppingCartIcon />
                        </IconButton>
                    </Box>
                )}
            </Card>
        </>
    );
};

export default ItemCard;
