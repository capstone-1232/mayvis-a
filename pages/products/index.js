import {
    Autocomplete, Box, Button, Card, Grid, Paper,
    TextField, Typography, Stack, Pagination
} from "@mui/material";
import React, { useState, useEffect } from 'react';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
//import productsData from "@/public/data/productsData.json";
import GridViewIcon from '@mui/icons-material/GridView';
import ModuleViewComponent from "@/components/ModuleViewComponent";
import ListViewComponent from "@/components/ListViewComponent";
import Link from "next/link";
import ViewListIcon from '@mui/icons-material/ViewList';

export async function getServerSideProps() {
    let productsData = [{}];
    try {
        //console.log(process.env.VERCEL_URL);
        // const res = await fetch(process.env.VERCEL_URL + '/api/client', { cache: "no-store" });
        const res = await fetch('http://localhost:3000/api/products', { cache: "no-store" });

        // res.setHeader(
        //     'Cache-Control',
        //     'public, s-maxage=10, stale-while-revalidate=59'
        //   )
        if (!res.ok) {
            throw new Error('Failed to fetch clients');
        }
        productsData = await res.json();

    }
    catch (error) {
        console.log('Error loading clients', error);
    }
    return { props: { productsData } };
}

const itemsPerPage = 8;

const Products = ({ productsData }) => {
    const [page, setPage] = useState(1);
    const [filteredData, setFilteredData] = useState(productsData);
    const [searchTerm, setSearchTerm] = useState('');
    const [propsData, setPropsData] = useState([]);
    const [viewMode, setViewMode] = useState('module');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSearchChange = (event, newValue) => {
        setSearchTerm(newValue);
        const lowercasedValue = newValue.toLowerCase();
        const filtered = productsData.filter(item =>
            item.product_name.toLowerCase().includes(lowercasedValue)
        );
        setFilteredData(filtered);
        setPropsData(tranformPropData(filtered));
        setPage(1);
    };

    const noOfPages = Math.ceil(filteredData?.length / itemsPerPage);

    const tranformPropData = (data) => {
        console.log(data);
        return data
            ?.map(c => {
                return [
                    { key: 'Title', column: 'Product Name', value: c.product_name, show: true },
                    { key: 'Price', column: 'Price', value: c.price.$numberDecimal, show: true },
                    { key: 'Description', column: 'Description', value: c.description, show: viewMode === 'module' ? true : false },
                    { key: 'Created By', column: 'Created By', value: `${c.created_user.firstname} ${c.created_user.lastname}`, show: viewMode === 'module' ? false : true },
                    { key: 'Created Date', column: 'Created Date', value: c.createdAt, show: viewMode === 'module' ? false : true },
                    { key: '_id', column: '_id', value: c._id, show: false },
                    { key: 'editUrlPath', column: 'Edit', value: 'products/editproduct', show: viewMode === 'module' ? false : true},
                    { key: 'viewUrlPath', column: 'View', value: 'products/viewproduct', show: viewMode === 'module' ? false : true },
                ];
            });
    }

    useEffect(() => {
        setPropsData(tranformPropData(filteredData));
    }, [viewMode]);

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" component="div" gutterBottom>
                        Products/Services
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} container justifyContent="flex-end" spacing={2}>
                    <Grid item>
                        <Link href={'/products/addproduct'} >
                            <Button variant="contained">
                                Add New Products +
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" startIcon={<FilterAltIcon />}>
                            Archival
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Paper elevation={12} sx={{ marginTop: 2, padding: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8} md={6}>
                        <Autocomplete
                            id="searchProducts"
                            freeSolo
                            options={productsData?.map((products) => products.product_name)}
                            value={searchTerm}
                            onInputChange={handleSearchChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search Products"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <SearchIcon sx={{ mr: 2 }} />
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Box display="flex" justifyContent="flex-start">
                        <Button onClick={() => setViewMode('list')}>
                            <ViewListIcon sx={{ fontSize: '40px', marginTop: 1, marginBottom: 1 }} />
                        </Button>
                        <Button onClick={() => setViewMode('module')}>
                            <GridViewIcon sx={{ fontSize: '40px', marginTop: 1, marginBottom: 1 }} />
                        </Button>
                    </Box>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    {propsData ?
                        viewMode === 'list' ?
                            <ListViewComponent data={propsData?.slice((page - 1) * itemsPerPage, page * itemsPerPage)} />
                            :
                            propsData?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
                                ?.map((data, index) =>
                                (
                                    <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                        <ModuleViewComponent key={index} data={data} />
                                    </Grid>
                                ))
                        :
                        <Grid item xs={12}>
                            <Card elevation={0} sx={{ padding: 2, textAlign: 'center' }}>No Record(s) Found</Card>
                        </Grid>
                    }
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Pagination
                        count={noOfPages}
                        page={page}
                        onChange={handleChangePage}
                        defaultPage={1}
                        color="primary"
                        size="large"
                        showFirstButton
                        showLastButton
                        sx={{ margin: 'auto' }}
                    />
                </Box>
            </Paper>

        </Box>
    );
};

export default Products;
