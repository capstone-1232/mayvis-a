import { Box, FormControlLabel, Grid, Paper, Switch, TextField, Button, Typography, Snackbar, Slide, Alert } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react"

const ClientAddEditFormComponent = ({ client }) => {
    const [clientName, setClientName] = useState(client.clientName);
    const [active, setActive] = useState(client.active);
    const [description, setDescription] = useState(client.description);
    const [isLoading, setIsLoading] = useState(client.isLoading)
    const [showMsg, setShowMsg] = useState(client.showMsg);
    const [msg, setMsg] = useState(client.msg);
    const [severity, setSeverity] = useState('error')
    const router = useRouter();

    const handleMsg = (msg) => {
        setMsg(msg);
        setShowMsg(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (!clientName || !description) {
                setSeverity('error');
                handleMsg('Client Name and Description are required!');
                return;
            }

            const data = await client.processClient({
                clientName: clientName,
                active: active,
                description: description,
            })

            if (data.error) {
                setSeverity('error');
                handleMsg(data.error);
            }
            else {
                setTimeout(() => {
                    setSeverity('success');
                    handleMsg('Client has been saved');
                    setTimeout(() => {
                        setIsLoading(false);
                        router.push('/client');
                    }, 1500);
                }, 500);
            }

        }
        catch (e) {
            throw e;
        }
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
                            <TextField label="Client Name" fullWidth value={clientName} onChange={(e) => setClientName(e.target.value)} required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Description" fullWidth multiline
                                rows={15} value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </Grid>
                        <Grid item xs={12} container justifyContent="flex-end" spacing={2}>
                            <Grid item>
                                <Link href={'/client'} >
                                    <Button variant="contained" sx={{backgroundColor: '#253C7C'}}>
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

                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {msg}
                </Alert>
            </Snackbar>
        </form>
    );
}

export default ClientAddEditFormComponent;