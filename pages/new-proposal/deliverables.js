import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Button, Paper, Stack, Box } from '@mui/material';

import NewProposalStepper from '@/components/Stepper';
import SelectedDeliverables from '@/components/SelectedDeliverables';
import SelectDeliverables from '@/components/SelectDeliverables';

const Deliverables = () => {
  const [activeStep, setActiveStep] = useState(3);
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
    <Box 
        sx={{
            position: 'fixed', 
            top: 75, 
            zIndex: 2, 
            backgroundColor: 'white', 
            maxWidth: '80%', 
            width: '80%' 
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
        <NewProposalStepper activeStep={activeStep} />
    </Box>
    <Container maxWidth="md" position="relative">
      <Box sx={{ display: 'flex', gap: '25px', alignItems: 'start', marginTop: '200px' }}>
        <Paper
            elevation={5} 
            sx={{ p: 4, mt: 10, mb: 5, borderRadius: 2 }}
        >
            <Box sx={{ flex: '30%' }}>
                <SelectedDeliverables />
            </Box>
        </Paper>

        <Paper
            elevation={5} 
            sx={{ p: 4, mt: 10, mb: 5, borderRadius: 2 }}
        >
            <Box sx={{ flex: '70%' }}>
                <SelectDeliverables />
            </Box>
        </Paper>
      </Box>

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
  </>
  );
};

export default Deliverables;
