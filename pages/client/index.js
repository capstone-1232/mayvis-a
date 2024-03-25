import {
    Autocomplete, Box, Button, Card, Grid, Paper,
    TextField, Typography, Stack, Pagination, ListItemAvatar
} from "@mui/material";
import React, { useState, useEffect } from 'react';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Link from "next/link";
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
import ModuleViewComponent from "@/components/ModuleViewComponent";
import ListViewComponent from "@/components/ListViewComponent";
import SearchField from "@/components/SearchField";

export async function getServerSideProps() {
    let clientsData = [{}];
    try {
        const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
        const baseURL = process.env.VERCEL_URL ? `${protocol}://${process.env.VERCEL_URL}` : `${protocol}://localhost:3000`;
        const apiRoute = `${baseURL}/api/client`;
        const res = await fetch(apiRoute, { cache: "no-store" });

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
    const [propsData, setPropsData] = useState([]);
    const [viewMode, setViewMode] = useState('module');

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
        setPropsData(tranformPropData(filtered));
        setPage(1);
    };

    const noOfPages = Math.ceil(filteredData?.length / itemsPerPage);

    const tranformPropData = (data) => {
        return data
            ?.map(c => {
                const primaryContact = c.contact_info?.find(contact => contact.is_primary === true);

                return [
                    { key: 'Title', column: 'Client Name', value: c.client_name, show: true },
                    { key: 'Contact Name', column: 'Contact Name', value: primaryContact ? `${primaryContact.contact_firstname} ${primaryContact.contact_lastname}` : 'N/A', show: true },
                    { key: 'Contact Email', column: 'Contact Email', value: primaryContact?.email || 'N/A', show: true },
                    { key: 'Contact No', column: 'Contact No', value: primaryContact?.contact_no || 'N/A', show: true },
                    { key: 'Active', column: 'Active', value: c.is_active ? 'Yes' : 'No', show: true },
                    { key: 'Description', column: 'Description', value: c.description, show: viewMode === 'module' ? true : false },
                    { key: '_id', column: '_id', value: c._id, show: false },
                    { key: 'editUrlPath', column: 'Edit', value: 'client/editclient', show: viewMode === 'module' ? false : true },
                    { key: 'viewUrlPath', column: 'View', value: 'client/viewclient', show: viewMode === 'module' ? false : true },
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
                        All Clients
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} container justifyContent="flex-end" spacing={2}>
                    <Grid item>

                        <Link href={'/client/addclient'} >
                            <Button variant="contained" sx={{ backgroundColor: '#253C7C', borderRadius: '15px' }}>
                                + Create New Client
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href={'/client/archival'} >
                            <Button variant="contained" startIcon={<FilterAltIcon />} sx={{ backgroundColor: '#253C7C', borderRadius: '15px' }}>
                                Archival
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            <Paper elevation={12} sx={{ marginTop: 2, padding: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8} md={6}>
                        <Box
                            mt={1}
                            sx={{
                                width: '70%',
                            }}
                        >
                            <SearchField
                                id={"searchClient"}
                                options={clientsData?.map((client) => client.client_name)}
                                value={searchTerm}
                                onInputChange={handleSearchChange}
                            />
                        </Box>
                        {/* <Autocomplete
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
                        /> */}
                    </Grid>

                    <Box display="flex" justifyContent="flex-start">
                        <Button onClick={() => setViewMode('list')}>
                            <ViewListIcon sx={{ fontSize: '40px', marginTop: 1, marginBottom: 1, color: '#253C7C', borderRadius: '15px' }} />
                        </Button>
                        <Button onClick={() => setViewMode('module')}>
                            <GridViewIcon sx={{ fontSize: '40px', marginTop: 1, marginBottom: 1, color: '#253C7C', borderRadius: '15px' }} />
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

        </Box >
    );
};

export default Client;
