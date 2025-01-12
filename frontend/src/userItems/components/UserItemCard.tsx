import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { ItemDTO } from "../../dto/itemDto.ts";
import { deleteUserItem } from "../../api/item.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SharedItemCard from "../../shared/components/SharedItemCard.tsx";

type Props = {
    item: ItemDTO;
};

const UserItemCard = ({ item }: Props) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const deleteItemMutation = useMutation({
        mutationFn: (id: number) => deleteUserItem(id),
        onSuccess: () => {
            queryClient.invalidateQueries("userItems");
        },
        onError: (error) => {
            console.error("Error deleting item:", error);
        },
    });

    const handleClick = (action: 'view' | 'edit') => {
        if (item?.id) {
            if (action === 'view') {
                navigate(`/viewItem/${item.id}`);
            } else if (action === 'edit') {
                navigate(`/editItem/${item.id}`);
            }
        } else {
            console.error("Item ID is undefined");
        }
    };


    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            deleteItemMutation.mutateAsync(item.id);
        }
    };

    return (
        <SharedItemCard item={item} onClick={() => handleClick('view')}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 1,
                }}
            >
                <IconButton onClick={() => handleClick('edit')} color="primary">
                    <EditIcon />
                </IconButton>
                <IconButton onClick={handleDelete} color="secondary">
                    <DeleteIcon />
                </IconButton>
            </Box>
        </SharedItemCard>
    );
};

export default UserItemCard;
