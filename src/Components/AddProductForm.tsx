"use client";
import React from "react";
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
import { useAddProduct } from "@/context/ProductContext/ProductDataContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

const AddProductForm: React.FC = () => {
    const { state, addProduct, handleInputChange, handleFileChange } = useAddProduct();
    const { productData, loading } = state;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addProduct();
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
                        <input type="file" hidden onChange={handleFileChange}  />
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