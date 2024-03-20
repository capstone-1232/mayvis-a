import {
    Box, FormControlLabel, Grid, Paper, Switch,
    TextField, Button, Typography, Snackbar, Slide, Alert,
    InputAdornment, InputLabel, FormControl, OutlinedInput, Autocomplete
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react"

const ProductAddEditFormComponent = ({ product }) => {
    const [productName, setProductName] = useState(product.productName);
    const [archived, setArchived] = useState(product.archived);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [category, setCategory] = useState(product.category);
    const [categoryId, setCategoryId] = useState(product.categoryId);
    const [isLoading, setIsLoading] = useState(product.isLoading)
    const [showMsg, setShowMsg] = useState(product.showMsg);
    const [msg, setMsg] = useState(product.msg);
    const [severity, setSeverity] = useState('error');
    const categories = product.categories;
    const router = useRouter();

    const handleMsg = (msg) => {
        setMsg(msg);
        setShowMsg(true);
    }

    const handleSearchChange = (event, newValue, newValueKey) => {
        setCategory(newValue);
        setCategoryId(newValueKey);
        // const lowercasedValue = newValue.toLowerCase();
        // const filtered = categoriesData.filter(item =>
        //     item.category_name.toLowerCase().includes(lowercasedValue)
        // );
        // setFilteredData(filtered);
        // setPropsData(tranformPropData(filtered));
        // setPage(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (!productName || !price) {
                setSeverity('error');
                handleMsg('Product Name and Price are required!');
                return;
            }
            
            const data = await product.processClient({
                product_name: productName,
                is_archived: archived,
                description: description,
                price: price,
                category_id: categoryId
            })

            if (data.error) {
                setSeverity('error');
                handleMsg(data.error);
            }
            else {
                setTimeout(() => {
                    setSeverity('success');
                    handleMsg('Product has been saved');
                    setTimeout(() => {
                        setIsLoading(false);
                        router.push('/products');
                    }, 1500);
                }, 500);
            }

        }
        catch (e) {
            throw e;
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ flexGrow: 1, padding: 2 }}>
                <Paper elevation={12} sx={{ marginTop: 2, padding: 5 }}>
                    <Grid container spacing={5} alignItems="center">
                        <Grid item xs={12}>
                            <Typography variant="h4" component="div" gutterBottom>
                                Products/Services
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel control={<Switch checked={archived} onChange={(e) => setArchived(e.target.checked)} />} label="Archive" />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                id="searchCategory"
                                freeSolo
                                options={categories?.map((cat) => (
                                    { label: cat.category_name, key: cat._id }
                                ))}
                                value={category}
                                onChange={(e, value) => handleSearchChange(e, value?.label, value?.key)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search Category"
                                        variant="outlined"
                                        fullWidth
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <SearchIcon sx={{ mr: 2 }} />
                                            ),
                                        }}
                                        required
                                        disabled = {(product.disableFields ? true: false)}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Product/Service" fullWidth value={productName} onChange={(e) => setProductName(e.target.value)} required 
                            disabled = {(product.disableFields ? true: false)}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <InputLabel htmlFor="price">Price</InputLabel>
                                <OutlinedInput
                                    id="price"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    endAdornment={<InputAdornment position="end">CAD</InputAdornment>}
                                    label="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                    disabled = {(product.disableFields ? true: false)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Description" fullWidth multiline
                                rows={15} value={description} onChange={(e) => setDescription(e.target.value)} required 
                                disabled = {(product.disableFields ? true: false)}/>
                        </Grid>
                        <Grid item xs={12} container justifyContent="flex-end" spacing={2}>
                            <Grid item>
                                <Link href={'/products'} >
                                    <Button variant="contained">
                                        Cancel
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" type="submit" disabled={isLoading}>
                                    {isLoading ? 'Saving...' : 'Save'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={showMsg}
                onClose={() => setShowMsg(false)}
                key={'topright'}
                TransitionComponent={(props) => <Slide {...props} direction="up" />}>
                <Alert

                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {msg}
                </Alert>
            </Snackbar>
        </form>
    );
}

export default ProductAddEditFormComponent;