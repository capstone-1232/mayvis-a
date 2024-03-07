import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";
import React from "react";

const ClientWidget = ({elev}) => {
    return (
        <Card elevation={elev}>
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    Clients
                </Typography>
            </CardContent>
            <CardActions className={"justifyContentCenter"}>
                <Button variant='contained' sx={{ backgroundColor: '#405CAA', color: 'white', margin: '0 1rem 1rem', alignItems: 'center', width: '15rem' }} size="large">
                    + Add New
                </Button>
            </CardActions>
        </Card>
    );
}

export default ClientWidget;