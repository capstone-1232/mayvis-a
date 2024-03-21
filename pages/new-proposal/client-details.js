import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Autocomplete, Container, Typography, TextField, Button, Paper, Stack, Box } from '@mui/material';

import NewProposalStepper from '@/components/Stepper';

const ClientDetails = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [clientsData, setClientsData] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [contactsData, setContactsData] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const router = useRouter();

  const cleanContactId = (contactId) => {
    return contactId.replace(/^['"]+|['"]+$/g, '');
  };

  const getContactDetails = async (contactId) => {
    const cleanId = cleanContactId(contactId);
    const response = await fetch(`/api/contact/${cleanId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch contact details');
    }
    return response.json();
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/client');
        const data = await response.json();
        setClientsData(data);
        
        if (data && data.length > 0) {
          const defaultClient = data[0];
          setSelectedClient(defaultClient);
          fetchContactsForClient(defaultClient);
        }
      } catch (error) {
        console.error('Failed to fetch clients:', error);
      }
    };
  
    fetchClients();
  }, []);
  
  const fetchContactsForClient = async (client) => {
    if (!client || !client.contact_id) return;
    
    try {
      const contactIds = client.contact_id;
      let contacts = [];
      if (Array.isArray(contactIds)) {
        contacts = await Promise.all(contactIds.map(contactId => getContactDetails(contactId)));
      } else {
        const contactDetails = await getContactDetails(contactIds);
        contacts = [contactDetails];
      }
      setContactsData(contacts);
    } catch (error) {
      console.error('Failed to fetch contacts for client:', error);
      setContactsData([]);
    }
  };

  const handleClientChange = (_, value) => {
    setSelectedClient(value);
  };

  const handleContactChange = (setter) => (_, value) => {
    setter(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // To Do Logic to handle form data...
  };

  const handleNext = () => {
    router.push('/new-proposal/title');
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
                  options={clientsData}
                  getOptionLabel={(option) => option.client_name}
                  onChange={(event, newValue) => {
                    setSelectedClient(newValue);
                    fetchContactsForClient(newValue); // Fetch contacts when a new client is selected
                  }}
                  renderInput={(params) => (
                      <TextField
                          {...params}
                          label="Client Company Name"
                          name="companyName"
                          variant="outlined"
                          // value={filteredClients.client_name}
                          fullWidth
                          required
                          sx={{
                            bgcolor: 'grey.100'
                          }}
                      />
                  )}
              />
              {selectedClient && (
                <>
                  <Autocomplete
                      id="searchContactFirstname"
                      freeSolo
                      options={contactsData}
                      getOptionLabel={(option) => option.contact_firstname || ''}
                      onChange={(event, newValue) => {
                        setSelectedClient(newValue);
                        fetchContactsForClient(newValue);
                      }}
                      value={selectedContact}
                      renderInput={(params) => (
                          <TextField
                              {...params}
                              label="Contact Firstname"
                              name="contactFirstname"
                              variant="outlined"
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
                      options={contactsData}
                      getOptionLabel={(option) => option.contact_lastname || ''}
                      onChange={(event, newValue) => {
                        setSelectedClient(newValue);
                        fetchContactsForClient(newValue);
                      }}
                      value={selectedContact}
                      renderInput={(params) => (
                          <TextField
                              {...params}
                              label="Contact Lastname"
                              name="contactLastname"
                              variant="outlined"
                              fullWidth
                              required
                              sx={{
                                bgcolor: 'grey.100'
                              }}
                          />
                      )}
                  />
                </>
              )}
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
