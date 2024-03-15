import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, TextField, Button, Paper, Stack, Box } from '@mui/material';

const AccessForApproval = () => {
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
    router.push('/new-proposal/message');
  };

  const handleBack = () => {
    router.back();
  };

  return ( <>
      <Typography variant="h3" align="left" sx={{ mt: 5 }} gutterBottom>
        Proposal Title
      </Typography>
      <Container sx={{ mt: 1 }} maxWidth={false}>
        <Paper
          elevation={5} 
          sx={{ p: 4, mt: 5, mb: 5, borderRadius: 2 }}
        >
          <Typography variant='h5' sx={{ mb: 5, fontWeight: 'bold' }} gutterBottom>
            Link for the Proposal
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={5} sx={{ mb: 2 }}>
              <TextField
                name="proposalTitle"
                value={clientDetails.companyName}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  bgcolor: 'grey.100',
                }}
                required
              />
            </Stack>
          </form>
          <Typography variant='h6' sx={{ mb: 5, fontWeight: 'bold', textAlign: 'center' }} gutterBottom>
            *** Deactivating this link will prevent the approver from viewing the proposal ***
          </Typography>
        </Paper>
      </Container>
  </>
  );
};

export default AccessForApproval;
