import { Box, FormControlLabel, Grid, Paper, Switch, TextField, Button, Typography, Snackbar, Slide, Alert } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react"

const ContactAddEditFormComponent = ({ contactData }) => {
    const [FName, setFName] = useState(contactData.FName);
    const [LName, setLName] = useState(contactData.LName);
    const [active, setActive] = useState(contactData.active);
    const [primary, setPrimary] = useState(contactData.primary);
    const [department, setDepartment] = useState(contactData.department);
    const [email, setEmail] = useState(contactData.email);
    const [contactNo, setContactNo] = useState(contactData.contactNo);
    const [role, setRole] = useState(contactData.role);
    const [isLoading, setIsLoading] = useState(false)
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState('');
    const [severity, setSeverity] = useState('error')
    const contactId = contactData.id 
    const clientId = contactData.clientId;
    const contacts = contactData.contacts;
    const router = useRouter();
    const handleMsg = (msg) => {
        setMsg(msg);
        setShowMsg(true);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!FName || !LName || !email || !contactNo) {
                setSeverity('error');
                handleMsg('Required: First Name, Last Name, Email and Contact Number!');
                return;
            }
            
            //We need to check if primary has already been assigned.
            if ((contacts?.filter(c => c.is_primary == true && c._id != contactId).length > 0) && primary) {
                setSeverity('error');
                handleMsg('Primary contact has already been assigned to this client.');
                return;
            }

            setIsLoading(true);
            //save contact
            const dataInserted = await contactData.processContact({
                FName: FName,
                LName: LName,
                active: active,
                primary: primary,
                department: department,
                role: role,
                email: email,
                contactNo: contactNo,
                clientId: clientId
            });
            
            if (dataInserted.error) {
                setSeverity('error');
                handleMsg(data.error);
            }
            else {
                setTimeout(() => {
                    setSeverity('success');
                    handleMsg('Contact(s) has been saved');
                    setTimeout(() => {
                        setIsLoading(false);
                        setFName('');
                        setLName('');
                        setActive(true);
                        setPrimary(false);
                        setDepartment('');
                        setContactNo('');
                        setEmail('');
                        setRole('');
                        router.push(`/client/viewclient/${clientId}`)
                    }, 1000);
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
                                Contact Details
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <FormControlLabel control={<Switch checked={active} onChange={(e) => setActive(e.target.checked)} />} label="Active" />
                        </Grid>
                        <Grid item xs={11}>
                            <FormControlLabel control={<Switch checked={primary} onChange={(e) => setPrimary(e.target.checked)} />} label="Primary" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="First Name" fullWidth value={FName} onChange={(e) => setFName(e.target.value)} required />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Last Name" fullWidth value={LName} onChange={(e) => setLName(e.target.value)} required />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Email Address" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Contact Number" fullWidth value={contactNo} onChange={(e) => setContactNo(e.target.value)} required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Department" fullWidth value={department} onChange={(e) => setDepartment(e.target.value)} required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Role" fullWidth value={role} onChange={(e) => setRole(e.target.value)} required />
                        </Grid>
                        <Grid item xs={12} container justifyContent="flex-end" spacing={2}>
                            <Grid item>
                                <Link href={`/client/viewclient/${clientId}`} className="link" >
                                    <Button variant="contained">
                                        Back To Cient Info
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" type="submit" disabled={isLoading} color="success">
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

export default ContactAddEditFormComponent;