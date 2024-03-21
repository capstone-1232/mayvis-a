import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Autocomplete, Container, Typography, TextField, Button, Paper, Stack, Box } from '@mui/material';

import NewProposalStepper from '@/components/Stepper';

const ClientDetails = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [clientsData, setClientsData] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [contactsData, setContactsData] = useState([]);
  const [clientSearchTerm, setClientSearchTerm] = useState('');
  const [contactSearchTerm, setContactSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    setFilteredClients(clientsData);
  }, [clientsData]);

  useEffect(() => {
    const fetchClients = async () => {
      const response = await fetch('/api/client');
      const data = await response.json();
      setClientsData(data);
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      if (selectedClient && Array.isArray(selectedClient.contact_id)) {
        const response = await fetch(`/api/contact/${filteredClients._id}`);
        const data = await response.json();
        console.log(data);
        setContactsData(data);
      } else {
        setContactsData([]);
      }
    };

    fetchContacts();
  }, [contactsData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // To Do Logic to handle form data...
  };

  const handleNext = () => {
    router.push('/new-proposal/title');
  };

  const companySearchChange = (event, newValue) => {
    setClientSearchTerm(newValue);
    const lowercasedValue = newValue.toLowerCase();
    const filtered = filteredClients.filter(item =>
        item.client_name.toLowerCase().includes(lowercasedValue)
    );
    setFilteredClients(filtered);
  };

  const contactSearchChange = (event, newValue) => {
    setContactSearchTerm(newValue);
    const lowercasedValue = newValue.toLowerCase();
    const filtered = contactsData.filter(item =>
        item.contact_firstname.toLowerCase().includes(lowercasedValue)
    );
    setContactsData(filtered);
  };

  return ( <>
      <Typography variant="h3" align="left" sx={{ my: 5 }} gutterBottom>
        New Proposal
      </Typography>
      <NewProposalStepper activeStep={activeStep} />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper
          elevation={5} 
          sx={{ p: 4, mt: 10, mb: 5, borderRadius: 2 }}
        >
          <Typography variant='h5' sx={{ mb: 5 }} gutterBottom>
            Input your client's information
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={5} sx={{ mb: 5 }}>
              <Autocomplete
                  id="searchClient"
                  freeSolo
                  options={clientsData.map((client) => client.client_name)}
                  value={clientSearchTerm}
                  onInputChange={companySearchChange}
                  renderInput={(params) => (
                      <TextField
                          {...params}
                          label="Client Company Name"
                          name="companyName"
                          variant="outlined"
                          value={filteredClients.client_name}
                          fullWidth
                          required
                          sx={{
                            bgcolor: 'grey.100'
                          }}
                      />
                  )}
              />
              <Autocomplete
                  id="searchContactFirstname"
                  freeSolo
                  options={contactsData.map((contact) => contact.contact_firstname)}
                  value={contactSearchTerm}
                  onInputChange={contactSearchChange}
                  renderInput={(params) => (
                      <TextField
                          {...params}
                          label="Contact Firstname"
                          name="contactFirstname"
                          variant="outlined"
                          value={contactsData.contact_firstname}
                          fullWidth
                          required
                          sx={{
                            bgcolor: 'grey.100'
                          }}
                      />
                  )}
              />
              <Autocomplete
                  id="searchContactLastname"
                  freeSolo
                  options={contactsData.map((contact) => contact.contact_lastname)}
                  value={contactSearchTerm}
                  onInputChange={contactSearchChange}
                  renderInput={(params) => (
                      <TextField
                          {...params}
                          label="Contact Lastname"
                          name="contactLastname"
                          variant="outlined"
                          value={contactsData.contact_lastname}
                          fullWidth
                          required
                          sx={{
                            bgcolor: 'grey.100'
                          }}
                      />
                  )}
              />
              {/* <TextField
                label="Contact Person First Name"
                name="firstName"
                value={contactsData.firstName}
                onChange={handleSearchChange}
                variant="outlined"
                sx={{
                  bgcolor: 'grey.100'
                }}
                fullWidth
                required
              />
              <TextField
                label="Contact Person Last Name"
                name="lastName"
                value={contactsData.lastName}
                onChange={handleSearchChange}
                variant="outlined"
                sx={{
                  bgcolor: 'grey.100'
                }}
                fullWidth
                required
              /> */}
            </Stack>
            <Button
              type='submit'
              color='primary'
              variant="contained"
              sx={{
                py: 1,
                borderRadius: 10,
                width: '25%',
                mx: 'auto',
                display: 'block'
              }}
            >
              Save This Client
            </Button>
          </form>
        </Paper>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            variant="contained"
            sx={{
              py: 1.5,
              borderRadius: 2,
              width: '25%',
              bgcolor: '#2A987A',
              '&:hover': {
                bgcolor: '#238b6a',
                boxShadow: 'none'
              }
            }}
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
      </Container>
  </>
  );
};

export default ClientDetails;
