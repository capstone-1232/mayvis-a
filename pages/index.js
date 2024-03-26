import * as React from 'react';
import { useRouter } from 'next/router';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Paper, useMediaQuery, useTheme } from '@mui/material';
import ProposalWidget from '@/components/ProposalWidget';
import ClientWidget from '@/components/ClientWidget';
import ReportsWidget from '@/components/ReportsWidget';
import RecentProposalWidget from '@/components/RecentProposalWidget';
import { useSession } from "next-auth/react";

export async function getServerSideProps(context) {
    const { req } = context;
    // Determine the base URL based on the environment (Vercel or local)
    const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
    const baseURL = process.env.VERCEL_URL ? `${protocol}://${process.env.VERCEL_URL}` : `${protocol}://localhost:3000`;
    const apiRoute = `${baseURL}/api/proposal`;

    let proposalsData = [];
    try {
        const res = await fetch(`${apiRoute}?top=5`, { cache: "no-cache" });

        if (!res.ok) {
            const errorText = await res.text(); // or use `res.json()` if your API returns a JSON response
            throw new Error(`Failed to fetch proposal: ${errorText}`);
        }

        proposalsData = await res.json();
    } catch (error) {
        console.error('Error loading proposals', error);
        // Pass the error message to the page's props or handle it as needed
        return { props: { proposalsData, error: error.message } };
    }

    return { props: { proposalsData } };
}

export default function DashboardComponent({ proposalsData }) {
    const router = useRouter();
    const { data: session } = useSession();
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const navigateToClientDetails = () => {
        router.push('/new-proposal/client-details');
    };

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                    <Card elevation={12} sx={{ boxShadow: 3 }}>
                        <CardContent sx={{ textAlign: "center", padding: isXsScreen ? 6 : 8 }}>
                            <Typography gutterBottom variant={isXsScreen ? "h4" : "h3"} component="div" sx={{ fontWeight: "bold" }}>
                                Welcome back, {session ? session.user.name : "Guest"}
                            </Typography>
                            <Typography variant="h5">
                                Streamline your proposal process with our easy-to-use estimating tools
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center', paddingBottom: isXsScreen ? 3 : 5 }}>
                            <Button
                                sx={{ backgroundColor: '#253C7C', borderRadius: '15px', color: 'white', padding: '10px 30px' }}
                                variant='contained'
                                size="large"
                                onClick={navigateToClientDetails}
                            >
                                + Create New Proposal
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <ProposalWidget elevation={12} />
                        </Grid>
                        <Grid item xs={12}>
                            <ClientWidget elevation={12} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ReportsWidget elevation={12} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RecentProposalWidget elev={12} proposalsData={proposalsData} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
