import {
    Autocomplete, Box, Button, Card, Grid, Paper,
    TextField, Typography, Stack, Pagination, ListItemAvatar, Tooltip, IconButton
} from "@mui/material";
import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CircleIcon from '@mui/icons-material/Circle';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import Link from "next/link";
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';

export async function getServerSideProps() {
    let clientsData = [{}];
    try {
        //console.log(process.env.VERCEL_URL);
        // const res = await fetch(process.env.VERCEL_URL + '/api/client', { cache: "no-store" });
        const res = await fetch('http://localhost:3000/api/client', { cache: "no-store" });

        // res.setHeader(
        //     'Cache-Control',
        //     'public, s-maxage=10, stale-while-revalidate=59'
        //   )
        if (!res.ok) {
            throw new Error('Failed to fetch clients');
        }
        clientsData = await res.json();

    }
    catch (error) {
        console.log('Error loading clients', error);
    }
    return { props: { clientsData } };
}

const itemsPerPage = 8;

const Client = ({ clientsData }) => {
    const [page, setPage] = useState(1);
    const [filteredData, setFilteredData] = useState(clientsData);
    const [searchTerm, setSearchTerm] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSearchChange = (event, newValue) => {
        setSearchTerm(newValue);
        const lowercasedValue = newValue.toLowerCase();
        const filtered = clientsData?.filter(item =>
            item.client_name.toLowerCase().includes(lowercasedValue)
        );
        setFilteredData(filtered);
        setPage(1);
    };

    const noOfPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" component="div" gutterBottom>
                        Client
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} container justifyContent="flex-end" spacing={2}>
                    <Grid item>

                        <Link href={'/client/addclient'} >
                            <Button variant="contained">
                                Create New Client +
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
                            id="searchClient"
                            freeSolo
                            options={clientsData?.map((client) => client.client_name)}
                            value={searchTerm}
                            onInputChange={handleSearchChange}
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

                    <Box display="flex" justifyContent="flex-start">
                        <Link href={`/client/clientlistview`} className="link">
                            <Button>
                                <ViewListIcon sx={{ fontSize: '40px', marginTop: 1, marginBottom: 1 }} />
                            </Button>
                        </Link>
                        <Link href={`/client/`} className="link">
                            <Button>
                                <GridViewIcon sx={{ fontSize: '40px', marginTop: 1, marginBottom: 1 }} />
                            </Button>
                        </Link>
                    </Box>

                </Grid>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>

                    <Grid container spacing={2} sx={{ margin: 10 }}>
                        
                        <Grid item xs={12} sm={4} md={2}>
                            <Typography gutterBottom fontSize={25} component="div" sx={{ fontWeight: "bold" }}>
                                Client Name
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <Typography gutterBottom fontSize={25} component="div" sx={{ fontWeight: "bold" }}>
                                Contact Name
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <Typography gutterBottom fontSize={25} component="div" sx={{ fontWeight: "bold" }}>
                                Contact Email
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <Typography gutterBottom fontSize={25} component="div" sx={{ fontWeight: "bold" }}>
                                Contact No
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <Typography gutterBottom fontSize={25} component="div" sx={{ fontWeight: "bold" }}>
                                Active
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <Typography gutterBottom fontSize={25} component="div" sx={{ fontWeight: "bold" }}>
                                Edit
                            </Typography>
                        </Grid>
                        {filteredData && filteredData.length > 0 ? filteredData
                            ?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
                            ?.map((c, index) => (
                                <React.Fragment key={index}>
                                    <Grid item xs={12} sm={4} md={2}>
                                        <Typography gutterBottom component="div" fontSize={20}>
                                            {c.client_name}
                                        </Typography>
                                    </Grid>
                                    {c.contact_info?.filter(contact => contact.is_primary == true)?.map((contact, index) =>
                                        <React.Fragment key={index}>
                                            <Grid item xs={12} sm={4} md={2}>
                                                <Typography gutterBottom component="div" fontSize={20}>
                                                {`${contact.contact_firstname} ${contact.contact_lastname}`}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={2}>
                                                <Typography gutterBottom component="div" fontSize={20}>
                                                {`${contact.contact_no}`}
                                                </Typography>
                                            </Grid>
                                        </React.Fragment>
                                    )}
                                    <Grid item xs={12} sm={4} md={2}>
                                        <CircleIcon fontSize="large" color={c.is_active ? "success" : "disabled"}>{" "}</CircleIcon>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={2}>
                                        <Link href={`/client/viewclient/${c._id}`}>
                                            <Tooltip title="View" placement="right-start">
                                                <IconButton>
                                                    <EditIcon fontSize="large"></EditIcon>
                                                </IconButton>
                                            </Tooltip>
                                        </Link>
                                    </Grid>
                                </React.Fragment>
                            )) :
                            <Grid item xs={12}>
                                <Card elevation={0} sx={{ padding: 2, textAlign: 'center' }}>No Record(s) Found</Card>
                            </Grid>
                        }
                    </Grid>
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

export default Client;
