import { useState } from 'react';
import { Switch, FormGroup, FormControlLabel, Typography } from '@mui/material';

export default function CustomToggleButton({label}) {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            color="default"
            sx={{
              height: '46px',
              width: '70px',
              '& .MuiSwitch-switchBase': {
                top: 'calc(50% - 19px)',
                transform: 'translateX(5px)',
                '&.Mui-checked': {
                  transform: 'translateX(27px)',
                  color: '#2A987A',
                },
                '& + .MuiSwitch-track': {
                  backgroundColor: 'black',
                  opacity: 1,
                },
              },
              '& .MuiSwitch-thumb': {
                width: '20px',
                height: '20px',
                boxSizing: 'border-box',
              },
              '& .MuiSwitch-track': {
                backgroundColor: 'black',
                opacity: 0.38,
                borderRadius: '20px',
                height: '22px',
                boxSizing: 'border-box',
              },
            }}
          />
        }
        label={
          <Typography variant="subtitle1">
            {label}
          </Typography>
        }
        labelPlacement="end"
        sx={{ marginLeft: 0 }}
      />
    </FormGroup>
  );
}
