import * as React from 'react';
import { useRouter } from 'next/router';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import ProposalWidget from '@/components/ProposalWidget'
import ClientWidget from '@/components/ClientWidget'
import CompletionProgressWidget from '@/components/CompletionProgressWidget';
import RecentProposalWidget from '@/components/RecentProposalWidget';
import styles from '@/styles/dashboard.module.css'

import { useSession } from "next-auth/react"



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));


export default function DashboardComponent() {
    const router = useRouter();
    const elevationValue = 12;

    const { data: session } = useSession();

    const navigateToClientDetails = () => {
        router.push('/new-proposal/client-details');
    };

    return (
        <React.Fragment>
            <Grid container spacing={5}>
                <Grid item xs={12} md={8}>
                    <Item>
                        <Card elevation={elevationValue}
                            sx={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }}
                            className={styles.cardHeight}>
                            <CardContent sx={{ textAlign: "center", marginTop: "60px" }}>
                                <Typography gutterBottom variant="h3" component="div" sx={{ fontWeight: "bold" }}>
                                    Welcome back, {session ? session.user.name : ""}
                                </Typography>
                                <Typography variant="h5" color="text.secondary">
                                    Streamline your proposal process with our easy-to-use estimating tools
                                </Typography>
                            </CardContent>
                            <CardActions className={"justifyContentCenter"}>
                                <Button
                                    sx={{ backgroundColor: '#253C7C', borderRadius: '15px', color: 'white', margin: '0 1rem 1rem', alignItems: 'center', width: '20rem' }}
                                    variant='contained'
                                    size="large"
                                    onClick={navigateToClientDetails}
                                >
                                    + Create New Proposal
                                </Button>
                            </CardActions>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card className={styles.cardHeight} elevation={elevationValue}  sx={{boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Item>
                                    <ProposalWidget elev={elevationValue} />
                                </Item>
                            </Grid>
                            <Grid item xs={12}>
                                <Item>
                                    <ClientWidget elev={elevationValue} />
                                </Item>
                            </Grid>

                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CompletionProgressWidget elev={elevationValue} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RecentProposalWidget elev={elevationValue} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
