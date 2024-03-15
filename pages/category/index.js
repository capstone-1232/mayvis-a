import {
    Autocomplete, Box, Button, Card, Grid, Paper,
    TextField, Typography, Stack, Pagination
} from "@mui/material";
import React, { useState, useEffect } from 'react';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import Link from "next/link";

const itemsPerPage = 8;

// export async function getServerSideProps(context) {
//     const { req } = context;
//     // Determine the base URL based on the environment (Vercel or local)
//     const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
//     const host = req ? req.headers.host : window.location.hostname;
//     const baseURL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `${protocol}://${host}`;
//     const apiRoute = `${baseURL}/api/category`;
    
//     let categoriesData = [];
//     try {
//       const res = await fetch(apiRoute, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           //'Authorization': `Basic ${Buffer.from('techcoders.nait@gmail.com:techCoders1234').toString('base64')}`,
//           // Include Authorization header if needed
//         },
//         // Additional options if needed
//       });
      
//       if (!res.ok) {
//         const errorText = await res.text(); // or use `res.json()` if your API returns a JSON response
//         throw new Error(`Failed to fetch clients: ${errorText}`);
//       }
  
//       categoriesData = await res.json();
//     } catch (error) {
//       console.error('Error loading clients', error);
//       // Pass the error message to the page's props or handle it as needed
//       return { props: { categoriesData, error: error.message } };
//     }
  
//     return { props: { categoriesData, apiRoute } };
//   }
  


//const Category = ({ categoriesData, apiRoute }) => {
const Category = () => {
    //console.log('apiRoute:' + apiRoute);
    //console.log(categoriesData);
    const [page, setPage] = useState(1);
    const [categoriesData, setCategoriesData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
        //   const apiRoute = 'https://mayvis-a-git-dev-nina-techcoders-projects.vercel.app/api/category';
        const apiRoute = 'http://localhost:3000/api/category';
          console.log('apiRoute : ' + apiRoute);
          try {
            const res = await fetch(apiRoute);
            if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
            const data = await res.json();

            console.log(data);

            setCategoriesData(data);
            setFilteredData(data);
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
        
        fetchData();
      }, []);

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
        setPage(1);
    };

    const noOfPages = Math.ceil(filteredData ? filteredData.length / itemsPerPage : 0);

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" component="div" gutterBottom>
                        Category
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} container justifyContent="flex-end" spacing={2}>
                    <Grid item>

                        <Link href={'/category/addcategory'} >
                            <Button variant="contained" sx={{ backgroundColor: '#405CAA' }}>
                                Create New Category +
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" startIcon={<FilterAltIcon />} sx={{ backgroundColor: '#405CAA' }}>
                            Archival
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Paper elevation={12} sx={{ marginTop: 2, padding: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8} md={6}>
                        <Autocomplete
                            id="searchCategory"
                            freeSolo
                            options={categoriesData?.map((category) => category.category_name)}
                            value={searchTerm}
                            onInputChange={handleSearchChange}
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
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    {filteredData
                        ?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
                        ?.map((c, index) => (
                            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                <Card elevation={12} sx={{ padding: 2, minHeight: '250px' }}>
                                    <Stack spacing={1}>
                                        <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: "bold" }}>
                                            {c.category_name}
                                        </Typography>
                                        <Typography variant="body1">
                                            Active: {(c.is_active) ? 'Yes' : 'No'}
                                        </Typography>
                                        {/* {c.contact_id.length > 0 ?
                                            {c.contact_id.map((contact) => (
                                                <>
                                                    <Typography variant="body1">
                                                        Date: {p.proposeDate}
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        Status: {p.status}
                                                    </Typography>
                                                </>
                                            ))}
                                            : null} */}
                                        <Typography variant="body2" sx={{ minHeight: '150px' }}>
                                            Description:<br />{c.description}
                                        </Typography>
                                    </Stack>
                                    <Stack alignItems="center">
                                        <Link href={`/category/viewcategory/${c._id}`} style={{ width: "100%", textAlign: "center" }}>
                                            <Button variant="contained" sx={{ backgroundColor: "#405CAA", width: "30%" }}>
                                                View
                                            </Button>
                                        </Link>
                                    </Stack>
                                </Card>
                            </Grid>
                        ))}
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
