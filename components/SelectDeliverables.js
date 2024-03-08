import { useState } from 'react';
import { useEffect } from 'react';

import {
  Typography,
  Box,
  Container
} from '@mui/material';

import SearchBarWithButton from './SearchField';
import CategoriesAccordion from './CategoriesAccordion';

const SelectDeliverables = () => {
  const [categoriesData, setCategoriesData] = useState([]);

  const getCategories = async () => {
      try {
          const res = await fetch('http://localhost:3001/api/categories', { cache: 'no-store' });
          if (!res.ok) {
              throw new Error('Failed to fetch categories');
          }
          const json = await res.json();

          setCategoriesData(json);
      }
      catch (error) {
          console.log('Error loading categories', error);
      }
  }

  getCategories();
  
  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Select Deliverables
        </Typography>
      </Box>
      <SearchBarWithButton/>
      <CategoriesAccordion categories={categoriesData} />
    </Container>
  );
};

export default SelectDeliverables;
