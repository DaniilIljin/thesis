import React from 'react';
import {IconButton} from "@mui/material";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useToggleFavorite} from "../../hooks/useToggleFavorite.tsx";

type Props = {
    itemId: number,
    initialIsToggled: boolean,
};
const LikeButton = (props: Props) => {
    const { toggleFavorite } = useToggleFavorite({
        itemId: props.itemId,
    });

    return (
        <IconButton onClick={toggleFavorite} color="primary">
            {props.initialIsToggled ? (
                <FavoriteSharpIcon />
            ) : (
                <FavoriteBorderIcon />
            )}
        </IconButton>
    );
};

export default LikeButton;