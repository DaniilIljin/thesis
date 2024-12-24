import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
    Box,
    Divider,
    IconButton,
    Paper,
    TextField,
    Typography,
    Button,
} from "@mui/material";
import CategoryAccordion from "./CategoryAccordion.tsx";
import { useQuery } from "@tanstack/react-query";
import { BrandDTO, CategoryDTO } from "../dto.ts";
import { fetchBrands, fetchCategories } from "../api.ts";
import {useFilterContext} from "../../context/FilterContext.tsx";
import {useState} from "react";

const SidePanel = () => {

    const {priceSort, togglePriceSort, setBrandId, resetParams, setSearch} = useFilterContext()
    const [searchQuery, setSearchQuery] = useState<string>("");


    const { data: categories, isLoading, error } = useQuery<CategoryDTO[]>({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    const { data: brands } = useQuery<BrandDTO[]>({
        queryKey: ["brands"],
        queryFn: fetchBrands,
    });


    if (isLoading) return <div>Loading...</div>;
    if (error instanceof Error) return <div>Error: {error?.name}</div>;

    if (!categories) return "No categories";
    if (!brands) return "No brands";

    return (
        <>
            <Paper
                elevation={5}
                sx={{ padding: 2, bgcolor: "background.paper" }}
            >
                <Box sx={{ mb: 1 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => {
                                    setSearchQuery("")
                                    setSearch(searchQuery)
                                }} edge="end">
                                    <SearchIcon />
                                </IconButton>
                            ),
                        }}
                        sx={{
                            "& .MuiInputBase-root": { height: 40 },
                        }}
                    />
                </Box>

                <Divider />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        m: 1,
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={
                            priceSort === "asc" ? (
                                <ArrowDownwardIcon />
                            ) : (
                                <ArrowUpwardIcon />
                            )
                        }
                        onClick={togglePriceSort}
                        sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                            fontSize: "16px",
                        }}
                    >
                        price
                    </Button>
                </Box>
                <Divider />
                <Box
                    sx={{
                        cursor: "pointer",
                        fontSize: "16px",
                    }}
                >
                    <Typography
                    onClick={() => resetParams()}
                    >All</Typography>
                </Box>

                {categories.map((category, index) => (
                    <CategoryAccordion key={index} category={category} />
                ))}
                <Divider />
                {brands.map((brand, index) => (
                    <Box key={index} my={1}>
                        <Box
                            sx={{
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                fontSize: "16px",
                            }}
                        >
                            <Typography
                                onClick={() => setBrandId(brand.id)}
                            >{brand.name}</Typography>
                        </Box>
                    </Box>
                ))}
            </Paper>
        </>
    );
};

export default SidePanel;
