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
      fontSize: '0.875rem', // Smaller font size
      padding: theme.spacing(1), // Adjusted padding
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: '0.875rem', // Smaller font size
      padding: theme.spacing(1), // Adjusted padding
    },
    lineHeight: 1, // Adjusted line height for text content
  }));
  

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
    '& td, & th': {
      padding: theme.spacing(1), // Adjust padding if needed
    },
    height: '40px', // Example fixed height
  }));
  

const columnSwitch = (param, value, data, key, index) => {
    //console.log(data.find(item => item.key === '_id')?.value);
    switch (param.toLowerCase()) {
        case 'edit':
            return <StyledTableCell align="center">
                <Link href={`/${value}/${data.find(item => item.key === '_id')?.value}`}>
                    <Tooltip title={param} placement="right-start">
                        <IconButton>
                            <EditIcon fontSize="large"></EditIcon>
                        </IconButton>
                    </Tooltip>
                </Link>
            </StyledTableCell>
        case 'view':
            return <StyledTableCell align="center">
                <Link href={`/${value}/${data.find(item => item.key === '_id')?.value}`}>
                    <Tooltip title={param} placement="right-start">
                        <IconButton>
                            <PreviewIcon fontSize="large"></PreviewIcon>
                        </IconButton>
                    </Tooltip>
                </Link>
            </StyledTableCell>
        default:
            return <StyledTableCell key={key + index} align="center">
                <Typography gutterBottom component="div" fontSize={20}>
                    {value}
                </Typography>
            </StyledTableCell>
    }
};

const ListViewComponent = ({ data }) => {
    return (
        <><TableContainer component={Paper} sx={{ padding: '2rem 3rem', margin: 1 }}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {data[0].map(({ column, show }, index) => (
                            show ?
                                <StyledTableCell key={index} align="center">
                                    <Typography gutterBottom component="div" fontSize={20}>
                                        {column}
                                    </Typography>
                                </StyledTableCell>

                                :
                                ''
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((col, index) =>
                        <StyledTableRow key={index}>
                            {col?.map(({ key, value, show, column }, index) => (
                                show ?
                                    key == 'Active'
                                        ?
                                        <StyledTableCell key={key + index} align="center">
                                            <CircleIcon fontSize="large" color={value === 'Yes' ? "success" : "disabled"}>{" "}</CircleIcon>
                                        </StyledTableCell>
                                        :
                                        columnSwitch(column,value,col, key, index)
                                    :
                                    ''
                            ))}
                        </StyledTableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}

export default ListViewComponent