import {
    Card, CardContent, Typography, Button, List, ListItem,
    Divider, ListItemText, ListItemAvatar, Avatar, Grid, CardActions
} from "@mui/material";
import ProposalIcon from '@mui/icons-material/Description';
import React from "react";
import Link from "next/link";

const RecentProposalWidget = ({ elev, proposalsData }) => {
    function stripHtml(html) {
        return html.replace(/<[^>]*>?/gm, '');
    }
    return (
        <Card elevation={elev} sx={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)', maxHeight:'100%', minHeight:'100%' }}>
            <CardContent>
                <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: "bold" }}>
                    Recent Proposals
                </Typography>
                <List sx={{ width: '100%' }}>
                    {proposalsData?.map((proposal, index) => (
                        <ListItem key={index} alignItems="flex-start" sx={{
                            py: 0.5,
                            '& .MuiListItemText-root': {
                                margin: 0,
                            }
                        }}>
                            <ListItemAvatar>
                                <ProposalIcon />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <React.Fragment>
                                        <Grid container>
                                            <Grid item xs>
                                                <Link href={`/proposal]/viewproposal/${proposal.proposal_id}`} className="link" >
                                                    <Typography variant="h6" component="h4" style={{ fontWeight: 'bold', color: 'black', textDecoration: 'underline', lineHeight: '1.25' }}>
                                                        {proposal.proposal_title}
                                                    </Typography>
                                                </Link>
                                            </Grid>
                                            <Grid
                                                item
                                                sx={{
                                                    fontSize: '0.875rem', // Smaller font size if needed
                                                    lineHeight: '1.25', // Adjust line height as needed
                                                }}
                                            >
                                                {new Date(proposal.createdAt).toISOString().split('T')[0]}
                                            </Grid>
                                        </Grid>
                                    </React.Fragment>
                                }
                                secondary={
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        <div style={{width: '35rem',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis', 
                                            whiteSpace: 'nowrap'}}>{stripHtml(proposal.message)}</div>
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                    {/* <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: 'green' }} />
                        </ListItemAvatar> */}
                    {/* <ListItemText
                            primary={
                                <React.Fragment>
                                    <Grid container>
                                        <Grid item xs>
                                            Proposal Name 1
                                        </Grid>
                                        <Grid item>
                                            Jan 22, 2024
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            }
                            secondary={
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Lorem Ipsum dolor sit amet, consectetur adipiscing elit,
                                </Typography>
                            }
                        /> */}


                    {/* <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: 'green' }} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <React.Fragment>
                                    <Grid container>
                                        <Grid item xs>
                                            Proposal Name 1
                                        </Grid>
                                        <Grid item>
                                            Jan 22, 2024
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            }
                            secondary={
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Lorem Ipsum dolor sit amet, consectetur adipiscing elit,
                                </Typography>
                            }
                        />

                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: 'green' }} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <React.Fragment>
                                    <Grid container>
                                        <Grid item xs>
                                            Proposal Name 1
                                        </Grid>
                                        <Grid item>
                                            Jan 22, 2024
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            }
                            secondary={
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Lorem Ipsum dolor sit amet, consectetur adipiscing elit,
                                </Typography>
                            }
                        />

                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: 'green' }} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <React.Fragment>
                                    <Grid container>
                                        <Grid item xs>
                                            Proposal Name 1
                                        </Grid>
                                        <Grid item>
                                            Jan 22, 2024
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            }
                            secondary={
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Lorem Ipsum dolor sit amet, consectetur adipiscing elit,
                                </Typography>
                            }
                        />

                    </ListItem> */}

                    <Divider variant="inset" component="li" />
                    {/* Repeat ListItem for each proposal */}
                </List>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                <Link href="/proposal" passHref>
                    <Button variant='contained' sx={{ backgroundColor: '#253C7C', borderRadius: '15px', color: 'white' }} size="large">
                        View All Proposals
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}

export default RecentProposalWidget;
