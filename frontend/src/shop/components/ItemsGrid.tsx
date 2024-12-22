import {
    Grid,
    Typography
} from "@mui/material";
import ItemCard from "./ItemCard.tsx";
import {useQuery} from "@tanstack/react-query";
import { fetchFavoriteIds, fetchItems} from "../api.ts";
import {ItemDTO} from "../dto.ts";
import {useAuth} from "../../context/AuthProvider.tsx";
import {useFilterContext} from "../../context/FilterContext.tsx";

const ItemsGrid = () => {

    const {isAuthorized} = useAuth()

    const {categoryId, brandId, priceSort} = useFilterContext()

    const { data: items, isLoading, error } = useQuery<ItemDTO[]>({
        queryKey: ['items', categoryId, brandId, priceSort],
        queryFn: () => fetchItems(categoryId, brandId, priceSort)
    });

    const { data: favoriteIds } = useQuery<number[]>({
        queryKey: ['favoritemIds'],
        queryFn: fetchFavoriteIds,
        enabled: isAuthorized,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error instanceof Error)
        return <div>Error: {error?.name}</div>

    if (!items || items.length === 0) return <Typography variant='h4' color="inherit">No data available</Typography>;

    const mappedItems = items?.map((item) => ({
        ...item,
        isToggled: isAuthorized && favoriteIds?.includes(item.id),
    }));


    return (
        <>
            <Grid container spacing={2}>
                {mappedItems.map((item, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <ItemCard item={item} isToggled={item.isToggled} />
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default ItemsGrid;
