import { Container, Box, Typography, TextField, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import SearchBarWithButton from './SearchField';

const SelectDeliverables = () => {
  // The state and functions to handle the state would go here
  
  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Select Deliverables
        </Typography>
      </Box>
      <SearchBarWithButton/>
      <Box sx={{ my: 2 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Brand</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flexGrow: 1, p: 2, border: '1px solid grey', borderRadius: '4px' }}>
                <Typography variant="h6">Digital Ads Management</Typography>
                <Typography variant="body2">$1,500.00</Typography>
                <Typography variant="body2">Description of the deliverable.</Typography>
              </Box>
              <Box sx={{ flexGrow: 1, p: 2, border: '1px solid grey', borderRadius: '4px' }}>
                <Typography variant="h6">Digital Ads Management</Typography>
                <Typography variant="body2">$1,500.00</Typography>
                <Typography variant="body2">Description of the deliverable.</Typography>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Websites</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flexGrow: 1, p: 2, border: '1px solid grey', borderRadius: '4px' }}>
                <Typography variant="h6">Digital Ads Management</Typography>
                <Typography variant="body2">$1,500.00</Typography>
                <Typography variant="body2">Description of the deliverable.</Typography>
              </Box>
              <Box sx={{ flexGrow: 1, p: 2, border: '1px solid grey', borderRadius: '4px' }}>
                <Typography variant="h6">Digital Ads Management</Typography>
                <Typography variant="body2">$1,500.00</Typography>
                <Typography variant="body2">Description of the deliverable.</Typography>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Digital</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flexGrow: 1, p: 2, border: '1px solid grey', borderRadius: '4px' }}>
                <Typography variant="h6">Digital Ads Management</Typography>
                <Typography variant="body2">$1,500.00</Typography>
                <Typography variant="body2">Description of the deliverable.</Typography>
              </Box>
              <Box sx={{ flexGrow: 1, p: 2, border: '1px solid grey', borderRadius: '4px' }}>
                <Typography variant="h6">Digital Ads Management</Typography>
                <Typography variant="body2">$1,500.00</Typography>
                <Typography variant="body2">Description of the deliverable.</Typography>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Videography</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flexGrow: 1, p: 2, border: '1px solid grey', borderRadius: '4px' }}>
                <Typography variant="h6">Digital Ads Management</Typography>
                <Typography variant="body2">$1,500.00</Typography>
                <Typography variant="body2">Description of the deliverable.</Typography>
              </Box>
              <Box sx={{ flexGrow: 1, p: 2, border: '1px solid grey', borderRadius: '4px' }}>
                <Typography variant="h6">Digital Ads Management</Typography>
                <Typography variant="body2">$1,500.00</Typography>
                <Typography variant="body2">Description of the deliverable.</Typography>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Photography</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flexGrow: 1, p: 2, border: '1px solid grey', borderRadius: '4px' }}>
                <Typography variant="h6">Digital Ads Management</Typography>
                <Typography variant="body2">$1,500.00</Typography>
                <Typography variant="body2">Description of the deliverable.</Typography>
              </Box>
              <Box sx={{ flexGrow: 1, p: 2, border: '1px solid grey', borderRadius: '4px' }}>
                <Typography variant="h6">Digital Ads Management</Typography>
                <Typography variant="body2">$1,500.00</Typography>
                <Typography variant="body2">Description of the deliverable.</Typography>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

      </Box>
    </Container>
  );
};

export default SelectDeliverables;
