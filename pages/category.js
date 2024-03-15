  import React, { useState } from 'react';
  import dynamic from 'next/dynamic';
  import Paper from '@mui/material/Paper';
  import Box from '@mui/material/Box';
  import TextField from '@mui/material/TextField';
  import RTextEditor from '@/components/RTextEditor';
  import CustomToggleButton from '@/components/CustomToggleButton';

  // Import 'react-quill' dynamically without SSR

  export default function Category() {
    const [categoryName, setCategoryName] = useState('');
    const [notes, setNotes] = useState('');
    const [archive, setArchive] = useState(false);

    const handleCategoryNameChange = (event) => {
      setCategoryName(event.target.value);
    };

    const handleNotesChange = (value) => {
      setNotes(value);
    };

    const handleArchiveToggle = (event) => {
      setArchive(event.target.checked);
    };

    // Inline styles
    const paperStyle = {
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
    };

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Paper elevation={3} style={paperStyle}             
              sx={{
              width:'80%',
              maxWidth:'720px'
              }}>
          <h1>Category</h1>

          <CustomToggleButton label={'Archive'}/>

          <TextField
            label="Client Name"
            variant="outlined"
            value={categoryName}
            onChange={handleCategoryNameChange}
            fullWidth
            margin="normal"
          />

          <h2>Notes</h2>

          <Box sx={{height:'350px'}}>
            <RTextEditor/>
          </Box>
          



          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', mt: '5rem' }}>
            <button onClick={() => console.log('Cancelled')} style={{ padding: '0.5rem 1rem', borderRadius: '10px', border: 'none', backgroundColor: '#405CAA', color: 'white', cursor: 'pointer' }}>Cancel</button>
            <button onClick={() => console.log('Saved')} style={{ padding: '0.5rem 1rem', borderRadius: '10px', border: 'none', backgroundColor: '#2A987A', color: 'white', cursor: 'pointer' }}>Save</button>
          </Box>
        </Paper>
      </Box>
    );
  }
