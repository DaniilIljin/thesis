import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ItemDTO } from "../../dto/itemDto.ts";
import { useAuth } from "../../context/AuthContext.tsx";
import LikeButton from "../../shared/components/LikeButton.tsx";
import SharedItemCard from "../../shared/components/SharedItemCard.tsx";
import {useFavoriteIds} from "../../hooks/useFaviteIds.tsx";
import {useEffect, useState} from "react";

type Props = {
    item: ItemDTO;
    toggled: boolean;
};

const ItemCard = ({ item, toggled }: Props) => {
    const navigate = useNavigate();
    const [isToggled, setIsToggled] = useState(false);

    const { isAuthorized } = useAuth();

    const handleClick = () => {
        if (item?.id) {
            navigate(`/viewItem/${item.id}`);
        } else {
            console.error("Item ID is undefined");
        }
    };

    if (isAuthorized){
        const ids = useFavoriteIds()

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (ids.data?.includes(item.id)) {
                setIsToggled(true); // Mark as toggled if the item ID is in the list
            } else {
                setIsToggled(false); // Otherwise, mark as not toggled
            }
        }, [ids.data, item.id]);
    }

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
