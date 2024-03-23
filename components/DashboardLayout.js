import { Box, Toolbar } from '@mui/material';
import NavBarComponent from "./NavBarComponent";
import { useSession, signIn } from "next-auth/react";

const drawerWidth = 240;

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    // Redirect to sign-in page
    signIn();
    return <p>Redirecting to sign-in...</p>;
  }

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
