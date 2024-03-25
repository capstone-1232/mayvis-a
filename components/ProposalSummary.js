import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Typography, Button, Box, Stack } from '@mui/material';
import CustomModal from '@/components/CustomModal';

const ProposalSummary = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [urlModalOpen, setUrlModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalDate, setProposalDate] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedCompanyName = sessionStorage.getItem('companyName');
    const storedFirstName = sessionStorage.getItem('firstName');
    const storedLastName = sessionStorage.getItem('lastName');
    const storedEmail = sessionStorage.getItem('email');
    const storedProposalTitle = sessionStorage.getItem('proposalTitle');
    const storedProposalDate = sessionStorage.getItem('proposalDate');

    if (storedCompanyName) setCompanyName(storedCompanyName);
    if (storedFirstName) setFirstName(storedFirstName);
    if (storedLastName) setLastName(storedLastName);
    if (storedEmail) setEmail(storedEmail);
    if (storedProposalTitle) setProposalTitle(storedProposalTitle);
    if (storedProposalDate) {
      const date = new Date(storedProposalDate);
      const formattedDate = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(date);
  
      setProposalDate(formattedDate);
    }
  }, []);

  const handleClose = () => {
    setModalOpen(false);
  }

  const handleProceed = () => {
    router.push('/new-proposal/access-for-approval');
  }

  const handleUrlLink = () => {
    setModalOpen(false);
    setUrlModalOpen(true);
  }
  
  return (
    <Box sx={{}}>
      <Typography variant="h5" component="h3" align="center" sx={{ marginBottom: 5 }}>
        Proposal Summary
      </Typography>

      <Typography variant="h6" align="center" gutterBottom>
        {proposalTitle}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10%', alignItems: 'center', py: 5}}>
        <Box>
          <Stack spacing={1}>
            <Typography variant="body1" sx={{fontWeight: '600'}}>Status:</Typography>
            <Typography variant="body1" sx={{fontWeight: '600'}}>Date Created:</Typography>
            <Typography variant="body1" sx={{fontWeight: '600'}}>Client Name:</Typography>
            <Typography variant="body1" sx={{fontWeight: '600'}}>Client Contact:</Typography>
            <Typography variant="body1" sx={{fontWeight: '600'}}>Created By:</Typography>
          </Stack>
        </Box>
        <Box>
          <Stack spacing={1}>
            <Typography>In Progress</Typography>
            <Typography>{proposalDate}</Typography>
            <Typography>{firstName} {lastName}</Typography>
            <Typography>{email}</Typography>
            <Typography>Nicole Samuels</Typography>
          </Stack>
        </Box>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Button 
          variant="contained"
          onClick={() => setModalOpen(true)}
          sx={{ 
              width: '50%', 
              mt: 2, 
              py: 1,
              borderRadius: 5,
          }}
        >
          Send to Client
        </Button>
        <CustomModal
          // icon={<ProposalIcon style={{ fontSize: '4rem' }} />}
          title="Sending Options"
          message={
            <>
              Choose Your Preferred Document Delivery:
              <br />
              Print the PDF file or Convenient Online Link to be send directly to Your Inbox?
            </>
          }
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          buttons={[
            {
              label: "PDF Copy",
              color: "primary",
              onClick: () => setModalOpen(false)
            },
            {
              label: "URL Link",
              color: "primary",
              onClick: handleUrlLink
            },
          ]}
          linkText={'Go Back'}
        />
        <CustomModal
          message={
            <>
              By selecting this option, you agree to generate a link.
              <br />
              <br />
              Once the link is generated, you will no longer be able to edit this proposal.
            </>
          }
          open={urlModalOpen}
          onClose={() => setUrlModalOpen(false)}
          buttons={[
            {
              label: "Cancel",
              color: "primary",
              onClick: () => setUrlModalOpen(false),
            },
            {
              label: "Proceed",
              sx: { bgcolor: "#2A987A", '&:hover': { bgcolor: '#238b6a' } },
              onClick: handleProceed,
            },
          ]}
        />
      </Box >
    </Box>
  );
};

export default ProposalSummary;
