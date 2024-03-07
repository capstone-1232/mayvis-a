import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

const SearchBarWithButton = () => {
    const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Search term:', searchTerm);
  };

  const commonHeight = '35px';

  return (
    <Box display="flex" alignItems="center" position="relative">
        <Button
            variant="contained"
            sx={{
                borderRadius: 20,
                height: commonHeight,
                width: "35%",
                minWidth: 'fit-content',
                position: 'absolute',
                left: 0,
                zIndex: 1,
                backgroundColor: "black",
                '&:hover': {
                    backgroundColor: "darkgray",
                },
            }}
            onClick={handleSearch}
        >
            Search
        </Button>
        <TextField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            sx={{
                height: commonHeight,
                width: '90%',
                '& .MuiOutlinedInput-root': {
                    height: '100%',
                    '& fieldset': {
                        borderTopRightRadius: 20,
                        borderBottomRightRadius: 20,
                    },
                },
                '& .MuiInputBase-input': {
                    paddingLeft: '30%',
                },
                marginLeft: '10%',
                bgcolor: 'grey.100'
            }}
        />
    </Box>
  );
};

export default SearchBarWithButton;
