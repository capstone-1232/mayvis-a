import React from 'react';
import { Container, Typography, TextField, Button, Paper, Stack, Box, Accordion, AccordionSummary, AccordionDetails,Radio, FormControlLabel } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import RTextEditor from '@/components/RTextEditor';

export default function Profile() {
    const paperStyle = {
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
      };
    return(
    <Box
      sx={{
        mx: 'auto', 
        mt: 'auto', 
      }}
    >
        <h1 style={{ textAlign: 'left', margin: '1.5rem 0', }}>My Profile</h1>
        <Paper style={paperStyle}
            sx={{
              maxWidth: '50%',
              mx: 'auto',
              mt: 'auto',
            }}>
                <Box sx={{display:'flex',justifyContent:'center'}}>
                <Avatar src="" sx={{ width: 150, height: 150}} />
                </Box>
                <Box sx={{display:'flex',justifyContent:'center'}}>
                <Typography variant="p" color="black">Change Picture</Typography></Box>

                <Typography variant="h6" fontWeight="bold" color="black">First Name</Typography>
                <TextField
                required
                id="outlined-required"
                defaultValue="Shengpeng"
                fullWidth
                margin="normal"
                />

                <Typography variant="h6" fontWeight="bold" color="black">Last Name</Typography>
                <TextField
                required
                id="outlined-required"
                defaultValue="Wang"
                fullWidth
                margin="normal"
                />

                <Typography variant="h6" fontWeight="bold" color="black">Email</Typography>
                <TextField
                required
                id="outlined-required"
                defaultValue="swang55@nait.ca"
                fullWidth
                margin="normal"
                />

                <Typography variant="h6" fontWeight="bold" color="black">Password</Typography>
                <TextField
                id="outlined-password-input"
                type="password"
                autoComplete="current-password"
                fullWidth
                margin="normal"
                />

                <Typography variant="h6" fontWeight="bold" color="black">Confirm Password</Typography>
                <TextField
                id="outlined-password-input"
                type="password"
                autoComplete="current-password"
                fullWidth
                margin="normal"
                />
                
<Box sx={{display:'flex',justifyContent:'center'}}>      <Button variant="outlined" sx={{bgcolor:'#253C7C',color: 'white'}}>
        Approve
      </Button></Box>
        </Paper>
    </Box>
    );
}