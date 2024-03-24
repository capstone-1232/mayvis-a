import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, TextField, Button, Paper, Stack, Box } from '@mui/material';

import SelectDate from '@/components/SelectDate';
import NewProposalStepper from '@/components/Stepper';

const Title = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalDate, setProposalDate] = useState('');

  useEffect(() => {
    const storedProposalTitle = sessionStorage.getItem('proposalTitle');
    const storedProposalDate = sessionStorage.getItem('proposalDate');
  
    if (storedProposalTitle) setProposalTitle(storedProposalTitle);
    if (storedProposalDate) setProposalDate(storedProposalDate);
  }, []);

  const handleProposalTitleChange = (e) => {
    const newValue = e.target.value;
    setProposalTitle(newValue);
  };

  const handleProposalDateChange = (newValue) => {
    setProposalDate(newValue);
    sessionStorage.setItem('proposalDate', newValue || '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // To Do Logic to handle form data...
  };

  const handleNext = () => {
    sessionStorage.setItem('proposalTitle', proposalTitle);
    sessionStorage.setItem('proposalDate', proposalDate);
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
          sx={{ p: 4, mt: 10, mb: 5, borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }}
        >
          <Typography variant='h5' sx={{ mb: 5 }} gutterBottom>
            What is the project about?
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={5} sx={{ mb: 2 }}>
              <TextField
                label="Proposal Title"
                name="proposalTitle"
                value={proposalTitle}
                onChange={handleProposalTitleChange}
                variant="outlined"
                sx={{
                  bgcolor: 'grey.100'
                }}
                fullWidth
                required
              />
              <SelectDate
                value={proposalDate}
                onChange={handleProposalDateChange}
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
