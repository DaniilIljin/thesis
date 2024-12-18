import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FolderIcon from "@mui/icons-material/Folder";
import SearchIcon from "@mui/icons-material/Search";
import {
    Box,
    ButtonGroup,
    Divider,
    IconButton,
    Paper,
    TextField, Tooltip,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import CategoryAccordion from "./CategoryAccordion.tsx";
import BrandAccordion from "./BrandAccordion.tsx";
import {useQuery} from "@tanstack/react-query";
import {BrandDTO, CategoryDTO} from "../dto.ts";
import {fetchBrands, fetchCategories} from "../api.ts";

const SidePanel = () => {
    const { data: categories, isLoading, error } = useQuery<CategoryDTO[]>({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    const { data: brands } = useQuery<BrandDTO[]>({
        queryKey: ['brands'],
        queryFn: fetchBrands,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error instanceof Error)
        return <div>Error: {error?.name}</div>

    if (!categories) return "No categories"
    if (!brands) return "No brands"


    return (
        <>
            <Paper
                elevation={5}
                sx={{ padding: 2, bgcolor: "background.paper" }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1,
                    }}
                >
                    <ButtonGroup variant="contained">
                        <Tooltip title="My favorites">
                            <IconButton component={Link} to='/myFavorites'>
                                <FavoriteIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="My items" >
                            <IconButton component={Link} to='/myItems'>
                                <FolderIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Add new item">
                            <IconButton component={Link} to='/addItem'>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </ButtonGroup>
                </Box>
                <Box sx={{ mb: 1 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="Search..."
                        InputProps={{
                            endAdornment: (
                                <IconButton edge="end">
                                    <SearchIcon />
                                </IconButton>
                            ),
                        }}
                        sx={{
                            "& .MuiInputBase-root": { height: 40 },
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        cursor: "pointer",
                        fontSize: "16px",
                    }}
                >
                    <Typography>All</Typography>
                </Box>

                {categories.map((category, index) => (
                    <CategoryAccordion key={index} category={category} />
                ))}
                <Divider />
                {brands.map((brand, index) => (
                    <BrandAccordion key={index} brand={brand} />
                ))}
            </Paper>
        </>
    );
};

export default SidePanel;
