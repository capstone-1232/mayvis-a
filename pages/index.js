import * as React from 'react';
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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

export default function DashboardComponent() {
    const elevationValue = 12;

    return (
        <React.Fragment>
            <Grid container spacing={5}>
                <Grid item xs={12} md={8}>
                    <Item>
                        <Card elevation={elevationValue} className={styles.cardHeight}>
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div">
                                    Welcome back, Nina
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Streamline your proposal process with our easy-to-use estimating tools
                                </Typography>
                            </CardContent>
                            <CardActions className={"justifyContentCenter"}>
                                <Button sx={{ backgroundColor: '#405CAA', color: 'white', margin: '0 1rem 1rem', alignItems: 'center', width: '20rem' }} variant='contained' size="large">
                                    + Create New Proposal
                                </Button>
                            </CardActions>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card className={styles.cardHeight} elevation={elevationValue}>
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
