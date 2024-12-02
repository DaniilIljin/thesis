// import DeleteIcon from "@mui/icons-material/Delete";
// import SaveIcon from '@mui/icons-material/Save';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import {
//     Box,
//     Button,
//     CardMedia,
//     Grid,
//     IconButton,
//     MenuItem,
//     TextField,
//     Typography,
// } from "@mui/material";
// import React, { ChangeEvent, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import Carousel from "react-material-ui-carousel";
//
// interface FormValues {
//     itemName: string;
//     categoryId: string;
//     brandId?: string;
//     description: string;
//     price: number;
// }
//
// const AddItem: React.FC = () => {
//     const [confirmationMessage, setConfirmationMessage] = useState<
//         string | null
//     >(null);
//
//     const [images, setImages] = useState<{ src: string; file: File }[]>([]);
//     const { control, handleSubmit } = useForm<FormValues>();
//
//     const { categories } = useFetchCategories();
//     const { brands } = useFetchBrands();
//
//     const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
//         const files = event.target.files;
//         if (files) {
//             const newImages = Array.from(files).map((file) => ({
//                 src: URL.createObjectURL(file),
//                 file,
//             }));
//             setImages((prevImages) => [...prevImages, ...newImages]);
//         }
//     };
//
//     const handleRemoveImage = (index: number) => {
//         setImages((prevImages) => prevImages.filter((_, i) => i !== index));
//     };
//
//     const onSubmit = async (data: FormValues) => {
//         console.log(data);
//         return
//
//         try {
//             const response = await fetch("http://localhost:8080/api/item", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data),
//             });
//
//             if (response.ok) {
//                 setConfirmationMessage("Item added successfully!");
//             } else {
//                 const errorData = await response.json();
//                 setConfirmationMessage(
//                     `Failed to add item: ${
//                         errorData.message || "Please try again."
//                     }`
//                 );
//             }
//         } catch (error) {
//             console.error("Error adding item:", error);
//             setConfirmationMessage("An error occurred. Please try again.");
//         }
//     };
//
//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <Box mt={2}>
//                 <Grid container spacing={2}>
//                     {/* Left side: Image Carousel and Upload Button */}
//                     <Grid item xs={12} md={6}>
//                         <Box sx={{ mb: 4 }}>
//                             {" "}
//                             {/* Increased margin bottom for better separation */}
//                             <Carousel
//                                 navButtonsAlwaysVisible={true}
//                                 sx={{ height: "300px" }} // Adjust height as needed
//                             >
//                                 {images.map((img, index) => (
//                                     <CardMedia
//                                         key={index} // Using index as key for simplicity
//                                         component="img"
//                                         image={img.src}
//                                         alt={`Uploaded ${index}`}
//                                         sx={{
//                                             height: "100%", // Adjusts height automatically based on image aspect ratio
//                                             width: "100%", // Ensure it takes up the full width of its container
//                                             objectFit: "cover", // Ensures the image covers the area while maintaining aspect ratio
//                                             borderRadius: 1, // Applies rounded corners
//                                             overflow: "hidden", // Ensures image stays within rounded corners
//                                         }}
//                                     />
//                                 ))}
//                             </Carousel>
//                         </Box>
//                         <Button
//                             variant="contained"
//                             component="label"
//                             fullWidth
//                             startIcon={<UploadFileIcon/>}
//                             sx={{ mt: 2 }}
//                         >
//                             Upload Images
//                             <input
//                                 hidden
//                                 accept="image/*"
//                                 multiple
//                                 type="file"
//                                 onChange={handleImageUpload}
//                             />
//                         </Button>
//                         <Box
//                             sx={{
//                                 display: "flex",
//                                 flexWrap: "wrap",
//                                 gap: 1,
//                                 mt: 2,
//                             }}
//                         >
//                             {images.map((img, index) => (
//                                 <Box
//                                     key={index}
//                                     sx={{
//                                         position: "relative",
//                                         width: "100px",
//                                         height: "100px",
//                                     }}
//                                 >
//                                     <img
//                                         src={img.src}
//                                         alt={`Thumbnail ${index}`}
//                                         style={{
//                                             width: "100%",
//                                             height: "100%",
//                                             objectFit: "cover",
//                                             borderRadius: "4px",
//                                         }}
//                                     />
//                                     <IconButton
//                                         onClick={() => handleRemoveImage(index)}
//                                         sx={{
//                                             position: "absolute",
//                                             top: 0,
//                                             right: 0,
//                                             color: "red",
//                                             backgroundColor:
//                                                 "rgba(255, 255, 255, 0.7)",
//                                             "&:hover": {
//                                                 backgroundColor:
//                                                     "rgba(255, 255, 255, 0.9)",
//                                             },
//                                         }}
//                                     >
//                                         <DeleteIcon />
//                                     </IconButton>
//                                 </Box>
//                             ))}
//                         </Box>
//                     </Grid>
//
//                     {/* Right side: Form */}
//                     <Grid item xs={12} md={6}>
//                         <Typography variant="h5" color="primary" gutterBottom>
//                             Add New Item:
//                         </Typography>
//                         <Controller
//                             name="itemName"
//                             control={control}
//                             defaultValue=""
//                             rules={{ required: 'Item Name is required' }}
//                             render={({ field }) => (
//                                 <TextField
//                                     {...field}
//                                     label="Item Name"
//                                     fullWidth
//                                     variant="outlined"
//                                     sx={{ mb: 2 }}
//                                 />
//                             )}
//                         />
//                         <Controller
//                             name="categoryId"
//                             defaultValue=''
//                             control={control}
//                             rules={{ required: 'Category is required' }}
//                             render={({ field }) => (
//                                 <TextField
//                                     {...field}
//                                     label="Category"
//                                     select
//                                     fullWidth
//                                     variant="outlined"
//                                     sx={{ mb: 2 }}
//                                 >
//                                     {categories.map((cat) => (
//                                         <MenuItem key={cat.id} value={cat.id}>
//                                             {cat.name}
//                                         </MenuItem>
//                                     ))}
//                                 </TextField>
//                             )}
//                         />
//                         <Controller
//                             name="brandId"
//                             control={control}
//                             defaultValue=""
//                             render={({ field }) => (
//                                 <TextField
//                                     {...field}
//                                     label="Brand"
//                                     select
//                                     fullWidth
//                                     variant="outlined"
//                                     sx={{ mb: 2 }}
//                                 >
//                                     {brands.map((brand) => (
//                                         <MenuItem key={brand.id} value={brand.id}>
//                                             {brand.name}
//                                         </MenuItem>
//                                     ))}
//                                 </TextField>
//                             )}
//                         />
//                         <Controller
//                             name="description"
//                             control={control}
//                             rules={{ required: 'Description is required' }}
//                             render={({ field }) => (
//                                 <TextField
//                                     {...field}
//                                     label="Description"
//                                     multiline
//                                     rows={4}
//                                     fullWidth
//                                     variant="outlined"
//                                     sx={{ mb: 2 }}
//                                 />
//                             )}
//                         />
//                         <Controller
//                             name="price"
//                             control={control}
//                             rules={{ required: 'Price is required' }}
//                             render={({ field }) => (
//                                 <TextField
//                                     {...field}
//                                     label="Price (€)"
//                                     fullWidth
//                                     variant="outlined"
//                                     type="number"
//                                     sx={{ mb: 2 }}
//                                 />
//                             )}
//                         />
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             type="submit"
//                             startIcon={<SaveIcon/>}
//                             fullWidth
//                         >
//                             Add Item
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </Box>
//             {confirmationMessage && (
//                 <div
//                     style={{
//                         marginTop: "16px",
//                         color: confirmationMessage.includes("successfully")
//                             ? "green"
//                             : "red",
//                     }}
//                 >
//                     {confirmationMessage}
//                 </div>
//             )}
//         </form>
//     );
// };
//
// export default AddItem;
