import { Box, Toolbar } from '@mui/material';
import NavBarComponent from "./NavBarComponent";
const drawerWidth = 240;

export default function Dashboardlayout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavBarComponent />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: 'calc(100% - ${drawerWidth}px)' },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
  