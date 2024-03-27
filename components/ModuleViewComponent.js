import { Button, Card, Stack, Typography, Grid, Tooltip } from "@mui/material";
import Link from "next/link";
import React from "react";
import ArchiveIcon from '@mui/icons-material/Archive';

const ModuleViewComponent = ({ data }) => {
    return (
        <>
            <Card elevation={12}
                sx={{paddingBottom:2, paddingTop:1, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)' }}
            >
                <Grid sx={{textAlign:"end"}}>
                    {data.find(item => item.key === 'archive')
                        ? <Tooltip title={"Archive"} placement="right-start">
                            <Button onClick={data.find(item => item.key === 'archive').action} color={"inherit"}>
                                <ArchiveIcon />
                            </Button>
                        </Tooltip>
                        : ''}
                </Grid>
                <Stack spacing={0} sx={{ maxHeight: '235px', minHeight: '235px', overflow: 'hidden', padding: '0 2rem' }}>
                    {data?.map(({ key, value, show }, index) => (
                        show ?
                            key == 'Title'
                                ?
                                <Typography key={key} variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    {value}
                                </Typography>
                                :
                                <Typography key={key} variant="body1">
                                    {/* <strong>{key}</strong> {JSON.parse(value)} */}
                                    <strong>{key}</strong>: {value}
                                </Typography>
                            :
                            ''
                    ))}
                    {/* {c.contact_info?.filter(contact => contact.is_primary == true)?.map((contact, index) =>
                        <React.Fragment key={index}>
                            <Typography variant="body1">
                                Name : {`${contact.contact_firstname} ${contact.contact_lastname}`}
                            </Typography>
                            <Typography variant="body1">
                                Email: {contact.email}
                            </Typography>
                            <Typography variant="body1">
                                Contact No: {contact.contact_no}
                            </Typography>
                        </React.Fragment>
                    )}
                    <Typography variant="body1">
                        Active: {(c.is_active) ? 'Yes' : 'No'}
                    </Typography>
                    <Typography variant="body2" sx={{ overflow: 'hidden' }}>
                        Description:<br />{c.description}
                    </Typography> */}
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
                        <Grid item>
                            <Link href={`/${data.find(item => item.key === 'editUrlPath')?.value}/${data.find(item => item.key === '_id')?.value}`} className="link">
                                <Button variant="contained" sx={{ backgroundColor: '#253C7C', borderRadius: '15px' }}>
                                    Edit
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Stack>
            </Card >
        </>
    )
}

export default ModuleViewComponent