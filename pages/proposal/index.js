import {
    Autocomplete, Box, Button, Card, Grid, Paper,
    TextField, Typography, Stack, Pagination
} from "@mui/material";
import React, { useState } from 'react';
import Link from 'next/link';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import proposalData from "@/public/data/proposalData.json";

const itemsPerPage = 8;

const Proposal = () => {
    const [page, setPage] = useState(1);
    const [filteredData, setFilteredData] = useState(proposalData);
    const [searchTerm, setSearchTerm] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSearchChange = (event, newValue) => {
        setSearchTerm(newValue);
        const lowercasedValue = newValue.toLowerCase();
        const filtered = proposalData.filter(item =>
            item.name.toLowerCase().includes(lowercasedValue)
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
                        Proposal
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} container justifyContent="flex-end" spacing={2}>
                    <Grid item>
                        <Link href="/new-proposal/client-details" passHref>
                            <Button variant="contained" component="a" sx={{backgroundColor: '#405CAA'}}>
                                Create New Proposal +
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" startIcon={<FilterAltIcon />} sx={{backgroundColor: '#405CAA'}}>
                            Archival
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Paper elevation={12} sx={{ marginTop: 2, padding: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8} md={6}>
                        <Autocomplete
                            id="searchProposal"
                            freeSolo
                            options={proposalData.map((proposal) => proposal.name)}
                            value={searchTerm}
                            onInputChange={handleSearchChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search Proposal"
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
                        .map((p, index) => (
                            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                <Card elevation={12} sx={{ padding: 2 }}>
                                    <Stack spacing={1}>
                                        <Typography variant="h5" component="div" gutterBottom sx={{fontWeight:"bold"}}>
                                            {p.name}
                                        </Typography>
                                        <Typography variant="body1">
                                            Proposed by {p.proposeBy}
                                        </Typography>
                                        <Typography variant="body1">
                                            Date: {p.proposeDate}
                                        </Typography>
                                        <Typography variant="body1">
                                            Status: {p.status}
                                        </Typography>
                                        <Typography variant="body2" sx={{minHeight:"180px"}}>
                                            {p.Description}
                                        </Typography>
                                    </Stack>
                                    <Stack alignItems="center">
                                        <Button variant="contained"  sx={{backgroundColor: '#405CAA', width:'30%', marginBottom:"10px"}}>
                                            View
                                        </Button>
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

export default Proposal;
