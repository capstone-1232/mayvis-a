import DashboardLayout from '../components/DashboardLayout';
import Image from "next/image";
import Head from 'next/head';
import LoginSignup from "./login"
// import Container from '@mui/material/Container';
import NavBarComponent from "@/components/NavBarComponent/NavBarComponent";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import DashboardComponent from '@/components/DashboardComponent/DashboardComponent';
import { Box, Toolbar } from '@mui/material';
const drawerWidth = 240;

export default function Home() {
  return (
    // <GoogleOAuthProvider>
    // {/* <LoginSignup /> */}

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
      <DashboardComponent />
    </Box>
  </Box>

    // </GoogleOAuthProvider>
  );
}
