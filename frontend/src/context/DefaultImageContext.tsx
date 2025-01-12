import React, { createContext, useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchItemImageUrls} from "../api/common.ts";
import {FilePresignedUrlDTO} from "../dto/common.ts";

type DefaultImageContextValue = {
    defaultImages: FilePresignedUrlDTO[];
    defaultFileNames: string[];
    isLoading: boolean;
    isError: boolean;
};

const DefaultImageContext = createContext<DefaultImageContextValue | undefined>(undefined);

const FIXED_FILE_NAMES = [
    "carhartt-cap2.jpg",
    "carhartt-cap1.jpg",
];

export const DefaultImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data, isLoading, isError } = useQuery<FilePresignedUrlDTO[]>({
        queryKey: ["defaultImages", FIXED_FILE_NAMES],
        queryFn: () => fetchItemImageUrls(FIXED_FILE_NAMES),
        staleTime: Infinity
    });

    const imageUrls = useMemo(() => data || [], [data]);
    const value: DefaultImageContextValue = {
        defaultImages: imageUrls,
        defaultFileNames: FIXED_FILE_NAMES,
        isLoading,
        isError,
    };

    return <DefaultImageContext.Provider value={value}>{children}</DefaultImageContext.Provider>;
};

export const useDefaultImageContext = () => {
    const context = useContext(DefaultImageContext);
    if (!context) {
        throw new Error("useDefaultImageContext must be used within a DefaultImageProvider");
    }
    return context;
};
