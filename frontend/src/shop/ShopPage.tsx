import { Grid } from "@mui/material";
import ItemsGrid from "./components/ItemsGrid.tsx";
import SidePanel from "./components/SidePanel.tsx";
import {FilterProvider} from "../context/FilterContext.tsx";


const ShopPage = () => {

    return (
        <>
            <FilterProvider>
                <Grid container mt={1} spacing={2}>
                    <Grid item xs={12} md={3}>
                        <SidePanel/>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <ItemsGrid/>
                    </Grid>
                </Grid>
            </FilterProvider>
        </>
    );
};

export default ShopPage;
