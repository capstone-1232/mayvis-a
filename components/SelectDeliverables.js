import { useState } from 'react';
import { useEffect } from 'react';

import {
  Typography,
  Box,
  Container
} from '@mui/material';

import SearchField from './SearchField';
import CategoriesAccordion from './CustomAccordion';

const SelectDeliverables = ({ onAddDeliverable }) => {
  const [categoriesData, setCategoriesData] = useState([]);

  const getProductDetails = async (productId) => {
    const response = await fetch(`/api/product/${productId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch product details');
    }
    return response.json();
  };

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
          const res = await fetch('/api/category', { cache: 'no-store' });
          if (!res.ok) {
              throw new Error('Failed to fetch categories');
          }
          let categories = await res.json();
          categories = Array.isArray(categories) ? categories : [];
          console.log(categories);

          const categoriesWithProducts = await Promise.all(categories.map(async (category) => {
            if (!Array.isArray(category.product_id)) {
                console.warn(`Category ${category._id} does not have product_id as an array`);
                return { ...category, products: [] };
            }
            const productDetailsPromises = category.product_id.map(productId => getProductDetails(productId));
            const products = await Promise.all(productDetailsPromises);
            return { ...category, products };
          }));

          setCategoriesData(categoriesWithProducts);
      } catch (error) {
          console.log('Error loading categories and products:', error);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  const handleAddProduct = (product) => {
    onAddDeliverable(product);
  };
  
  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Select Deliverables
        </Typography>
      </Box>
      <Box
        sx={{
          width: '76%'
      }}
      >
        <SearchField/>
      </Box>

      <CategoriesAccordion 
        categories={categoriesData}
        onAddToDeliverables={handleAddProduct}
      />
    </Container>
  );
};

export default SelectDeliverables;
