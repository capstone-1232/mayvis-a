import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Button, Paper, Stack, Box } from '@mui/material';

import EditSelectedDeliverable from '@/components/EditSelectedDeliverable';
import NewProposalStepper from '@/components/Stepper';
import ProposalTotal from '@/components/ProposalTotal';
import ProposalSummary from '@/components/ProposalSummary';
import SelectedDeliverables from '@/components/SelectedDeliverables';

const Summary = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(4);
  const [editingDeliverable, setEditingDeliverable] = useState(null);
  const [selectedDeliverables, setSelectedDeliverables] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalDate, setProposalDate] = useState('');
  const [proposalMessage, setProposalMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedDeliverables = JSON.parse(sessionStorage.getItem('selectedDeliverables'));
    const storedCompanyName = sessionStorage.getItem('companyName');
    const storedFirstName = sessionStorage.getItem('firstName');
    const storedLastName = sessionStorage.getItem('lastName');
    const storedEmail = sessionStorage.getItem('email');
    const storedProposalTitle = sessionStorage.getItem('proposalTitle');
    const storedProposalDate = sessionStorage.getItem('proposalDate');
    const storedProposalMessage = sessionStorage.getItem('proposalMessage');

    if (storedCompanyName) setCompanyName(storedCompanyName);
    if (storedFirstName) setFirstName(storedFirstName);
    if (storedLastName) setLastName(storedLastName);
    if (storedEmail) setLastName(storedEmail);
    if (storedProposalTitle) setProposalTitle(storedProposalTitle);
    if (storedProposalDate) setProposalDate(storedProposalDate);
    if (storedProposalMessage) setProposalMessage(storedProposalMessage);
    if (storedDeliverables) setSelectedDeliverables(storedDeliverables);
  }, []);

  const handleDeleteDeliverable = (index) => {
    setSelectedDeliverables((prevDeliverables) => prevDeliverables.filter((_, i) => i !== index));
  };

  const handleSaveForLater = async () => {
    const proposalData = {
      proposal_title: proposalTitle,
      message: proposalMessage,
      attachment: "", 
      status: "Draft",
      suggestions: "",
      is_archived: false,
      proposal_total: 7000,
      recurring_total: 1500,
      project_total: 5500,
      notes: "",
      updated_by: "65f47450c4a67fb9c0a02510",
      client_id: "65e968488c73936a5ad21508",
      products: selectedDeliverables.map(deliverable => ({
        product_id: deliverable._id,
        price: deliverable.price,
        quantity: deliverable.quantity,
        is_recurring: deliverable.is_recurring,
        recurring_option: deliverable.recurring_option,
        notes: deliverable.notes,
        category_id: deliverable.category_id,
      })),
      proposed_by: "65f47450c4a67fb9c0a02510",
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/proposal`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(proposalData),
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      sessionStorage.clear();
    } catch (error) {
        console.error("Failed to save proposal:", error);
    }
  };

  const handleEditDeliverable = (deliverable) => {
    setEditingDeliverable(deliverable);
    setIsEditing(true);
  };

  const handleSaveEditedDeliverable = (editedDeliverable) => {
    const updatedDeliverables = selectedDeliverables.map(deliverable =>
      deliverable._id === editedDeliverable._id ? editedDeliverable : deliverable
    );
    setSelectedDeliverables(updatedDeliverables);
    setEditingDeliverable(null);
    setIsEditing(false);
  };

  const handleBack = () => {
    router.back();
  };

  return ( <>
    <Typography variant="h3" align="left" sx={{ my: 5 }} gutterBottom>
        New Proposal
    </Typography>
    <NewProposalStepper activeStep={activeStep} />
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', gap: '25px', alignItems: 'start', mt: 1, justifyContent: 'center' }}>
        <Box sx={{ width: '30%' }}>
          <Paper
              elevation={5} 
              sx={{ p: 4, mt: 10, mb: 1, borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }}
          >
            <SelectedDeliverables 
              deliverables={selectedDeliverables}
              onDelete={handleDeleteDeliverable}
              onEdit={handleEditDeliverable}
              isEditing={isEditing}
            />
          </Paper>
          
          <Paper
              elevation={5} 
              sx={{ p: 4, mb: 5, borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }}
          >
            <ProposalTotal 
              deliverables={selectedDeliverables}
            />
          </Paper>

          {!isEditing && (
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
                onClick={handleSaveForLater}
              >
                Save For Later
              </Button>
            </Box>
          )}
        </Box>

        <Box sx={{ flex: 1 }}>
          <Paper
            elevation={5} 
            sx={{ p: 4, mt: 10, mb: 5, borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }}
          >
            {editingDeliverable ? (
              <EditSelectedDeliverable
                deliverable={editingDeliverable} 
                onSave={handleSaveEditedDeliverable}
                onCancel={() => {
                  setEditingDeliverable(null);
                  setIsEditing(false);
                }}
              />
            ) : (
              <ProposalSummary />
            )}
          </Paper>
        </Box>      
      </Box>
    </Container>
  </>
  );
};

export default Summary;
