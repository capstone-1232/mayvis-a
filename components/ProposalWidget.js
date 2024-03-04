import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";
import React from "react";

const ProposalWidget = ({elev}) => {
    return (
        <Card elevation={elev}>
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    My Proposal
                </Typography>
            </CardContent>
            <CardActions className={"justifyContentCenter"}>
                <Button variant='contained' sx={{ backgroundColor: '#405CAA', color: 'white', margin: '0 1rem 1rem', alignItems: 'center', width: '15rem' }} size="large">
                    View All
                </Button>
            </CardActions>
        </Card>
    );
}

export default ProposalWidget;