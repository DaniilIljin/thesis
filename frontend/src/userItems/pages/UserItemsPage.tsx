import {Grid} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {ItemDTO} from "../../dto/itemDto.ts";
import {fetchUserItems} from "../../api/item.ts";
import UserItemCard from "../components/UserItemCard.tsx";
import NoDataBox from "../../shared/components/NoDataBox.tsx";

const UserItemsPage = () => {

    const { data, isLoading, error } = useQuery<ItemDTO[]>({
        queryKey: ['userItems'],
        queryFn: fetchUserItems,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error instanceof Error)
        return <div>Error: {error?.name}</div>

    if (!data || data.length === 0) return <NoDataBox/>;

return (
    <>
        <Grid justifyContent='center' container mt={1} spacing={2}>
            {data.map((item, index) => (
                <Grid item xs={10} sm={4} md={3} key={index}>
                    <UserItemCard item={item} />
                </Grid>
            ))}
        </Grid>
    </>
)

};

export default UserItemsPage;