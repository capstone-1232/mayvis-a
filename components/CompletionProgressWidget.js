import { Card, CardContent, CardActions, Typography, Button, Grid } from "@mui/material";
import Image from "next/image";
import React from "react";
import styles from "@/styles/CompletionProgressWidget.module.css";
import GraphImg from "@/public/assets/images/graph1.png";


const CompletionProgressWidget = ({ elev }) => {
    return (
        <Card elevation={elev}
            sx={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }} className={styles.cardHeight}>
            <CardContent>
                <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: "bold" }}>
                    Completion Progress
                </Typography>
                <Grid sx={{ margin: "100px", textAlign: "center" }}>
                    <Image src={GraphImg}></Image>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default CompletionProgressWidget;