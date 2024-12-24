import {useQuery} from "@tanstack/react-query";
import {fetchFavoriteIds} from "../shop/api.ts";

export const useFavoriteIds = (isAuthorized: boolean) => {
    return useQuery<number[]>({
        queryKey: ["favoriteItemIds"],
        queryFn: fetchFavoriteIds,
        enabled: isAuthorized, // Only fetch if the user is authorized
    });
};