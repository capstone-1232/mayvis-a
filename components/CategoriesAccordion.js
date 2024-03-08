import { useState } from 'react';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function CategoriesAccordion({ categories }) {
    const [expandedPanel, setExpandedPanel] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpandedPanel(isExpanded ? panel : false);
    };

    const renderProductCard = (product) => (
        <Card sx={{ flexGrow: 1, m: 1 }}>
            <CardContent>
            <Typography variant="h6" component="div">
                {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                ${product.price.toFixed(2)}
            </Typography>
            <Typography variant="body1">
                {product.description}
            </Typography>
            </CardContent>
            {/* If you have actions to add to the card, uncomment and use the CardActions component
            <CardActions>
            <Button size="small">Learn More</Button>
            </CardActions>
            */}
        </Card>
    );
  
    return (
      <Box sx={{ my: 2 }}>
        {categories.map((category) => (
          <Accordion key={category.name} expanded={expandedPanel === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${category.name}-content`}
              id={`panel-${category.name}-header`}
            >
              <Typography>{category.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {category.products.slice(0, 4).map(renderProductCard)}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  }
  
  export default CategoriesAccordion;