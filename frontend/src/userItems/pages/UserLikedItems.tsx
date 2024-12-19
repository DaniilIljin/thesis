import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {ItemDTO} from "../dto.ts";
import {fetchUserFavorites} from "../api.ts";
import {Grid, Typography} from "@mui/material";
import ItemCard from "../../shop/components/ItemCard.tsx";

const UserLikedItems = () => {
    const {data, isLoading, error} = useQuery<ItemDTO[]>({
        queryKey: ['userFavorites'],
        queryFn: fetchUserFavorites,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error instanceof Error)
        return <div>Error: {error?.name}</div>

    if (!data || data.length === 0) return <Typography variant='h4' color="inherit">No data available</Typography>;

    return (
        <>
            <Grid justifyContent='center' container mt={1} spacing={2}>
                {data.map((item, index) => (
                    <Grid item xs={10} sm={4} md={3} key={index}>
                        <ItemCard item={item}/>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}
export default UserLikedItems;