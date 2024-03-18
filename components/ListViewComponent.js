import { Grid, IconButton, Tooltip, Typography, Paper } from "@mui/material";
import Link from "next/link";
import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import CircleIcon from '@mui/icons-material/Circle';
import PreviewIcon from '@mui/icons-material/Preview';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const ListViewComponent = ({ data }) => {
    return (
        <><TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {data?.map(({ column, show }, index) => (
                            show ?
                                <StyledTableCell component="th" scope="row">
                                    <Typography gutterBottom component="div" fontSize={20}>
                                        {column}
                                    </Typography>
                                </StyledTableCell>

                                :
                                ''
                        ))}
                    </TableRow>
                    {/* <TableRow>
                        <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                        <StyledTableCell align="right">Calories</StyledTableCell>
                        <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                        <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                        <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                    </TableRow> */}
                </TableHead>
                <TableBody>
                    {/* {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.calories}</StyledTableCell>
                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                        </StyledTableRow>
                    ))} */}
                    {data?.map(({ key, value, show }, index) => (
                        show ?
                            key == 'Active'
                                ?
                                <StyledTableCell component="th" scope="row">
                                    <CircleIcon fontSize="large" color={value === 'Yes' ? "success" : "disabled"}>{" "}</CircleIcon>
                                </StyledTableCell>
                                :
                                <StyledTableCell component="th" scope="row">
                                    <Typography gutterBottom component="div" fontSize={20}>
                                        {value}
                                    </Typography>
                                </StyledTableCell>
                            :
                            ''
                    ))}
                </TableBody>
            </Table>
        </TableContainer>



            <Grid item xs>
                <Link href={`/${data.find(item => item.key === 'editUrlPath')?.value}/${data.find(item => item.key === '_id')?.value}`}>
                    <Tooltip title="Edit" placement="right-start">
                        <IconButton>
                            <EditIcon fontSize="large"></EditIcon>
                        </IconButton>
                    </Tooltip>
                </Link>
            </Grid>
            <Grid item xs>
                <Link href={`/${data.find(item => item.key === 'viewUrlPath')?.value}/${data.find(item => item.key === '_id')?.value}`}>
                    <Tooltip title="View" placement="right-start">
                        <IconButton>
                            <PreviewIcon fontSize="large"></PreviewIcon>
                        </IconButton>
                    </Tooltip>
                </Link>
            </Grid>
        </>
    )
}

export default ListViewComponent