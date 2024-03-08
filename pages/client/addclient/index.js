import { Box, FormControlLabel, Grid, Paper, Switch, TextField, Button, Typography, Snackbar, Slide, Alert } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"

const NewClient = () => {
    const [clientName, setClientName] = useState('');
    const [active, setActive] = useState(true);
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState('');
    const router = useRouter();

    const handleError = (msg) => {
        setMsg(msg);
        setShowMsg(true);
    }

    const postData = async () => {
        try {
            if (!clientName || !description) {
                handleError('Client Name and Description are required!');
            }

            const res = await fetch('http://localhost:3000/api/client',
                {
                    method: 'POST',
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ 'client_name': clientName, 'is_active': active, description })
                });
            const data = await res.json();
            if (data.error) {
                handleError(data.error);
            }
            else
                router.push('/client');
        }
        catch (e) {
            throw e;
        }

        setIsLoading(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await postData();
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ flexGrow: 1, padding: 2 }}>
                <Paper elevation={12} sx={{ marginTop: 2, padding: 5 }}>
                    <Grid container spacing={5} alignItems="center">
                        <Grid item xs={12}>
                            <Typography variant="h4" component="div" gutterBottom>
                                Add New Client
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel control={<Switch checked={active} onChange={(e) => setActive(e.target.checked)} />} label="Active Client" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Client Name" fullWidth value={clientName} onChange={(e) => setClientName(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Description" fullWidth multiline
                                rows={15} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} container justifyContent="flex-end" spacing={2}>
                            <Grid item>
                                <Link href={'/client'} >
                                    <Button variant="contained">
                                        Cancel
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" type="submit" disabled={isLoading}>
                                    {isLoading ? 'Saving...' : 'Save'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={showMsg}
                onClose={() => setShowMsg(false)}
                key={'topright'}
                TransitionComponent={(props) => <Slide {...props} direction="up" />}>
                <Alert

                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {msg}
                </Alert>
            </Snackbar>
        </form>
    );
}

export default NewClient;