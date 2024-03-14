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
        {categories.map((category, index) => (
          <Accordion 
            key={category.name} 
            expanded={expandedPanel === category.name} 
            onChange={handleChange(category.name)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>}
              aria-controls={`panel-${category.name}-content`}
              id={`panel-${category.name}-header`}
              sx={{
                bgcolor: '#405caa',
                color: 'white',
                marginBottom: (index === categories.length - 1 || index === categories.findIndex(cat => cat.name === expandedPanel) - 1) ? 0 : 0.5,
              }}
            >
              <Typography>{category.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'no-wrap' }}>
                  {category.products.map((product, index) => (
                    <Card key={index} sx={{ flexGrow: 1, m: 1 }}>
                        <CardContent>
                          <Typography variant="h6" component="div">
                            {product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ${product.price.toFixed(2)}
                          </Typography>
                          <Typography variant="body1">
                            {product.description.length > 60 ? product.description.substring(0, 60) + "..." : product.description}
                          </Typography>
                        </CardContent>
                        {/* Optional CardActions */}
                    </Card>
                  ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  }
  
  export default CategoriesAccordion;