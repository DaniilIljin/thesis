import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    IconButton,
    Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { ItemDTO } from "../dto.ts";
import { deleteUserItem} from "../api.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

type Props = {
    item: ItemDTO;
};

const UserItemCard = (props: Props) => {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const deleteItemMutation = useMutation({
        mutationFn: (id: number) => deleteUserItem(id),
        onSuccess: () => {
            queryClient.invalidateQueries('userItems');
        },
        onError: (error) => {
            // Handle error here if needed
            console.error('Error deleting item:', error);
        },
    });

    const handleClick = () => {
        if (props.item?.id) {
            navigate(`/viewItem/${props.item.id}`);
        } else {
            console.error("Item ID is undefined");
        }
    };

    const handleEdit = () => {
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                deleteItemMutation.mutateAsync(props.item.id);
            } catch (error) {
                console.error("Error deleting item", error);
                alert("Failed to delete item");
            }
        }
    };

    return (
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
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 1,
                }}
            >
                <IconButton onClick={handleEdit} color="primary">
                    <EditIcon />
                </IconButton>

                <IconButton onClick={handleDelete} color="secondary">
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Card>
    );
};

export default UserItemCard;
