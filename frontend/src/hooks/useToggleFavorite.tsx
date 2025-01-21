import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFavoriteItem } from "../api/item";

type UseToggleFavoriteProps = {
    itemId: number;
};

export const useToggleFavorite = ({ itemId }: UseToggleFavoriteProps) => {
    const queryClient = useQueryClient();

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
    };

    return {
        toggleFavorite,
    };
};
