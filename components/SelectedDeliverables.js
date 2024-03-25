import { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton, Stack } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const SelectedDeliverables = ({ deliverables = [], onDelete, onEdit, isEditing, showEditButton = true }) => {

  return (
    <Box sx={{ bgcolor: 'background.paper', p: 1 }}>
      <Typography variant="h6" gutterBottom>
        Deliverables
      </Typography>
      <List>
      {deliverables.map((item, index) => {
          let price = item.price;

          if (price && typeof price === 'object' && price.$numberDecimal) {
            price = parseFloat(price.$numberDecimal);
          } else {
            price = parseFloat(price);
          }
          
          return (
            <ListItem
              key={index}
              secondaryAction={
                <Stack>
                  {!isEditing && (
                    <IconButton 
                      edge="end" 
                      aria-label="delete" 
                      onClick={() => onDelete(index)}
                      sx={{ 
                        position: 'absolute', 
                        top: -50, 
                        right: -17,
                      }}
                    >
                      <RemoveCircleIcon
                        sx={{
                          color: 'red'
                        }}
                      />
                    </IconButton>
                  )}

                  {showEditButton && (
                    <IconButton 
                      edge="end" 
                      aria-label="delete" 
                      onClick={() => onEdit(item)}
                      sx={{ 
                        position: 'absolute', 
                        top: -20, 
                        right: 5,
                      }}
                    >
                      <ModeEditIcon
                        sx={{
                          color: '#dedede'
                        }}
                      />
                    </IconButton>
                  )}
                </Stack>
              }
              divider
              sx={{ 
                bgcolor: '#253C7C', borderRadius: '15px', 
                mb: 1,
                borderRadius: 3
              }}
            >
              <ListItemText
                primary={item.product_name} 
                secondary={`${isNaN(price) ? "N/A" : `$${price.toFixed(2)}`}`}
                sx={{
                  '& .MuiListItemText-primary': {
                    color: '#ffffff',
                    fontWeight: 'bold'
                  },
                  '& .MuiListItemText-secondary': {
                    color: '#ffffff',
                  }
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default SelectedDeliverables;