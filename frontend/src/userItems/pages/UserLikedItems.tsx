import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {ItemDTO} from "../../dto/itemDto.ts";
import {fetchUserFavorites} from "../../api/item.ts";
import {Grid} from "@mui/material";
import ItemCard from "../../shop/components/ItemCard.tsx";
import {useFavoriteIds} from "../../hooks/useFaviteIds.tsx";
import NoDataBox from "../../shared/components/NoDataBox.tsx";

const UserLikedItems = () => {

    const {data, isLoading, error} = useQuery<ItemDTO[]>({
        queryKey: ['userFavorites'],
        queryFn: fetchUserFavorites,
    });
    const {data: ids} = useFavoriteIds()

    if (isLoading) return <div>Loading...</div>;

    if (error instanceof Error)
        return <div>Error: {error?.name}</div>

    if (!data || data.length === 0) return <NoDataBox/>;

    console.log(data.map(i => i.id));

    return (
        <>
            <Grid justifyContent='center' container mt={1} spacing={2}>
                {data.map((item) => (
                    <Grid item xs={10} sm={4} md={3}>
                        <ItemCard item={item} isToggled={ids?.includes(item.id) || false} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}
export default UserLikedItems;