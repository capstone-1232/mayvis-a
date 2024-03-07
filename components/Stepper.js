import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import { StepConnector, styled } from '@mui/material/';

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: '#3AC6ED',
  zIndex: 1,
  color: '#fff',
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: '#2A987A',
  }),
  ...(ownerState.completed && {
    backgroundColor: '#2A987A',
  }),
}));

const StyledStepConnector = styled(StepConnector)(({ theme }) => ({
  '& .MuiStepConnector-line': {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

function ColorlibStepIcon(props) {
  const { active, completed, icon } = props;

  const ownerState = { active, completed };

  return (
    <ColorlibStepIconRoot ownerState={{ active, completed }}>
      {completed ? <Check /> : icon}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Client Details', 'Title', 'Message', 'Deliverables', 'Summary'];

const NewProposalStepper = ({ activeStep }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper alternativeLabel connector={<StyledStepConnector />} activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default NewProposalStepper;
