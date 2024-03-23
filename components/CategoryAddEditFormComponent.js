import { Box, FormControlLabel, Grid, Paper, Switch, TextField, Button, Typography, Snackbar, Slide, Alert } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react"

const CategoryAddEditFormComponent = ({ category }) => {
    const [categoryName, setCategoryName] = useState(category.categoryName);
    const [archive, setArchive] = useState(category.archived);
    const [description, setDescription] = useState(category.description);
    const [isLoading, setIsLoading] = useState(category.isLoading)
    const [showMsg, setShowMsg] = useState(category.showMsg);
    const [msg, setMsg] = useState(category.msg);
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
            if (!categoryName || !description) {
                setSeverity('error');
                handleMsg('Category Name and Description are required!');
                return;
            }

            const data = await category.processCategory({
                categoryName: categoryName,
                archived: archive,
                description: description,
                productId: _id
            })

            if (data.error) {
                setSeverity('error');
                handleMsg(data.error);
            }
            else {
                setTimeout(() => {
                    setSeverity('success');
                    handleMsg('Category has been saved');
                    setTimeout(() => {
                        setIsLoading(false);
                        router.push('/category');
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
                <Paper elevation={12} sx={{ marginTop: 2, padding: 5, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }}>
                    <Grid container spacing={5} alignItems="center">
                        <Grid item xs={12}>
                            <Typography variant="h4" component="div" gutterBottom>
                                Add/Update Category
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel control={<Switch checked={archive} onChange={(e) => setArchive(e.target.checked)} disabled = {(category.disableFields)}/>} label="Archive Category" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Category Name" fullWidth value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required 
                            disabled = {(category.disableFields)}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Description" fullWidth multiline
                                rows={15} value={description} onChange={(e) => setDescription(e.target.value)} required 
                                disabled = {(category.disableFields)}/>
                        </Grid>
                        <Grid item xs={12} container justifyContent="flex-end" spacing={2}>
                            <Grid item>
                                <Link href={'/category'} >
                                    <Button variant="contained" >
                                    {(category.disableFields ? "Back": "Cancel")} 
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" type="submit" disabled={isLoading || (category.disableFields)}>
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

export default CategoryAddEditFormComponent;