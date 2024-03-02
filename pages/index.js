import { Box, Toolbar } from '@mui/material';

import NavBarComponent from '../components/NavBarComponent/NavBarComponent.js';
import ProposalClientDetails from '../components/NewProposal/ProposalClientDetails.js';

const drawerWidth = 240;

export default function Home() {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavBarComponent />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <ProposalClientDetails />
      </Box>
    </Box>
  );
}
