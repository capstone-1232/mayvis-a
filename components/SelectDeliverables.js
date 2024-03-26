import { useState } from 'react';
import { useEffect } from 'react';

import {
  Typography,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  TextField
} from '@mui/material';

import SearchField from './SearchField';
import CategoriesAccordion from './CustomAccordion';

const SelectDeliverables = ({ onAddDeliverable }) => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const getProductDetails = async (productId) => {
    const response = await fetch(`/api/product/${productId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product details');
    }
    return response.json();
  };

  const getAllProducts = async () => {
    try {
      const response = await fetch(`/api/product`);
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      let products = await response.json();
      products = products.map(product => {
        return {
          ...product,
          price: product.price.$numberDecimal ? parseFloat(product.price.$numberDecimal) : product.price
        };
      });
      setProductsData(products);
    } catch (error) {
      console.error('Failed to fetch products:', error.message);
    }
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
    getAllProducts();
  }, []);

  const renderProductCard = (product) => {
    const key = product._id;
    const price = product.price?.$numberDecimal ? parseFloat(product.price.$numberDecimal) : product.price;

    return (
      <Card
        key={key}
        sx={{
          flexGrow: 1,
          m: 1,
          borderRadius: '15px',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.30)'
        }}>
        <CardActionArea onClick={() => onAddDeliverable(product)}>
          <CardContent>
            <Typography variant="h6" component="div">
              {product.product_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${isNaN(price) ? "N/A" : price.toFixed(2)}
            </Typography>
            <Typography variant="body1">
              {product.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };

  const handleSearchChange = (event) => {
    const inputValue = event.target.value.toLowerCase();
    setSearchInput(inputValue);
    const selected = productsData.find(product => product.product_name.toLowerCase().includes(inputValue));
    setSelectedProduct(selected);
  };


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
        <Box display="flex" alignItems="center" position="relative">
          <Box
            sx={{
              borderRadius: 20,
              height: '35px',
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
            <TextField
              id="searchField"
              variant="outlined"
              sx={{
                height: '35px',
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
                style: { paddingLeft: '30px', paddingTop: 0, paddingBottom: 0 },
              }}
              onChange={handleSearchChange}
            />
          </Box>
        </Box>
      </Box>

      {searchInput && selectedProduct ? renderProductCard(selectedProduct) : (
        <CategoriesAccordion
          categories={categoriesData}
          onAddToDeliverables={handleAddProduct}
        />
      )}

    </Container>
  );
};

export default SelectDeliverables;
