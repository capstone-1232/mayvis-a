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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" component="h3" align="center" sx={{ marginBottom: 3 }}>
        Proposal Summary
      </Typography>

      <Typography variant="h6" gutterBottom>
        Website Redesign
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 3 }}>
        <Typography variant="body1"><b>Status:</b> In Progress</Typography>
        <Typography variant="body1"><b>Date Created:</b> March 10, 2024</Typography>
        <Typography variant="body1"><b>Client Name:</b> James Davis</Typography>
        <Typography variant="body1"><b>Client Contact:</b> jamesd@gmail.com</Typography>
        <Typography variant="body1"><b>Created By:</b> Nicole Samuels</Typography>
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
