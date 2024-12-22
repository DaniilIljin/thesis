import { createContext, useState, useContext, ReactNode } from "react";

type FilterContextType = {
    categoryId: number | undefined;
    brandId: number | undefined;
    priceSort: "asc" | "desc";
    setCategoryId: (categoryId: number) => void;
    setBrandId: (brandId: number) => void;
    togglePriceSort: () => void;
    resetFilters: () => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

type FilterProviderProps = {
    children: ReactNode;
};

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const [brandId, setBrandId] = useState<number | undefined>(undefined);
    const [priceSort, setPriceSort] = useState<"asc" | "desc">("asc");

    const handleCategoryClick = (categoryId: number) => {
        setCategoryId(categoryId);
        setBrandId(undefined);
    };

    const handleBrandClick = (brandId: number) => {
        setBrandId(brandId);
        setCategoryId(undefined);
    };

    const togglePriceSort = () => {
        setPriceSort((prev) => (prev === "asc" ? "desc" : "asc")); // Toggle price sort
    };

    const resetFilters = () => {
        setCategoryId(undefined);
        setBrandId(undefined);
    };

    return (
        <FilterContext.Provider
            value={{
                categoryId,
                brandId,
                priceSort,
                setCategoryId: handleCategoryClick,
                setBrandId: handleBrandClick,
                togglePriceSort,
                resetFilters,
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
