import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Typography, Button, Box } from '@mui/material';
import CustomModal from '@/components/CustomModal';

const ProposalSummary = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [urlModalOpen, setUrlModalOpen] = useState(false);
  const router = useRouter();
//   if (!proposal) {
//       return <Typography>Proposal data is loading or not available.</Typography>;
//   }
//   const { title, status, dateCreated, clientName, clientContact, createdBy } = proposal;

  const handleClose = () => {
    setModalOpen(false);
  }

  const handleProceed = () => {
    router.push('/new-proposal/access-for-approval');
  }

  const handleUrlLink = () => {
    // router.push('/new-proposal/access-for-approval');
    setModalOpen(false);
    setUrlModalOpen(true);
  }
  
  return (
    <Box sx={{}}>
      <Typography variant="h5" component="h3" align="center" sx={{ marginBottom: 3 }}>
        Proposal Summary
      </Typography>

      <Typography variant="h6" align="center" gutterBottom>
        Website Redesign
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10%', alignItems: 'center'}}>
          <Typography variant="body1" sx={{ textAlign: 'start' }}>Status:</Typography>
          <Typography>In Progress</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10%', alignItems: 'center' }}>
          <Typography variant="body1">Date Created:</Typography>
          <Typography>March 10, 2024</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10%', alignItems: 'center' }}>
          <Typography variant="body1">Client Name:</Typography>
          <Typography>James Davis</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10%', alignItems: 'center' }}>
          <Typography variant="body1">Client Contact:</Typography>
          <Typography>jamesd@gmail.com</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10%', alignItems: 'center' }}>
          <Typography variant="body1">Created By:</Typography>
          <Typography>Nicole Samuels</Typography>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Button 
          variant="contained"
          onClick={() => setModalOpen(true)}
          sx={{ 
              width: '75%', 
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
