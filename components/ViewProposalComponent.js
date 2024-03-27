import { Box, Container, Paper, Switch, Stack, TextField, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react"

const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
const baseURL = process.env.VERCEL_URL ? `${protocol}://${process.env.VERCEL_URL}` : `${protocol}://localhost:3000`;
const apiRoute = `${baseURL}/api/proposal`;

const ViewProposalComponent = ({ proposal }) => {
    console.log(proposal);
    const router = useRouter();

    const validDate = proposal.proposal_date ? new Date(proposal.proposal_date) : null;
    const isValidDate = (date) => date instanceof Date && !isNaN(date);
    const formattedDate = isValidDate(validDate) ? new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(validDate) : '';

    const handleBack = () => {
        router.back();
    };

    const handleArchive = async (e) => {
        e.preventDefault();

        const proposalId = proposal._id;

        const isArchivedStatus = !proposal.is_archived;

        try {
            const response = await fetch(`${apiRoute}/${proposalId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _id: proposalId,
                    is_archived: isArchivedStatus,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to archive the proposal');
            }

            const data = await response.json();
            console.log("Proposal archived successfully", data);
            router.push('/proposal');
        } catch (error) {
            console.error("Error archiving proposal:", error);
        }

    };

    return (<>
        <Container>
            <Paper
                elevation={5}
                sx={{
                    p: 3,
                    mt: 10,
                    mb: 1,
                    borderRadius: 2,
                    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)',
                    backgroundColor: "#253C7C",
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        color: "#ffffff"
                    }}
                >
                    {proposal.proposal_title}
                </Typography>
            </Paper>
            <Paper
                elevation={5}
                sx={{ p: 3, mt: 2, mb: 1, borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10%', alignItems: 'center', py: 5 }}>
                    <Box>
                        <Stack spacing={1}>
                            <Typography variant="h6" sx={{ fontWeight: '600' }}>Status:</Typography>
                            <Typography variant="h6" sx={{ fontWeight: '600' }}>Date Created:</Typography>
                            {/* <Typography variant="h6" sx={{ fontWeight: '600' }}>Client Name:</Typography> */}
                            {/* <Typography variant="h6" sx={{ fontWeight: '600' }}>Client Contact:</Typography> */}
                            <Typography variant="h6" sx={{ fontWeight: '600' }}>Created By:</Typography>
                        </Stack>
                    </Box>
                    <Box>
                        <Stack spacing={1}>
                            <Typography variant="h6">{proposal.status}</Typography>
                            <Typography variant="h6">{formattedDate}</Typography>
                            {/* <Typography>{propos} {lastName}</Typography> */}
                            {/* <Typography>{email}</Typography> */}
                            <Typography variant="h6">Nicole Samuels</Typography>
                        </Stack>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5%', alignItems: 'center', py: 5 }}>
                    <Button
                        variant="contained"
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            width: '15%',
                            bgcolor: '#253C7C',
                        }}
                        onClick={handleBack}
                    >
                        Back
                    </Button>

                    <Button
                        variant="contained"
                        sx={{
                            py: 1.5,
                            ml: 3,
                            borderRadius: 2,
                            width: '15%',
                            bgcolor: '#253C7C',
                        }}
                        onClick={handleArchive}
                    >
                        {proposal.is_archived ? 'Activate' : 'Archive'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    </>
    );
}

export default ViewProposalComponent;