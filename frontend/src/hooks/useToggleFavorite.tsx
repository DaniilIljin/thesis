import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFavoriteItem } from "../shop/api.ts";

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
            queryClient.invalidateQueries(["items"]);
        },
        onError: (error) => {
            console.error("Failed to toggle favorite item:", error);
        },
    });

    const toggleFavorite = () => {
        setIsToggled((prev) => !prev);
        mutation.mutate();
    };

    return {
        isToggled,
        toggleFavorite,
    };
};
