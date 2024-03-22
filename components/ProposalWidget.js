import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const ProposalWidget = ({elev}) => {
    return (
        <Card elevation={elev}>
            <CardContent>
                <Typography gutterBottom variant="h4" component="div" sx={{fontWeight:"bold"}}>
                    Proposals
                </Typography>
            </CardContent>
            <CardActions className={"justifyContentCenter"}>
                <Link href={"/proposal"}>
                <Button variant='contained' sx={{ backgroundColor: '#253C7C', color: 'white', margin: '0 1rem 1rem', alignItems: 'center', width: '15rem' }} size="large">
                    View All
                </Button>
                </Link>
            </CardActions>
        </Card>
    );
}

export default ProposalWidget;