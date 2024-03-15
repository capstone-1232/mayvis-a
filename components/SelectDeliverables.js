import { useState } from 'react';
import { useEffect } from 'react';

import {
  Typography,
  Box,
  Container
} from '@mui/material';

import SearchBarWithButton from './SearchField';
import CategoriesAccordion from './CustomAccordion';

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

  const sampleCategories = [
    {
      name: 'Web Development',
      products: [
        { name: 'Website Redesign', price: 3500.00, description: 'Complete overhaul of your current website to improve user experience.' },
        { name: 'SEO Optimization Package', price: 1000.00, description: 'Audit and enhancement of your website SEO to improve search engine.' },
      ],
    },
    {
      name: 'Digital Marketing',
      products: [
        { name: 'Digital Marketing Strategy', price: 2000.00, description: 'Comprehensive digital marketing plan to increase online visibility.' },
        { name: 'Social Media Management', price: 1500.00, description: 'Monthly management of social media accounts to increase engagement.' },
      ],
    },
  ];
  
  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Select Deliverables
        </Typography>
      </Box>
      <SearchBarWithButton/>
      <CategoriesAccordion categories={sampleCategories} />
    </Container>
  );
};

export default SelectDeliverables;
