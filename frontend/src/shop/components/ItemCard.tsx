import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ItemDTO } from "../../dto/itemDto.ts";
import { useAuth } from "../../context/AuthContext.tsx";
import LikeButton from "../../shared/components/LikeButton.tsx";
import SharedItemCard from "../../shared/components/SharedItemCard.tsx";

type Props = {
    item: ItemDTO;
    isToggled: boolean;
};

const ItemCard = ({ item, isToggled }: Props) => {
    const navigate = useNavigate();
    const { isAuthorized } = useAuth();

    const handleClick = () => {
        if (item?.id) {
            navigate(`/viewItem/${item.id}`);
        } else {
            console.error("Item ID is undefined");
        }
    };

    return (
        <SharedItemCard item={item} onClick={handleClick}>
            {isAuthorized && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "start",
                        p: 1,
                    }}
                >
                    <LikeButton itemId={item.id} initialIsToggled={isToggled} />
                </Box>
            )}
        </SharedItemCard>
    );
};

export default ItemCard;
