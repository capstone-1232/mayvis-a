import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";
import React from "react";
import styles from "@/styles/CompletionProgressWidget.module.css";

const CompletionProgressWidget = ({elev}) => {
    return (
        <Card elevation={elev} className={styles.cardHeight}>
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    Completion Progress
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CompletionProgressWidget;