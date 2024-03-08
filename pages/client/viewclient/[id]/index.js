import { Search } from "@mui/icons-material";
import { Box, FormControlLabel, Grid, Paper, Switch, TextField, Button, Typography, Snackbar, Slide, Alert, Autocomplete } from "@mui/material";
import Link from "next/link";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import React, { useState } from "react"
import { useRouter } from "next/router";

export async function getStaticProps({ params }) {
    try {
        const id = params.id;
        const res = await fetch(`http://localhost:3000/api/client/${id}`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch client');
        }
        const clientData = await res.json();
        return { props: { clientData } };
    }
    catch (error) {
        console.log('Error loading clients', error);
    }
}

export async function getStaticPaths() {
    const res = await fetch('http://localhost:3000/api/client', { cache: 'no-store' });
    const clients = await res.json();
    console.log(clients);
    const paths = clients.map((c) => ({
        params: { id: c._id.toString()},
    }))

    return { paths, fallback: false }
}

const ViewClient = ({ clientData }) => {
    const [filteredData, setFilteredData] = useState(clientData);
    //const [searchTerm, setSearchTerm] = useState('');

    // const handleSearchChange = (event, newValue) => {
    //     // setSearchTerm(newValue);
    //     // const lowercasedValue = newValue.toLowerCase();
    //     // const filtered = clientData?.contact.filter(item =>
    //     //     item.contact_firstname.toLowerCase().includes(lowercasedValue)
    //     // );
    //     // setFilteredData(filtered);
    //     //setPage(1);
    // };
    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" component="div" gutterBottom>
                        {filteredData[0].client_name}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} container justifyContent="flex-end" spacing={2}>
                    <Grid item>
                        <Button variant="contained" sx={{minHeight:'150px'}}>
                            Edit
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Paper elevation={12} sx={{ marginTop: 2, padding: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8} md={6}>
                        <Autocomplete
                            id="searchContact"
                            freeSolo
                            // options={clientData?.contact.map((contact) => contact.contact_firstname)}
                            // value={searchTerm}
                            // onInputChange={handleSearchChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search Client"
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
                    <Grid item xs={6} sm={4} md={2} container justifyContent="flex-start">
                        <Button variant="outlined" startIcon={<FilterAltIcon />}>
                            Filter
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3} container justifyContent="flex-start">
                        <Button variant="contained" fullWidth>
                            Add New Contact
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    {/* {filteredData
                        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                        .map((c, index) => (
                            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                <Card elevation={12} sx={{ padding: 2 }}>
                                    <Stack spacing={1}>
                                        <Typography variant="h5" component="div" gutterBottom>
                                            {c.client_name}
                                        </Typography>
                                        <Typography variant="body1">
                                            Active: {(c.is_active) ? 'Yes' : 'No'}
                                        </Typography>
                                        <Typography variant="body2">
                                            {c.description}
                                        </Typography>
                                    </Stack>
                                    <Stack alignItems="center">
                                        <Button variant="contained">
                                            View
                                        </Button>
                                    </Stack>
                                </Card>
                            </Grid>
                        ))} */}
                </Grid>
                {/* <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
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
                </Box> */}
            </Paper>

        </Box>
    );
};

export default ViewClient;