import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CustomToggleButton from '@/components/CustomToggleButton';
import RTextEditor from '@/components/RTextEditor';

// Import 'react-quill' dynamically without SSR
const QuillEditor = dynamic(() => import('react-quill'), {
  ssr: false,
});

export default function ProductsServices() {
  const [productService, setProductService] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [archive, setArchive] = useState(false);

  const handleProductServiceChange = (event) => {
    setProductService(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleArchiveToggle = () => {
    setArchive(!archive);
  };

  // Inline styles
  const paperStyle = {
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <Paper elevation={3} style={paperStyle} sx={{ width:'80%', maxWidth:'720px' }}>
        <h1>Products/Services</h1>

        <CustomToggleButton label={'Archive'} toggled={archive} onToggle={handleArchiveToggle} />

        <FormControl fullWidth margin="normal">
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={category}
            label="Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value={'Category 1'}>Category 1</MenuItem>
            <MenuItem value={'Category 2'}>Category 2</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Product/Service"
          variant="outlined"
          value={productService}
          onChange={handleProductServiceChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="$ Price"
          variant="outlined"
          value={price}
          onChange={handlePriceChange}
          fullWidth
          margin="normal"
        />

        <h2>Description</h2>
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
