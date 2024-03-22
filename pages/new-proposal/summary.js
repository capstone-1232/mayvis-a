import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Button, Paper, Stack, Box } from '@mui/material';

import NewProposalStepper from '@/components/Stepper';
import SelectedDeliverables from '@/components/SelectedDeliverables';
import ProposalTotal from '@/components/ProposalTotal';
import ProposalSummary from '@/components/ProposalSummary';

const Summary = () => {
  const [activeStep, setActiveStep] = useState(4);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // To Do Logic to handle form data...
  };

  const handleNext = () => {
    // To Do Update the activeStep state here
  };

  const handleBack = () => {
    router.back();
  };

  return ( <>
    {/* <Box 
        sx={{
            position: 'fixed', 
            top: 75, 
            zIndex: 2, 
            backgroundColor: 'white', 
            maxWidth: '100%',
            width: '100%',
            paddingBottom: '20px'
        }}
    >
        <Typography 
            variant="h3" 
            align="left" 
            sx={{
                mt: 6.6,
                mb: 5,
            }}
        >
            New Proposal
        </Typography>
        <Box sx={{width: '87.1%'}}>
          <NewProposalStepper activeStep={activeStep} />
        </Box>
    </Box> */}
    <Typography variant="h3" align="left" sx={{ my: 5 }} gutterBottom>
        New Proposal
    </Typography>
    <NewProposalStepper activeStep={activeStep} />
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', gap: '25px', alignItems: 'start', mt: 1, justifyContent: 'center' }}>
        <Box sx={{ width: '30%' }}>
          <Paper
              elevation={5} 
              sx={{ p: 4, mt: 10, mb: 1, borderRadius: 2, width: '100%' }}
          >
            <SelectedDeliverables />
          </Paper>
          
          <Paper
              elevation={5} 
              sx={{ p: 4, mb: 5, borderRadius: 2, width: '100%' }}
          >
            <ProposalTotal />
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                py: 1.5,
                borderRadius: 2,
                width: '50%',
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
                width: '50%',
                bgcolor: '#2A987A',
                '&:hover': {
                  bgcolor: '#238b6a',
                  boxShadow: 'none'
                }
              }}
              // onClick={() => setModalOpen(true)}
            >
              Save For Later
            </Button>
          </Box>
        </Box>

        <Paper
            elevation={5} 
            sx={{ p: 4, mt: 10, mb: 5, borderRadius: 2, width: '60%', maxWidth: '60%' }}
        >
            <Box sx={{ flex: '60%' }}>
              <ProposalSummary />
            </Box>
        </Paper>
      </Box>
    </Container>
  </>
  );
};

export default Summary;
