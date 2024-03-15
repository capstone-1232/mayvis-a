import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, TextField, Button, Paper, Stack, Box } from '@mui/material';

import SelectDate from '@/components/SelectDate';
import NewProposalStepper from '@/components/Stepper';

const Title = () => {
  const [activeStep, setActiveStep] = useState(1);
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
    router.push('/new-proposal/message');
  };

  const handleBack = () => {
    router.back();
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
            What is the project about?
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={5} sx={{ mb: 2 }}>
              <TextField
                label="Proposal Title"
                name="proposalTitle"
                value={clientDetails.companyName}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  bgcolor: 'grey.100'
                }}
                fullWidth
                required
              />
              <SelectDate />
            </Stack>
          </form>
        </Paper>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            variant="contained"
            sx={{
              py: 1.5,
              borderRadius: 2,
              width: '20%',
            }}
            onClick={handleBack}
          >
            Back
          </Button>

          <Button
            variant="contained"
            sx={{
              py: 1.5,
              ml: 3,
              borderRadius: 2,
              width: '20%',
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

export default Title;
