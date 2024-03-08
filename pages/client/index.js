import {
    Autocomplete, Box, Button, Card, Grid, Paper,
    TextField, Typography, Stack, Pagination
} from "@mui/material";
import React, { useState, useEffect } from 'react';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import Link from "next/link";

const itemsPerPage = 8;

const Client = () => {
    const [clientsData, setClientsData] = useState([]);
    const [page, setPage] = useState(1);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const getClients = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/client', { cache: 'no-store' });
            if (!res.ok) {
                throw new Error('Failed to fetch clients');
            }
            const json = await res.json();

            setClientsData(json);
            setFilteredData(json);
        }
        catch (error) {
            console.log('Error loading clients', error);
        }
    }

    getClients();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSearchChange = (event, newValue) => {
        setSearchTerm(newValue);
        const lowercasedValue = newValue.toLowerCase();
        const filtered = clientsData.filter(item =>
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

                        <Link href={'/client/newclient'} >
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
                            options={clientsData.map((client) => client.client_name)}
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
                    <Grid item xs={6} sm={4} md={2} container justifyContent="flex-end">
                        <Button variant="outlined" startIcon={<FilterAltIcon />}>
                            Filter
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    {filteredData
                        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                        .map((c, index) => (
                            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                <Card elevation={12} sx={{ padding: 2,  minHeight: '250px'}}>
                                    <Stack spacing={1}>
                                        <Typography variant="h5" component="div" gutterBottom>
                                            {c.client_name}
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
                                        <Typography variant="body2" sx={{minHeight:'150px'}}>
                                            Description:<br/>{c.description}
                                        </Typography>
                                    </Stack>
                                    <Stack alignItems="center">
                                        <Link href={`/client/viewclient/${c._id}`}>
                                        <Button variant="contained">
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

export default Client;
