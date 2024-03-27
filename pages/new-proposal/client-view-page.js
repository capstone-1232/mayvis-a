import React from 'react';
import { Container, Typography, TextField, Button, Paper, Stack, Box, Accordion, AccordionSummary, AccordionDetails,Radio, FormControlLabel } from '@mui/material';
import Avatar from '@mui/material/Avatar';

export default function Proposal() {
  return (
    <Box>
    <Box sx={{bgcolor:'black', padding: '5% 15%', maxHeight: 400 }}>
        <Typography variant="h1" fontWeight="bold" color="white" pb="5%">
            KEEN
        </Typography>
        <Typography variant="h5" fontWeight="bold"  color="white">
        Lets get together,
        </Typography>
        <Typography variant="h5" fontWeight="bold" color="white">
        do cool stuff,
        </Typography>        
        <Typography variant="h5" fontWeight="bold" color="white">
        & change the world.  
        </Typography>         
    </Box>
    <Box sx={{ padding: '5% 15%' }}>
        <Typography variant="h2" fontWeight="bold" color="#405CAA" pb="5%">
            Hi Nina
        </Typography>
        <Typography variant="p" color="black">
        Thank you for the opportunity to provide you with the following proposal, Our goal
        is to work and partner with you to create the subsequently outlined items,
        ultimately moving you closer to your goals.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent:'space-between', mt: 10}}>
          <Box>
            <Typography variant="h5" fontWeight="bold" color="black">
              Nicole Poulette
            </Typography>
            <Typography variant="body2" component="p">
              President
            </Typography>          
          </Box>            
          <Avatar src="" sx={{ width: 80, height: 80, mr: 2 }} />
        </Box>     
      </Box>
      <Box sx={{display:'flex', justifyContent:'space-between' ,bgcolor:'black', padding: '5% 15%', maxHeight: 400 }}>
        <Box>
        <Typography variant="h1" fontWeight="bold" color="white" pb="5%">
            KEEN
        </Typography>
        <Typography variant="h5" fontWeight="bold"  color="white">
        A Creative
        </Typography>
        <Typography variant="h5" fontWeight="bold" color="white">
        Company for
        </Typography>        
        <Typography variant="h5" fontWeight="bold" color="#6FE0FF">
        Inspired Brands 
        </Typography>
        </Box>
        
        <Box sx={{maxWidth:450, paddingTop:'12%', paddingLeft:'10%'}}><Typography variant="p" color="white">
        We have the talent, team, expertise, and road map to get you there. As a creative marketing partner, we help you explore the “What if’s,” tell your story, build your business and create impact.
        </Typography></Box>         
      </Box>
      
      <Box sx={{padding: '5% 15%',}}>
      <Typography variant="h4" fontWeight="bold" color="black" pb="5%">
      Proposed Items
      </Typography>
      <Accordion sx={{paddingBottom:1}}>
        <AccordionSummary sx={{bgcolor:'black'}}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
            <Typography variant="h6" fontWeight="bold" color="white">
              Brand & Messaging Development
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="white">
              $8,000
            </Typography>
            <Button variant="outlined" sx={{color: 'white', borderColor: 'white'}}>
              View & Approve
            </Button>
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{bgcolor:'white'}}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h6" fontWeight="bold">
              Logo Design
            </Typography>
            <Typography variant="p">
              $2,000
            </Typography>
          </Stack>
          <Typography variant="p">
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{paddingBottom:1}}>
        <AccordionSummary sx={{bgcolor:'black'}}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
            <Typography variant="h6" fontWeight="bold" color="white">
              Brand & Messaging Development
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="white">
              $8,000
            </Typography>
            <Button variant="outlined" sx={{color: 'white', borderColor: 'white'}}>
              View & Approve
            </Button>
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{bgcolor:'white'}}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h6" fontWeight="bold">
              Logo Design
            </Typography>
            <Typography variant="p">
              $2,000
            </Typography>
          </Stack>
          <Typography variant="p">
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{paddingBottom:1}}>
        <AccordionSummary sx={{bgcolor:'black'}}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
            <Typography variant="h6" fontWeight="bold" color="white">
              Brand & Messaging Development
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="white">
              $8,000
            </Typography>
            <Button variant="outlined" sx={{color: 'white', borderColor: 'white'}}>
              View & Approve
            </Button>
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{bgcolor:'white'}}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h6" fontWeight="bold">
              Logo Design
            </Typography>
            <Typography variant="p">
              $2,000
            </Typography>
          </Stack>
          <Typography variant="p">
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
    
    <Box sx={{ padding: '5% 15%', bgcolor: 'black', color: 'white', mt: 4 }}>
      <Typography variant="h3" fontWeight="bold" color="#6FE0FF" pb="5%">
        Ready to Get Started
      </Typography>
      <Typography variant="p">
        You need to accept at least one of the proposed items above in order to approve this proposal. Feel free to decline this proposal and let us know what requires improvement.
      </Typography>
      <Box>
        <FormControlLabel control={<Radio checked sx={{ color: 'white' }} />} label="Sign and Approve" />
        <FormControlLabel control={<Radio sx={{ color: 'white' }} />} label="I'm not ready, let's chat..." />
      </Box>
      <TextField
        multiline
        rows={4}
        placeholder="Tell us if you have comments about the proposal"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{ bgcolor: 'white', color: 'black' }}
      />
      <Button variant="outlined" sx={{bgcolor:'#253C7C',color: 'white'}}>
        Approve
      </Button>
    </Box>
    </Box>
  );
}
