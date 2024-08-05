"use client";

import React, { useEffect, useState } from "react";
import {
    TextField,
    Button,
    Grid,
    Typography,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";
import { useAddProduct } from "@/Context/ProductDataContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "@/Firebase/FirebaseConfig"; 
import { useRouter } from "next/navigation";


const AddProductForm: React.FC = () => {
    const { state, addProduct, handleInputChange, handleFileChange } = useAddProduct();
    const { productData, loading } = state;
    const [sellerID, setSellerID] = useState<string | null>(null);
    const router =  useRouter();

    useEffect(() => {
        const fetchSellerID = () => {
            const user = auth.currentUser;
            console.log("user from add product form",user);
            if (user) {
                setSellerID(user.uid);
            }
        };

        fetchSellerID();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (sellerID) {
            await addProduct(sellerID); 
            setTimeout(() => {
                router.push("/SellerDashboard/Products")
            }, 1500);
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h4" gutterBottom>
                Add New Product
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        label="Product Name"
                        name="productName"
                        value={productData.productName}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        name="description"
                        value={productData.description}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            name="category"
                            value={productData.category}
                            onChange={handleInputChange}
                            fullWidth
                            required
                        > 
                            <MenuItem value="Electronics">Electronics</MenuItem>
                            <MenuItem value="Clothing">Clothing</MenuItem>
                            <MenuItem value="Books">Books</MenuItem>
                            <MenuItem value="Food">Food</MenuItem>
                            <MenuItem value="HomeKitchen">Home & Kitchen</MenuItem>
                            <MenuItem value="Toys">Toys</MenuItem>
                            <MenuItem value="Sports">Sports</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Price"
                        name="price"
                        type="number"
                        value={productData.price}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" component="label">
                        Upload Image
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Product'}
                    </Button>
                </Grid>
            </Grid>
            <ToastContainer />
        </form>
    );
};

export default AddProductForm;
