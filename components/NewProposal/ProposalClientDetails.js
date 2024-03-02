import { useState, Fragment } from 'react';

import { Grid, Paper, TextField, Button, Typography, Link, Stack } from '@mui/material';
import NewProposalStepper from '@/components/Stepper';

export default function ProposalClientDetails() {
  const paperStyle = { padding: 50, height: '50vh', width: '75%', margin: "50px auto", borderRadius: 20 }
  const btnstyle = { margin: '8px 0', borderRadius:5, height: 40, width: 250 }

    return (
      <div>
        <Typography variant="h3" gutterBottom>
          New Proposal
        </Typography>
        <NewProposalStepper />
        <Paper elevation={5} style={paperStyle} square={false}>
        <Typography variant='h5'>Input your client's information</Typography>
          <Stack spacing={4}>
            <Stack>
              <Typography>Contact Person Firstname</Typography>
              <TextField placeholder='Enter Firstname'
                  variant="outlined" fullWidth required margin='dense' 
                  sx={{ borderRadius:5 }} />

              <Typography>Contact Person Lastname</Typography>
              <TextField placeholder='Enter Lastname'
                  variant="outlined" fullWidth required margin='dense' />

              <Typography>Client's Company Name</Typography>
              <TextField placeholder='Enter Comapany Name'
                  variant="outlined" fullWidth required margin='dense' />

              <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth size='small' sx={{ my: 2, mx: 'auto', display: 'block' }} >Save This Client</Button>
            </Stack>
          </Stack>
        </Paper>
      </div>
    );
  }