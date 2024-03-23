import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, TextField, Button, Paper, Stack, Box } from '@mui/material';

import NewProposalStepper from '@/components/Stepper';

const ClientDetails = () => {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();

  const [clientDetails, setClientDetails] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
  });

  const handleChange = (e) => {
    setClientDetails({
      ...clientDetails,
      [e.target.name]: e.target.value,
    });
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
          sx={{ p: 4, mt: 10, mb: 5, borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }}
        >
          <Typography variant='h5' sx={{ mb: 5 }} gutterBottom>
            Input your client's information
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={5} sx={{ mb: 5 }}>
              <TextField
                label="Client Company Name"
                name="companyName"
                value={clientDetails.companyName}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  bgcolor: 'grey.100'
                }}
                fullWidth
                required
              />
              <TextField
                label="Contact Person First Name"
                name="firstName"
                value={clientDetails.firstName}
                onChange={handleChange}
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
                value={clientDetails.lastName}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  bgcolor: 'grey.100'
                }}
                fullWidth
                required
              />
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
