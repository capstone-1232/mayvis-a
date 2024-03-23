import {
    Autocomplete, Box, Button, Card, Grid, Paper,
    TextField, Typography, Stack, Pagination
} from "@mui/material";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ViewListIcon from '@mui/icons-material/ViewList';
import Link from "next/link";
import GridViewIcon from '@mui/icons-material/GridView';
import ModuleViewComponent from "@/components/ModuleViewComponent";
import ListViewComponent from "@/components/ListViewComponent";

import SearchField from "@/components/SearchField";
const itemsPerPage = 8;

export async function getServerSideProps(context) {
    const { req } = context;
    // Determine the base URL based on the environment (Vercel or local)
    const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
    const host = req ? req.headers.host : window.location.hostname;
    const baseURL = process.env.VERCEL_URL ? `${protocol}://${process.env.VERCEL_URL}` : `${protocol}://${host}`;
    const apiRoute = `${baseURL}/api/proposal`;

    let proposalsData = [];
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
            throw new Error(`Failed to fetch proposal: ${errorText}`);
        }

        proposalsData = await res.json();
    } catch (error) {
        console.error('Error loading proposals', error);
        // Pass the error message to the page's props or handle it as needed
        return { props: { proposalsData, error: error.message } };
    }

    return { props: { proposalsData } };
}



const Proposal = ({ proposalsData }) => {
    const [page, setPage] = useState(1);
    const router = useRouter();

    const [filteredData, setFilteredData] = useState(proposalsData);
    const [searchTerm, setSearchTerm] = useState('');
    const [propsData, setPropsData] = useState([]);
    const [viewMode, setViewMode] = useState('module');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const navigateToClientDetails = () => {
        router.push('/new-proposal/client-details');
    };

    const handleSearchChange = (event, newValue) => {
        setSearchTerm(newValue);
        const lowercasedValue = newValue.toLowerCase();
        const filtered = proposalsData.filter(item =>
            item.proposal_name.toLowerCase().includes(lowercasedValue)
        );
        setFilteredData(filtered);
        setPropsData(tranformPropData(filtered));
        setPage(1);
    };

    const noOfPages = Math.ceil(filteredData ? filteredData.length / itemsPerPage : 0);

    const tranformPropData = (data) => {
        return data
            ?.map(c => {
                return [
                    { key: 'Title', column: 'Proposal Name', value: c.proposal_name, show: true },
                    { key: 'Description', column: 'Description', value: c.description, show: true },
                    { key: 'Archived', column: 'Archived Name', value: c.is_archived ? 'Yes' : 'No', show: true },
                    { key: '_id', column: '_id', value: c._id, show: false },
                    { key: 'editUrlPath', column: 'Edit', value: 'proposal/editproposal', show: viewMode === 'module' ? false : true },
                    { key: 'viewUrlPath', column: 'View', value: 'proposal/viewproposal', show: viewMode === 'module' ? false : true },
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
                        All Proposals
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} container justifyContent="flex-end" spacing={2}>
                    <Grid item>

                        <Button
                            sx={{ backgroundColor: '#253C7C', borderRadius: '15px', color: 'white', margin: '0 1rem 1rem', alignItems: 'center', width: '20rem' }}
                            variant='contained'
                            size="large"
                            onClick={navigateToClientDetails}
                        >
                            + Create New Proposal
                        </Button>

                    </Grid>
                    <Grid item>
                        <Link href={'/proposal/archival'} >
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
                            sx={{
                                width: '70%'
                            }}
                        >
                            <SearchField
                                id={"searchProposal"}
                                options={proposalsData?.map((proposal) => proposal.proposal_name)}
                                value={searchTerm}
                                onInputChange={handleSearchChange}
                            />
                        </Box>
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
                            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                                <ListViewComponent data={propsData?.slice((page - 1) * itemsPerPage, page * itemsPerPage)} />
                            </Grid>
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

export default Proposal;
