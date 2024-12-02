import { Grid } from "@mui/material";
import ItemsGrid from "./components/ItemsGrid.tsx";
import SidePanel from "./components/SidePanel.tsx";


const ShopPage = () => {

    return (
        <>
            <Grid container mt={1} spacing={2}>
                <Grid item xs={12} md={3}>
                    <SidePanel/>
                </Grid>
                <Grid item xs={12} md={9}>
                    <ItemsGrid/>
                </Grid>
            </Grid>
        </>
    );
};

export default ShopPage;
