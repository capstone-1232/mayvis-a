import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Autocomplete, Container, Typography, TextField, Button, Paper, Stack, Box } from '@mui/material';

import NewProposalStepper from '@/components/Stepper';

const ClientDetails = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [clientsData, setClientsData] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [allContacts, setAllContacts] = useState([]);
  const [filteredFirstnames, setFilteredFirstnames] = useState([]);
  const [filteredLastnames, setFilteredLastnames] = useState([]);
  const [filteredEmail, setFilteredEmail] = useState([]);
  const [selectedFirstname, setSelectedFirstname] = useState(null);
  const [selectedLastname, setSelectedLastname] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showSaveClientButton, setShowSaveClientButton] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedCompanyName = sessionStorage.getItem('companyName');
    const storedFirstName = sessionStorage.getItem('firstName');
    const storedLastName = sessionStorage.getItem('lastName');
    const storedEmail = sessionStorage.getItem('email');
  
    if (storedCompanyName) setCompanyName(storedCompanyName);
    if (storedFirstName) setFirstName(storedFirstName);
    if (storedLastName) setLastName(storedLastName);
    if (storedEmail) setEmail(storedEmail);
  }, []);

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
      const contactsPromises = client.contact_id.map(id => fetch(`/api/contact/${id}`).then(res => res.json()));
      const contacts = await Promise.all(contactsPromises);
      
      setAllContacts(contacts);
      setFilteredFirstnames(contacts);
      setFilteredLastnames(contacts);
      setFilteredEmail(contacts);
    } catch (error) {
      console.error('Failed to fetch contacts for client:', error);
    }
  };

  const handleClientChange = (event, newValue) => {
    if (typeof newValue === 'object' && newValue !== null) {
      const companyName = newValue.client_name;
      setCompanyName(companyName);
      setSelectedClient(newValue);
  
      const clientExists = clientsData.some(client => client._id === newValue._id);
  
      if (clientExists) {
        fetchContactsForClient(newValue);
        setShowSaveClientButton(false);
      } else {
        setShowSaveClientButton(true);
      }
    } else if (typeof newValue === 'string') {
      setCompanyName(newValue);
      setShowSaveClientButton(true);
    }
  };

  const handleFirstnameChange = (event, firstname) => {
    setSelectedFirstname(firstname);
    if (firstname) {
      const relevantContacts = allContacts.filter(contact => contact.contact_firstname === firstname);
      setFilteredFirstnames(relevantContacts);
    } else {
      setFilteredFirstnames(allContacts);
    }
  };

  const handleLastnameChange = (event, lastname) => {
    setSelectedLastname(lastname);
    if (lastname) {
      const relevantContacts = allContacts.filter(contact => contact.contact_lastname === lastname);
      setFilteredLastnames(relevantContacts);
    } else {
      setFilteredLastnames(allContacts);
    }
  };

  const handleEmailChange = (event, email) => {
    setSelectedEmail(email);
    if (email) {
      const relevantContacts = allContacts.filter(contact => contact.email === email);
      setFilteredEmail(relevantContacts);
    } else {
      setFilteredEmail(allContacts);
    }
  };

  const handleInputFirstnameChange = (e) => {
    const newValue = e.target.value;
    setFirstName(newValue);
  };

  const handleInputLastnameChange = (e) => {
    const newValue = e.target.value;
    setLastName(newValue);
  };

  const handleInputEmailChange = (e) => {
    const newValue = e.target.value;
    setEmail(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // To Do Logic to handle form data...
  };

  const saveClient = () => {
    // Logic to save the new client to the database
    console.log("Saving client:", selectedClient);
  };

  const handleNext = () => {
    sessionStorage.setItem('companyName', companyName);
    sessionStorage.setItem('firstName', firstName);
    sessionStorage.setItem('lastName', lastName);
    sessionStorage.setItem('email', email);
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
          sx={{ p: 4, mt: 10, mb: 5, borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }}
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
                  getOptionLabel={(option) => option.client_name || ''}
                  onChange={handleClientChange}
                  onInputChange={(event, newInputValue) => {
                    setCompanyName(newInputValue);
                  }}
                  inputValue={companyName}
                  renderInput={(params) => (
                      <TextField
                          {...params}
                          label="Client Company Name"
                          name="companyName"
                          variant="outlined"
                          fullWidth
                          required
                          sx={{
                            bgcolor: 'grey.100'
                          }}
                      />
                  )}
              />
              {selectedClient && allContacts.length > 0 ? (
                <>
                  <Autocomplete
                      id="searchContactFirstname"
                      freeSolo
                      options={filteredFirstnames.map(contact => contact.contact_firstname)}
                      onChange={handleFirstnameChange}
                      value={selectedFirstname}
                      renderInput={(params) => (
                          <TextField
                              {...params}
                              label="Contact Firstname"
                              name="contactFirstname"
                              variant="outlined"
                              onChange={handleFirstnameChange}
                              value={firstName}
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
                      options={filteredLastnames.map(contact => contact.contact_lastname)}
                      onChange={handleLastnameChange}
                      value={selectedLastname}
                      renderInput={(params) => (
                          <TextField
                              {...params}
                              label="Contact Lastname"
                              name="contactLastname"
                              variant="outlined"
                              onChange={handleLastnameChange}
                              value={lastName}
                              fullWidth
                              required
                              sx={{
                                bgcolor: 'grey.100'
                              }}
                          />
                      )}
                  />
                  <Autocomplete
                      id="searchContactEmail"
                      freeSolo
                      options={filteredEmail.map(contact => contact.email)}
                      onChange={handleEmailChange}
                      value={selectedEmail}
                      renderInput={(params) => (
                          <TextField
                              {...params}
                              label="Contact Email"
                              name="contactEmail"
                              variant="outlined"
                              onChange={handleEmailChange}
                              value={email}
                              fullWidth
                              required
                              sx={{
                                bgcolor: 'grey.100'
                              }}
                          />
                      )}
                  />
                </>
                ) : (
                  <>
                    <TextField
                      label="Contact Person First Name"
                      name="firstName"
                      variant="outlined"
                      fullWidth
                      required
                      value={firstName}
                      onChange={handleInputFirstnameChange}
                      sx={{ bgcolor: 'grey.100', mt: 2 }}
                    />
                    <TextField
                      label="Contact Person Last Name"
                      name="lastName"
                      variant="outlined"
                      fullWidth
                      required
                      value={lastName}
                      onChange={handleInputLastnameChange}
                      sx={{ bgcolor: 'grey.100', mt: 2 }}
                    />
                    <TextField
                      label="Contact Person Email"
                      name="email"
                      variant="outlined"
                      fullWidth
                      required
                      value={email}
                      onChange={handleInputEmailChange}
                      sx={{ bgcolor: 'grey.100', mt: 2 }}
                    />
                  </>
              )}
            </Stack>
            {showSaveClientButton && (
              <Button
                type='submit'
                color='primary'
                variant="contained"
                onClick={saveClient}
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
            )}
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
