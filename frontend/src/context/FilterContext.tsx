import { createContext, useState, useContext, ReactNode } from "react";

type FilterContextType = {
    categoryId: number | undefined;
    brandId: number | undefined;
    priceSort: "asc" | "desc";
    setCategoryId: (categoryId: number) => void;
    setBrandId: (brandId: number) => void;
    togglePriceSort: () => void;
    resetParams: () => void;
    setSearch: (query: string) => void;
    searchQuery: string
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

type FilterProviderProps = {
    children: ReactNode;
};

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const [brandId, setBrandId] = useState<number | undefined>(undefined);
    const [priceSort, setPriceSort] = useState<"asc" | "desc">("asc");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const resetParams = () => {
        setSearchQuery("");
        setBrandId(undefined)
        setCategoryId(undefined)
    }

    const handleCategoryClick = (categoryId: number) => {
        resetParams()
        setCategoryId(categoryId);
    };

    const handleBrandClick = (brandId: number) => {
        resetParams()
        setBrandId(brandId);
    };

    const setSearch = (query: string) => {
        resetParams()
        setSearchQuery(query);
        console.log(searchQuery);
    };

    const togglePriceSort = () => {
        setPriceSort((prev) => (prev === "asc" ? "desc" : "asc")); // Toggle price sort
    };

    return (
        <FilterContext.Provider
            value={{
                categoryId,
                brandId,
                priceSort,
                searchQuery,
                setCategoryId: handleCategoryClick,
                setBrandId: handleBrandClick,
                togglePriceSort,
                resetParams,
                setSearch
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = (): FilterContextType => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilterContext must be used within a FilterProvider");
    }
    return context;
};
