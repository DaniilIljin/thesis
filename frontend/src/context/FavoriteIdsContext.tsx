import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import apiClient from "../shared/Axios.ts";
import {useAuth} from "./AuthProvider.tsx";

const FavoriteIdsContext = createContext<number[] | undefined>(undefined);

const fetchFavoriteIds = async (): Promise<number[]> => {
    return apiClient.get('/api/items/favoriteIds').then(response => response.data)
};

export const FavoriteIdsProvider = ({ children }: { children: React.ReactNode }) => {
    const {isAuthorized} = useAuth()

    const { data: favoriteIds } = useQuery({
        queryKey: ["favoriteIds"],
        queryFn: fetchFavoriteIds,
        enabled: isAuthorized
    });

    return (
        <FavoriteIdsContext.Provider value={favoriteIds}>
            {children}
        </FavoriteIdsContext.Provider>
    );
};

export const useFavoriteIds = () => {
    const favoriteIds = useContext(FavoriteIdsContext);
    if (favoriteIds === undefined) {
        throw new Error("useFavoriteIds must be used within a FavoriteIdsProvider");
    }
    return favoriteIds;
};
