import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const ClientWidget = ({ elev }) => {
    return (
        <Card elevation={elev}>
            <CardContent>
                <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: "bold" }}>
                    Clients
                </Typography>
            </CardContent>
            <CardActions className={"justifyContentCenter"}>
                <Link href={"/client/addclient"}>
                    <Button variant='contained' sx={{ backgroundColor: '#253C7C', color: 'white', margin: '0 1rem 1rem', alignItems: 'center', width: '15rem' }} size="large">
                        + Add New
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}

export default ClientWidget;