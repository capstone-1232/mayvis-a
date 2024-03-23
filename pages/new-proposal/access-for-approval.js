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

  const handleDeactivateLink = (e) => {
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
      <Container sx={{ mt: 1 }} maxWidth={'100vh'}>
        <Paper
          elevation={5} 
          sx={{ p: 4, mt: 5, mb: 5, borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }}
        >
          <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }} gutterBottom>
            Link for the Proposal
          </Typography>
          <form onSubmit={handleDeactivateLink}>
            <Stack spacing={2} sx={{ mb: 1 }}>
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
              <Typography variant='h6' sx={{ mb: 5, fontWeight: 'bold', textAlign: 'center' }} gutterBottom>
                *** Deactivating this link will prevent the approver from viewing the proposal ***
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  sx={{
                    py: 1.5,
                    px: 10,
                    borderRadius: 5,
                    bgcolor: '#253C7C',
                  }}
                  onClick={handleDeactivateLink}
                >
                  Deactivate Link
                </Button>
              </Box>
            </Stack>
          </form>
        </Paper>
        <Paper
          elevation={5} 
          sx={{ p: 4, mt: 5, mb: 5, borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }}
        >
          <Box sx={{ display: 'flex', gap: '5%' }}>
            <Box width={'55%'}>
              <Typography variant='h5' sx={{ mb: 5, fontWeight: 'bold' }} gutterBottom>
                Access for Approval
              </Typography>
              <form>
                <Stack spacing={2} sx={{ mb: 1 }}>
                  <TextField
                    name="contactEmail"
                    value={clientDetails.email}
                    label='Email'
                    onChange={handleChange}
                    variant="outlined"
                    sx={{
                      bgcolor: 'grey.100',
                    }}
                    required
                  />
                  <TextField
                    name="contactName"
                    value={clientDetails.firstName}
                    label='First Name'
                    onChange={handleChange}
                    variant="outlined"
                    sx={{
                      bgcolor: 'grey.100',
                    }}
                    required
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      sx={{
                        py: 1.5,
                        px: 8,
                        borderRadius: 3,
                        bgcolor: '#253C7C',
                      }}
                    >
                      Add To List
                    </Button>
                  </Box>
                </Stack>
              </form>
            </Box>
            <Box 
              width={'40%'} 
              bgcolor={'#D9D9D9'}
              sx={{
                borderRadius: '20px'
              }}
            >
              <Typography variant='h6' sx={{ my: 3, fontWeight: 'bold', textAlign: 'center' }} gutterBottom>
                Clients List for Access
              </Typography>
            </Box>

        </Box>
        </Paper>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              sx={{
                py: 1.5,
                borderRadius: 3,
                bgcolor: '#253C7C',
                width: '15%',
                marginRight: '40px'
              }}
              onClick={handleBack}
            >
              Client View
            </Button>
            <Button
              variant="contained"
              sx={{
                py: 1.5,
                borderRadius: 3,
                bgcolor: '#253C7C',
                width: '15%',
              }}
              onClick={handleBack}
            >
              Email For Approval
            </Button>
        </Box>
      </Container>
  </>
  );
};

export default AccessForApproval;
