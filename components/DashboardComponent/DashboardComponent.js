import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function DashboardComponent() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          Welcome back, Nina
        </Typography>
        <Typography variant="body2" color="text.secondary">
             Streamline your proposal process with our easy-to-use estimating tools
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{ backgroundColor: '#405CAA', color: 'white', margin: '1rem', alignItems: 'center' }} size="small">Create Proposal</Button>
      </CardActions>
    </Card>
  );
}
