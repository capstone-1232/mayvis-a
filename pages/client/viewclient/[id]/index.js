import { Box, Grid, Paper, TextField, Button, Typography, Stack, Pagination, Autocomplete, Card, Tooltip, IconButton } from "@mui/material";
import Link from "next/link";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import React, { useState } from "react"
import { useRouter } from "next/router";
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import CircleIcon from '@mui/icons-material/Circle';

export async function getServerSideProps({ params }) {
  let clientData = [{}];
  try {
    const id = params.id;
    const res = await fetch(`http://localhost:3000/api/client/${id}`, { cache: "no-store" });
    // res.setHeader(
    //   'Cache-Control',
    //   'public, s-maxage=10, stale-while-revalidate=59'
    // )

    if (!res.ok) {
      throw new Error('Failed to fetch client');
    }
    clientData = await res.json();
  }
  catch (error) {
    console.log('Error loading clients', error);
  }
  return { props: { clientData } };
}

const ViewClient = ({ clientData }) => {
  const [page, setPage] = useState(1);
  const [filteredData, setFilteredData] = useState(clientData[0].contact_info);
  const [searchTerm, setSearchTerm] = useState('');
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (event, newValueLabel, newValueKey) => {
    setSearchTerm(newValueLabel || null);
    const lowercasedValue = newValueLabel?.toLowerCase();
    const filtered = clientData[0]?.contact_info;
    if (!lowercasedValue) {
      setFilteredData(filtered)
    }
    else {
      setFilteredData(filtered?.filter(item => item._id == newValueKey));
      setPage(1);
    }
  };
  const itemsPerPage = 8;
  const noOfPages = Math.ceil(filteredData ? filteredData.length / itemsPerPage : 1);

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="div" gutterBottom>
            {clientData[0].client_name}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Link href={`/client/editclient/${clientData[0]._id}`} className="link">
              <Button variant="contained" sx={{ minWidth: '150px' }}>
                Edit
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Paper elevation={12} sx={{ marginTop: 2, padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={6}>
            <Autocomplete
              id="searchContact"
              freeSolo
              options={clientData[0]?.contact_info?.map((contact) => (
                { label: contact.contact_firstname + ' ' + contact.contact_lastname, key: contact._id }
              ))}
              value={searchTerm || null}
              onChange={(e, value) => handleSearchChange(e, value?.label, value?.key)}
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
            <Link href={`/contacts/addcontact/${clientData[0]._id}`} className="link">
              <Button variant="contained" fullWidth>
                Add New Contact
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: 15 }}>
          <Grid item xs={12} sm={4} md={2}>
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Typography gutterBottom fontSize={30} component="div" sx={{ fontWeight: "bold" }}>
              Contact Person
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Typography gutterBottom fontSize={30} component="div" sx={{ fontWeight: "bold" }}>
              Department
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Typography gutterBottom fontSize={30} component="div" sx={{ fontWeight: "bold" }}>
              Role
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Typography gutterBottom fontSize={30} component="div" sx={{ fontWeight: "bold" }}>
              Active
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Typography gutterBottom fontSize={30} component="div" sx={{ fontWeight: "bold" }}>
              Edit
            </Typography>
          </Grid>
          {filteredData && filteredData.length > 0 ? filteredData
            ?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
            ?.map((c, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={4} md={2} sx={{ textAlign: "center" }}>
                  {c.is_primary ? <PersonIcon color="primary" fontSize="large"></PersonIcon> : ''}
                </Grid>
                <Grid item xs={12} sm={4} md={2}>
                  <Typography gutterBottom component="div" fontSize={25}>
                    {`${c.contact_firstname} ${c.contact_lastname}`}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={2}>
                  <Typography gutterBottom component="div" fontSize={25}>
                    {c.contact_department}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={2}>
                  <Typography gutterBottom component="div" fontSize={25}>
                    {c.contact_role}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={2}>
                  <CircleIcon fontSize="large" color={c.is_active ? "success" : "disabled"}>{" "}</CircleIcon>
                </Grid>
                <Grid item xs={12} sm={4} md={2}>
                  <Link href={`/contacts/editcontact/${c._id}`}>
                    <Tooltip title="Edit" placement="right-start">
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

export default ViewClient;