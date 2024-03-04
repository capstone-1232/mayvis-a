import {
    Card, CardContent, CardActions, Typography, Button, List, ListItem,
    Divider, ListItemText, ListItemAvatar, Avatar, Grid
} from "@mui/material";
import React from "react";
import styles from '@/styles/RecentProposalWidget.module.css';

const RecentProposalWidget = ({ elev }) => {
    return (
        <Card elevation={elev} className={styles.cardHeight}>
            <CardContent className={styles.cardContentHeight}>
                <Typography gutterBottom variant="h4" component="div">
                    Recent Proposal
                </Typography>
                <div className={`${styles.justifyContentCenter} ${styles.content}`}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: 'green' }}>{" "}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <React.Fragment>
                                        <Grid container>
                                            <Grid item xs>
                                                {"Proposal Name 1"}
                                            </Grid>
                                            <Grid item xs={5}>
                                                {"Jan 22, 2024"}
                                            </Grid>
                                        </Grid>    
                                    </React.Fragment>
                                }
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {"Lorem Ipsum dolor sit amet, consectetur adipiscing elit,"}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar sx={{ backgroundColor: 'orange' }}>{" "}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <React.Fragment>
                                        <Grid container>
                                            <Grid item xs>
                                                {"Proposal Name 2"}
                                            </Grid>
                                            <Grid item xs={5}>
                                                {"Jan 22, 2024"}
                                            </Grid>
                                        </Grid>    
                                    </React.Fragment>
                                }
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {"Lorem Ipsum dolor sit amet, consectetur adipiscing elit,"}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: 'red' }}>{" "}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <React.Fragment>
                                        <Grid container>
                                            <Grid item xs>
                                                {"Proposal Name 3"}
                                            </Grid>
                                            <Grid item xs={5}>
                                                {"Jan 22, 2024"}
                                            </Grid>
                                        </Grid>    
                                    </React.Fragment>
                                }
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {"Lorem Ipsum dolor sit amet, consectetur adipiscing elit,"}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </List>
                </div>
            </CardContent>
            <CardActions className={"justifyContentCenter"}>
                <Button variant='contained' sx={{ backgroundColor: '#405CAA', color: 'white', margin: '0 1rem 1rem', alignItems: 'center', width: '15rem' }} size="large">
                    View All Proposals
                </Button>
            </CardActions>
        </Card>
    );
}

export default RecentProposalWidget;