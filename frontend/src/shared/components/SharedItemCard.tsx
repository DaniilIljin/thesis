import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Tooltip,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchItemImageUrls } from "../../api/common.ts";
import { useDefaultImageContext } from "../../context/DefaultImageContext.tsx";
import {ItemDTO} from "../../dto/itemDto.ts";

type SharedProps = {
    item: ItemDTO;
    onClick?: () => void;
    children?: React.ReactNode;
};

const SharedItemCard = ({ item, onClick, children }: SharedProps) => {
    const { defaultFileNames, defaultImages } = useDefaultImageContext();

    const isOriginalImage =
        !!item.pictureFileName && !defaultFileNames.includes(item.pictureFileName);

    const { data } = useQuery({
        queryKey: ["itemImage", item.pictureFileName],
        queryFn: () => fetchItemImageUrls([item.pictureFileName]),
        enabled: isOriginalImage,
    });

    const imageUrl = isOriginalImage ? data?.[0]?.url : defaultImages[0]?.url;

    return (
        <Card elevation={5}>
            <CardMedia
                onClick={onClick}
                component="img"
                height="160"
                sx={{
                    cursor: "pointer",
                    objectFit: "contain",
                    width: "auto",
                    maxHeight: "160px",
                    margin: "0 auto",
                }}
                image={imageUrl}
                alt={item.name}
            />
            <CardContent>
                <Tooltip title={item.name} arrow>
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                            display: "inline-block",
                            maxWidth: "100%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {item.name}
                    </Typography>
                </Tooltip>
                <Typography variant="body2" color="text.secondary">
                    {item.brandName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {item.sizeName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {item.price}€
                </Typography>
            </CardContent>
            {children}
        </Card>
    );
};

export default SharedItemCard;
