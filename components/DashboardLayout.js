import { Box, Toolbar } from '@mui/material';
import NavBarComponent from "./NavBarComponent";
const drawerWidth = 240;

export default function DashboardLayout({ children }) {
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
  // return (
  //   <Box sx={{ display: 'flex' }}>
  //     <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  //       <Toolbar>
  //         <Typography variant="h6" noWrap component="div">
  //           Mayvis
  //         </Typography>
  //       </Toolbar>
  //     </AppBar>
  //     <Drawer
  //       variant="permanent"
  //       sx={{
  //         width: drawerWidth,
  //         flexShrink: 0,
  //         [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
  //       }}
  //     >
  //       <Toolbar />
  //       <Box sx={{ overflow: 'auto' }}>
  //           <List>
  //             {['Home', 'Proposals'].map((text, index) => (
  //               <ListItem button key={text}>
  //                 <ListItemIcon>
  //                   {index % 2 === 0 ? <HomeIcon /> : <InfoIcon />}
  //                 </ListItemIcon>
  //                 <ListItemText primary={text} />
  //               </ListItem>
  //             ))}
  //           </List>
  //         </Box>
  //     </Drawer>
  //     <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
  //       <Toolbar />
  //       {children}
  //     </Box>
  //   </Box>
  // ); 