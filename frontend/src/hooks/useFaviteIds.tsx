import {useQuery} from "@tanstack/react-query";
import {fetchFavoriteIds} from "../api/item.ts";
import {useAuth} from "../context/AuthContext.tsx";

export const useFavoriteIds = () => {
    const {isAuthorized} = useAuth()
    return useQuery<number[]>({
        queryKey: ["favoriteItemIds"],
        queryFn: fetchFavoriteIds,
        enabled: isAuthorized,
    });
};