import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepIcon from '@mui/material/StepIcon';

const steps = [
  'Client Details',
  'Title',
  'Message',
  'Deliverables',
  'Summary',
];

export default function NewProposalStepper() {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={0} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                sx: {
                  color: '#3AC6ED',
                  '&.MuiStepIcon-active': {
                    color: '#2A987A',
                  },
                  '&.MuiStepIcon-completed': {
                    color: '#3AC6ED',
                  },
                },
              }}
              sx={{
                '& .MuiStepLabel-label': {
                  color: '#000000',
                  '&.Mui-active': {
                    color: '#000000',
                  },
                  '&.Mui-completed': {
                    color: '#000000',
                  },
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}