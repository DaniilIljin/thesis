import {
    Grid,
    Typography
} from "@mui/material";
import ItemCard from "./ItemCard.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchItems} from "../../api/item.ts";
import {ItemDTO} from "../../dto/itemDto.ts";
import {useFilterContext} from "../../context/FilterContext.tsx";
import {useFavoriteIds} from "../../hooks/useFaviteIds.tsx";

const ItemsGrid = () => {

    const {categoryId, brandId, priceSort, searchQuery} = useFilterContext()

    const { data: items, isLoading, error } = useQuery<ItemDTO[]>({
        queryKey: ['items', categoryId, brandId, priceSort, searchQuery],
        queryFn: () => fetchItems(categoryId, brandId, priceSort, searchQuery)
    });


    if (isLoading) return <div>Loading...</div>;

    if (error instanceof Error)
        return <div>Error: {error?.name}</div>

    if (!items || items.length === 0) return <Typography variant='h4' color="inherit">No data available</Typography>;

    return (
        <>
            <Grid container spacing={2}>
                {items.map((item, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <ItemCard item={item} />
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default ItemsGrid;
