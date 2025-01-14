import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFavoriteItem } from "../api/item";

type UseToggleFavoriteProps = {
    itemId: number;
    initialIsToggled: boolean;
};

export const useToggleFavorite = ({ itemId, initialIsToggled }: UseToggleFavoriteProps) => {
    const queryClient = useQueryClient();
    const [isToggled, setIsToggled] = useState(initialIsToggled);

    const mutation = useMutation({
        mutationFn: () => postFavoriteItem(itemId),
        onSuccess: () => {
            queryClient.invalidateQueries(["favoriteItemIds"]);
        },
        onError: (error) => {
            console.error("Failed to toggle favorite item:", error);
        },
    });

    const toggleFavorite =  async () => {
        mutation.mutate();
        setIsToggled((i) => !i);
    };

    return {
        isToggled,
        toggleFavorite,
    };
};
