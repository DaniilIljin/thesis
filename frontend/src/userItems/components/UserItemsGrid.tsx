import {
    Grid,
    Typography
} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {fetchUserItems} from "../api.ts";
import {ItemDTO} from "../dto.ts";
import UserItemCard from "./UserItemCard.tsx";

const UserItemsGrid = () => {
    const { data, isLoading, error } = useQuery<ItemDTO[]>({
        queryKey: ['userItems'],
        queryFn: fetchUserItems,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error instanceof Error)
        return <div>Error: {error?.name}</div>

    if (!data || data.length === 0) return <Typography variant='h4' color="inherit">No data available</Typography>;

    return (
        <>
            <Grid container spacing={2}>
                {data.map((item, index) => (
                    <Grid item xs={12} sm={4} md={3} key={index}>
                        <UserItemCard item={item} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default UserItemsGrid;
