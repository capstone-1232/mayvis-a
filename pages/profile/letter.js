import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import RTextEditor from '@/components/RTextEditor';

// Import 'react-quill' dynamically without SSR
const QuillEditor = dynamic(() => import('react-quill'), {
  ssr: false,
});

export default function Letter() {
  const [content, setContent] = useState('');

  const handleContentChange = (value) => {
    setContent(value);
  };

  const saveContent = () => {
    // Implement the save functionality here
    console.log(content);
  };

  // Inline styles for the Paper component
  const paperStyle = {
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0px 5px 10px rgba(0,0,0,0.30)', // Adjust the shadow to match your design
  };

  return (
    <Box
      sx={{
        mx: 'auto', // This centers the Box
        mt: 'auto', // Add some margin to the top
      }}
    >
      <h1 style={{ textAlign: 'left', margin: '1.5rem 0', }}>My Letter</h1>
      <Paper elevation={3} style={paperStyle}
            sx={{
              maxWidth: '80vw',
              mx: 'auto',
              mt: 'auto',
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)'
            }}>
        <h2 style={{ textAlign: 'left' }}>Customize Message</h2>

        <Box sx={{height:'50vh'}}><RTextEditor /></Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '3rem' }}>
          <button onClick={saveContent} style={{ padding: '1rem 1.5rem', borderRadius: '5px', border: 'none', backgroundColor: '#253C7C', borderRadius: '15px', color: 'white', cursor: 'pointer' }}>
            Save
          </button>
        </Box>
      </Paper>
    </Box>
  );
}