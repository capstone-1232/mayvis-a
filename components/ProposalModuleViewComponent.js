import { Button, Card, Stack, Typography, Grid } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const ProposalModuleViewComponent = ({ data }) => {
    const router = useRouter();
    const isArchivalPage = router.pathname.includes('/proposal/archival');

    return (
        <>
            <Card elevation={12}
                sx={{ padding: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }}
            >
                <Stack spacing={0} sx={{ maxHeight: '250px', minHeight: '250px', overflow: 'hidden' }}>
                    {data?.map(({ key, value, show }, index) => (
                        show ?
                            key == 'Title'
                                ?
                                <Typography key={key} variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    {value}
                                </Typography>
                                :
                                <Typography variant="body1">
                                    {/* <strong>{key}</strong> {JSON.parse(value)} */}
                                    <strong>{key}</strong>: {value}
                                </Typography>
                            :
                            ''
                    ))}
                </Stack>
                <Stack alignItems="center" marginTop={'20px'}>

                    <Grid container spacing={3} justifyContent="center"  >
                        <Grid item >
                            <Link href={`/${data.find(item => item.key === 'viewUrlPath')?.value}/${data.find(item => item.key === '_id')?.value}`} className="link">
                                <Button variant="contained" sx={{ backgroundColor: '#253C7C', borderRadius: '15px' }}>
                                    View
                                </Button>
                            </Link>
                        </Grid>
                        {!isArchivalPage && (
                            <Grid item>
                                <Link
                                    href={`/new-proposal/summary/${data.find(item => item.key === '_id')?.value}`} 
                                    passHref
                                >
                                    <Button variant="contained" sx={{ backgroundColor: '#253C7C', borderRadius: '15px' }}>
                                        Edit
                                    </Button>
                                </Link>
                            </Grid>
                        )}
                    </Grid>
                </Stack>
            </Card >
        </>
    )
}

export default ProposalModuleViewComponent