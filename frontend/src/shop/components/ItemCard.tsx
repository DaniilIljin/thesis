import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ItemDTO } from "../dto.ts";
import { useAuth } from "../../context/AuthProvider.tsx";
import LikeButton from "../../shared/components/LikeButton.tsx";

type Props = {
    item: ItemDTO;
    isToggled: boolean;
};

const ItemCard = (props: Props) => {
    const navigate = useNavigate();
    const { isAuthorized } = useAuth();

    const handleClick = () => {
        if (props.item?.id) {
            navigate(`/viewItem/${props.item.id}`);
        } else {
            console.error("Item ID is undefined");
        }
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
                        {props.item.brandName}
                    </Typography>
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
                            justifyContent: "start",
                            p: 1,
                        }}
                    >
                        <LikeButton itemId={props.item.id} initialIsToggled={props.isToggled}/>
                    </Box>
                )}
            </Card>
        </>
    );
};

export default ItemCard;
