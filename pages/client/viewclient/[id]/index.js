import { Box, Grid, Paper, TextField, Button, Typography, Stack, Pagination, Autocomplete, Card, Tooltip, IconButton } from "@mui/material";
import Link from "next/link";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router";
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import CircleIcon from '@mui/icons-material/Circle';
import SearchField from "@/components/SearchField";
import ListViewComponent from "@/components/ListViewComponent";

const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
const baseURL = process.env.VERCEL_URL ? `${protocol}://${process.env.VERCEL_URL}` : `${protocol}://localhost:3000`;
const apiRoute = `${baseURL}/api/client`;

export async function getServerSideProps({ params }) {
  let clientData = [{}];
  try {
    const id = params.id;
    const res = await fetch(`${apiRoute}/${id}`, { cache: "no-store" });
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
  const [propsData, setPropsData] = useState();

  useEffect(() => {
    setPropsData(tranformPropData(clientData[0].contact_info));
    console.log(propsData);
  }, []);

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
    setPropsData(tranformPropData(filtered));
  };

  const tranformPropData = (data) => {
    console.log(data);
    return data
      ?.map(c => {
        return [
          { key: 'primary', column: '', value: c.is_primary ? <PersonIcon color="primary" fontSize="large"></PersonIcon> : '', show: true },
          { key: 'Contact Person', column: 'Contact Person', value: `${c.contact_firstname} ${c.contact_lastname}`, show: true },
          { key: 'Department', column: 'Department', value: c.contact_department, show: true },
          { key: 'Role', column: 'Role', value: c.contact_role, show: true },
          { key: 'Active', column: 'Active', value: c.is_active ? 'Yes' : 'No', show: true },
          { key: '_id', column: '_id', value: c._id, show: false },
          { key: 'editUrlPath', column: 'Edit', value: 'contacts/editcontact', show: true },
        ];
      });
  }

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
      <Paper elevation={12} sx={{ marginTop: 2, padding: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7} md={6}>
            <Box
              sx={{
                width: '70%'
              }}
            >
              <SearchField
                id={"searchCategory"}
                options={clientData[0]?.contact_info?.map((contact) => (
                  { label: contact.contact_firstname + ' ' + contact.contact_lastname, key: contact._id }
                ))}
                value={searchTerm}
                onInputChange={handleSearchChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={1} md={3} container justifyContent="flex-start">
            {/* <Button variant="outlined" startIcon={<FilterAltIcon />}>
              Filter
            </Button> */}
          </Grid>
          <Grid item xs={12} sm={4} md={3} container justifyContent="flex-start">
            <Link href={`/contacts/addcontact/${clientData[0]._id}`} className="link">
              <Button variant="contained" fullWidth>
                Add New Contact
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {propsData ?
            <ListViewComponent data={propsData?.slice((page - 1) * itemsPerPage, page * itemsPerPage)} />
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

export default ViewClient;