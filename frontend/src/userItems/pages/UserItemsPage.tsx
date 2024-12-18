import {Grid} from "@mui/material";
import UserItemsGrid from "../components/UserItemsGrid.tsx";

const UserItemsPage = () => {
return (
    <>
        <Grid container mt={1} spacing={2}>
            <UserItemsGrid/>
        </Grid>
    </>
)

};

export default UserItemsPage;