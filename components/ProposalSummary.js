import React from 'react';
import { Typography, Button, Box } from '@mui/material';

const ProposalSummary = () => {
//   if (!proposal) {
//       return <Typography>Proposal data is loading or not available.</Typography>;
//   }
//   const { title, status, dateCreated, clientName, clientContact, createdBy } = proposal;

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
          sx={{ 
              width: '75%', 
              mt: 2, 
              py: 1,
              borderRadius: 5,
          }}
        >
          Send to Client
        </Button>
      </Box >
    </Box>
  );
};

export default ProposalSummary;
