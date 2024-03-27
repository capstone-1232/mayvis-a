import {
    Autocomplete, Box, Button, Card, Grid, Paper,
    TextField, Typography, Stack, Pagination, Tooltip
} from "@mui/material";
import React, { useState, useEffect } from 'react';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ViewListIcon from '@mui/icons-material/ViewList';
import Link from "next/link";
import GridViewIcon from '@mui/icons-material/GridView';
import ModuleViewComponent from "@/components/ModuleViewComponent";
import ListViewComponent from "@/components/ListViewComponent";

import SearchField from "@/components/SearchField";
const itemsPerPage = 8;
const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
const baseURL = process.env.VERCEL_URL ? `${protocol}://${process.env.VERCEL_URL}` : `${protocol}://localhost:3000`;
const apiRoute = `${baseURL}/api/category`;

export async function getServerSideProps(context) {
    // Determine the base URL based on the environment (Vercel or local)

    let categoriesData = [];
    try {
        const res = await fetch(apiRoute, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Basic ${Buffer.from('techcoders.nait@gmail.com:techCoders1234').toString('base64')}`,
                // Include Authorization header if needed
            },
            // Additional options if needed
        });

        if (!res.ok) {
            const errorText = await res.text(); // or use `res.json()` if your API returns a JSON response
            throw new Error(`Failed to fetch category: ${errorText}`);
        }

        categoriesData = await res.json();
    } catch (error) {
        console.error('Error loading categories', error);
        // Pass the error message to the page's props or handle it as needed
        return { props: { categoriesData, error: error.message } };
    }

    return { props: { categoriesData } };
}



const Category = ({ categoriesData }) => {
    const [page, setPage] = useState(1);
    const [filteredData, setFilteredData] = useState(categoriesData);
    const [searchTerm, setSearchTerm] = useState('');
    const [propsData, setPropsData] = useState([]);
    const [viewMode, setViewMode] = useState('module');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSearchChange = (event, newValue) => {
        setSearchTerm(newValue);
        const lowercasedValue = newValue.toLowerCase();
        const filtered = categoriesData.filter(item =>
            item.category_name.toLowerCase().includes(lowercasedValue)
        );
        setFilteredData(filtered);
        setPropsData(tranformPropData(filtered));
        setPage(1);
    };

    const handleArchive = async (id) => {
        const res = await fetch(`${apiRoute}?id=${id}`, {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                is_archived: true,
            })
        })

        if (!res.ok) {
            console.error('Failed to archive record!');
            return;
        }
        const updatedList = categoriesData.filter(item => item._id !== id);
        setFilteredData(updatedList);
        setPropsData(tranformPropData(updatedList));
    }

    const noOfPages = Math.ceil(filteredData ? filteredData.length / itemsPerPage : 0);

    const tranformPropData = (data) => {
        return data
            ?.map(c => {
                return [
                    { key: 'Title', column: 'Category Name', value: c.category_name, show: true },
                    { key: 'Description', column: 'Description', value: c.description, show: true },
                    { key: 'Archived', column: 'Archived', value: c.is_archived ? 'Yes' : 'No', show: true },
                    { key: '_id', column: '_id', value: c._id, show: false },
                    { key: 'editUrlPath', column: 'Edit', value: 'category/editcategory', show: viewMode === 'module' ? false : true },
                    { key: 'viewUrlPath', column: 'View', value: 'category/viewcategory', show: viewMode === 'module' ? false : true },
                    { key: 'archive', column: 'Archive', action: () => handleArchive(c._id), show: false },
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
                        All Categories
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} container justifyContent="flex-end" spacing={2}>
                    <Grid item>
                        <Link href={'/category/addcategory'} >
                            <Button variant="contained" sx={{ backgroundColor: '#253C7C', borderRadius: '15px' }}>
                                + Create New Category
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href={'/category/archival'} >
                            <Button variant="contained" startIcon={<FilterAltIcon />} sx={{ backgroundColor: '#253C7C', borderRadius: '15px' }}>
                                Archival
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            <Paper elevation={12} sx={{ marginTop: 2, padding: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={7} md={5} lg={5}>
                        <Box
                            sx={{
                                width: '70%'
                            }}
                        >
                            <SearchField
                                id={"searchCategory"}
                                options={categoriesData?.map((category) => category.category_name)}
                                value={searchTerm}
                                onInputChange={handleSearchChange}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={0} sm={1} md={5} lg={6}></Grid>
                    <Grid item xs={4} sm={4} md={2} lg={1}>
                        <Box display="flex" justifyContent="flex-start">
                            <Tooltip title="List View">
                                <Button onClick={() => setViewMode('list')}>
                                    <ViewListIcon sx={{ fontSize: '40px', marginTop: 1, marginBottom: 1, color: '#253C7C', borderRadius: '15px' }} />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Card View">
                                <Button onClick={() => setViewMode('module')}>
                                    <GridViewIcon sx={{ fontSize: '40px', marginTop: 1, marginBottom: 1, color: '#253C7C', borderRadius: '15px' }} />
                                </Button>
                            </Tooltip>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
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
                            <Card elevation={0} sx={{ padding: 2, textAlign: 'center', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }}>No Record(s) Found</Card>
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

export default Category;
