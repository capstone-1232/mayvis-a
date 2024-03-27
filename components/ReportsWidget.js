import { Card, CardContent, Typography, Grid } from "@mui/material";
import Image from "next/image";
import React from "react";
import GraphImg from "@/public/assets/images/graph1.png";
import PieGraph from "@/public/assets/images/pieChart.jpg";


const ReportsWidget = ({ elev }) => {
    return (
        <Card elevation={elev} sx={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }}>
            <CardContent>
                <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: "bold" }}>
                    Reports and Progress
                </Typography>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={8} lg={6}>
                        <Image src={GraphImg} alt="Completion Progress Graph" layout="responsive" />
                    </Grid>
                    <Grid item xs={12} md={8} lg={6}>
                        <Image src={PieGraph} alt="Completion Progress Graph" layout="responsive" />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default ReportsWidget;
