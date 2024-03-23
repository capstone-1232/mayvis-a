import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Button, Paper, Stack, Box } from '@mui/material';

import NewProposalStepper from '@/components/Stepper';
import RTextEditor from '@/components/RTextEditor';

const Message = () => {
  const [activeStep, setActiveStep] = useState(2);
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
    router.push('/new-proposal/deliverables');
  };

  const handleBack = () => {
    router.back();
  };

  return (<>
      <Typography variant="h3" align="left" sx={{ my: 5 }} gutterBottom>
        New Proposal
      </Typography>
      <NewProposalStepper activeStep={activeStep} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper
          elevation={5} 
          sx={{ p: 4, mt: 10, mb: 5, borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }}
        >
          <Typography variant='h5' gutterBottom>
            Write a Message
          </Typography>
          <Typography variant='p' gutterBottom>
            This message will appear on the client proposal. Feel free to customize.
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{height:'35vh', paddingBottom: '20px' }}>
              <RTextEditor />
            </Box>
          </form>
        </Paper>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            variant="contained"
            sx={{
              py: 1.5,
              borderRadius: 2,
              width: '15%',
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
              width: '15%',
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

export default Message;
