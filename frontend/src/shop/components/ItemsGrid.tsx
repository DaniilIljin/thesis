import {
    Grid,
    Typography
} from "@mui/material";
import ItemCard from "./ItemCard.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchItems} from "../api.ts";
import {ItemDTO} from "../dto.ts";

const ItemsGrid = () => {
    const { data, isLoading, error } = useQuery<ItemDTO[]>({
            queryKey: ['items'],
            queryFn: fetchItems,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error instanceof Error)
        return <div>Error: {error?.name}</div>

    if (!data || data.length === 0) return <Typography variant='h4' color="inherit">No data available</Typography>;

    return (
        <>
            <Grid container spacing={2}>
                {data.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <ItemCard item={item} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default ItemsGrid;
