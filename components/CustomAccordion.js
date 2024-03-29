import { useState, useEffect } from 'react';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Button
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function CategoriesAccordion({ categories, onAddToDeliverables }) {
    const [expandedPanel, setExpandedPanel] = useState(null);

    useEffect(() => {
      if (categories.length > 0) {
          setExpandedPanel(categories[0]._id);
      }
    }, [categories]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    const renderProductCard = (product) => {
      const price = product.price?.$numberDecimal ? parseFloat(product.price.$numberDecimal) : product.price;
      
      return (
        <Card sx={{ flexGrow: 1, m: 1 }} key={product.id}>
          <CardActionArea onClick={() => onAddToDeliverables(product)}>
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
  
    return (
      <Box sx={{ my: 2 }}>
        {categories.map((category, index) => (
          <Accordion 
            key={category._id} 
            expanded={expandedPanel === category._id} 
            onChange={handleChange(category._id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>}
              aria-controls={`panel-${category._id}-content`}
              id={`panel-${category._id}-header`}
              sx={{
                bgcolor: '#405caa',
                color: 'white',
                marginBottom: (index === categories.length - 1 || index === categories.findIndex(cat => cat.name === expandedPanel) - 1) ? 0 : 0.5,
              }}
            >
              <Typography>{category.category_name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'no-wrap' }}>
                {category.products.map(renderProductCard)}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  }
  
  export default CategoriesAccordion;