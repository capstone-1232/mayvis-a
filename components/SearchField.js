import { useState } from 'react';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';

const SearchField = ({ id, options, value, onInputChange }) => {
  const commonHeight = '35px';

  return (
    <Box display="flex" alignItems="center" position="relative">
        <Box
            sx={{
                borderRadius: 20,
                height: commonHeight,
                width: "35%",
                minWidth: 'fit-content',
                position: 'absolute',
                left: 0,
                zIndex: 1,
                backgroundColor: "black",
            }}
        >
            <Typography
                sx={{
                    color: '#ffffff',
                    marginTop: '5px',
                    textAlign: 'center'
                }}
            >
                Search
            </Typography>
        </Box>
        <Box
            sx={{
                width: "100%",
                borderRadius: 20,
            }}
        >
            <Autocomplete
                id={id}
                freeSolo
                options={options}
                value={value}
                onInputChange={onInputChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        sx={{
                            height: commonHeight,
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                                height: '100%',
                                '& fieldset': {
                                    borderTopRightRadius: 20,
                                    borderBottomRightRadius: 20,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'primary.main',
                                    borderWidth: '2px',
                                },
                            },
                            marginLeft: '30%',
                            bgcolor: 'grey.100',
                            borderTopRightRadius: 20,
                            borderBottomRightRadius: 20,
                        }}
                        InputProps={{
                            ...params.InputProps,
                            style: { paddingLeft: '30px', paddingTop: 0, paddingBottom: 0 },
                        }}
                    />
                )}
            />
        </Box>
    </Box>
  );
};

export default SearchField;
