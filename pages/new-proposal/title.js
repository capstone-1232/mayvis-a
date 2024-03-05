import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, TextField, Button, Paper, Stack, Box } from '@mui/material';

import NewProposalStepper from '@/components/Stepper';

const Title = () => {
  const [activeStep, setActiveStep] = useState(1);
  const router = useRouter();
  const paperStyle = { padding: 50, height: '50vh', width: '75%', margin: "50px auto", borderRadius: 20 };
  const btnStyle = { margin: '8px 0', borderRadius: 5, height: 40, width: 250 };

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

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" align="left" sx={{ mb: 5 }} gutterBottom>
        New Proposal
      </Typography>
      <NewProposalStepper activeStep={activeStep} />
      <Paper
        elevation={5} 
        sx={{ p: 4, mt: 10, mb: 5, borderRadius: 2 }}
      >
        <Typography variant='h5' gutterBottom>
          What is the project about?
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} sx={{ mb: 2 }}>
            <TextField
              label="Proposal Title"
              name="proposalTitle"
              value={clientDetails.companyName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Date"
              name="proposalDate"
              value={clientDetails.firstName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
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
          }}
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default Title;
