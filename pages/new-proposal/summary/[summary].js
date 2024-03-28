import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession } from "next-auth/react";
import { CircularProgress, Container, Typography, Button, Paper, Stack, Box } from '@mui/material';

import EditSelectedDeliverable from '@/components/EditSelectedDeliverable';
import NewProposalStepper from '@/components/Stepper';
import ProposalTotal from '@/components/ProposalTotal';
import ProposalSummary from '@/components/ProposalSummary';
import SelectedDeliverables from '@/components/SelectedDeliverables';

const recurringMultipliers = {
  weekly: 4,
  monthly: 1,
  quarterly: 3 / 12,
  yearly: 1 / 12,
};

const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
const baseURL = process.env.VERCEL_URL ? `${protocol}://${process.env.VERCEL_URL}` : `${protocol}://localhost:3000`;
const proposalApiRoute = `${baseURL}/api/proposal`;

export async function getServerSideProps(context) {
  let proposalData = {};

  const { proposal_id } = context.params;
  console.log(proposal_id);

  try {
    const res = await fetch(`${proposalApiRoute}/${encodeURIComponent(proposal_id)}`, { cache: "no-store" });

    if (!res.ok) {
      throw new Error('Failed to fetch proposal');
    }
    proposalData = await res.json();

  } catch (error) {
    console.log('Error loading proposal', error);
  }

  return { props: { proposalData } };
}

const Summary = (proposalData) => {
  console.log(proposalData.proposal_title)
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(4);
  const [editingDeliverable, setEditingDeliverable] = useState(null);
  const [selectedDeliverables, setSelectedDeliverables] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalDate, setProposalDate] = useState(new Date());
  const [proposalMessage, setProposalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
    if (storedProposalMessage) setProposalMessage(storedProposalMessage);
    if (storedDeliverables) setSelectedDeliverables(storedDeliverables);
    if (storedProposalDate) setProposalDate(new Date(storedProposalDate));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleDeleteDeliverable = (index) => {
    setSelectedDeliverables((prevDeliverables) => prevDeliverables.filter((_, i) => i !== index));
  };

  const handleSaveForLater = async () => {
    setIsLoading(true);

    let { projectTotal, recurringTotal, proposalTotal } = selectedDeliverables.reduce((acc, item) => {
      const pricePerUnit = parseFloat(item.price?.$numberDecimal || item.price);
      const productCost = pricePerUnit * item.quantity;

      if (item.is_recurring) {
        const multiplier = recurringMultipliers[item.recurring_option] || 0;
        acc.recurringTotal += productCost * multiplier;
      } else {
        acc.projectTotal += productCost;
      }

      return acc;
    }, { projectTotal: 0, recurringTotal: 0, proposalTotal: 0 });

    proposalTotal = projectTotal + recurringTotal;

    const proposalData = {
      proposal_title: proposalTitle,
      message: proposalMessage,
      proposal_date: proposalDate,
      attachment: "",
      status: "Draft",
      suggestions: "",
      is_archived: false,
      proposal_total: proposalTotal,
      recurring_total: recurringTotal,
      project_total: projectTotal,
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
      const response = await fetch(`http://localhost:3000/api/proposal`, {
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
      setIsLoading(false);
      router.push('/proposal');

    } catch (error) {
      console.error("Failed to save proposal:", error);
      setIsLoading(false);
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

  return (<>
    {isLoading && (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )}

    {!isLoading && (
      <>
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
    )}
  </>
  );
};

export default Summary;
