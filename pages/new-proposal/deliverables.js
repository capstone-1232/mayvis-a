import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Button, Paper, Stack, Box } from '@mui/material';

import NewProposalStepper from '@/components/Stepper';
import SelectedDeliverables from '@/components/SelectedDeliverables';
import SelectDeliverables from '@/components/SelectDeliverables';
import ProposalTotal from '@/components/ProposalTotal';

const Deliverables = () => {
  const [activeStep, setActiveStep] = useState(3);
  const [selectedDeliverables, setSelectedDeliverables] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedDeliverables = JSON.parse(sessionStorage.getItem('selectedDeliverables'));
    
    if (storedDeliverables) {
      setSelectedDeliverables(storedDeliverables);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // To Do Logic to handle form data...
  };

  const handleNext = () => {
    sessionStorage.setItem('selectedDeliverables', JSON.stringify(selectedDeliverables));
    router.push('/new-proposal/summary');
  };

  const handleBack = () => {
    router.back();
  };

  const handleAddDeliverable = (deliverable) => {
    setSelectedDeliverables((prevDeliverables) => [...prevDeliverables, deliverable]);
  };

  const handleDeleteDeliverable = (index) => {
    setSelectedDeliverables((prevDeliverables) => prevDeliverables.filter((_, i) => i !== index));
  };

  return ( <>
    <Typography variant="h3" align="left" sx={{ my: 5 }} gutterBottom>
        New Proposal
    </Typography>
    <NewProposalStepper activeStep={activeStep} />
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', gap: '25px', alignItems: 'start', mt: 1, justifyContent: 'center' }}>
        <Box sx={{width: '30%'}}>
          <Paper
              elevation={5} 
              sx={{ p: 4, mt: 10, mb: 1, borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }}
          >
            <SelectedDeliverables 
              deliverables={selectedDeliverables} 
              onDelete={handleDeleteDeliverable} 
            />
          </Paper>
          
          <Paper
              elevation={5} 
              sx={{ p: 4, mb: 5, borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }}
          >
            <ProposalTotal />
          </Paper>
        </Box>

        <Paper
            elevation={5} 
            sx={{ p: 4, mt: 10, mb: 5, borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }}
        >
            <Box sx={{ flex: '60%' }}>
              <SelectDeliverables onAddDeliverable={handleAddDeliverable} />
            </Box>
        </Paper>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, width: '96%' }}>
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

export default Deliverables;
