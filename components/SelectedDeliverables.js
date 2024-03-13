import { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton, Stack } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const DeliverablesComponent = ({ deliverables, onDelete, onEdit }) => {

  const handleEdit = (e) => {
    e.preventDefault();
    // To Do Logic to handle form data...
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', p: 1 }}>
      <Typography variant="h6" gutterBottom>
        Deliverables
      </Typography>
      <List>
        {deliverables.map((item, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <Stack>
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

                <IconButton 
                  edge="end" 
                  aria-label="delete" 
                  onClick={handleEdit}
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
              </Stack>
            }
            divider
            sx={{ 
              bgcolor: '#405caa', 
              mb: 1,
              borderRadius: 3
            }}
          >
            <ListItemText
              primary={item.name} 
              secondary={`$${item.price.toFixed(2)}`}
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
        ))}
      </List>
    </Box>
  );
};

const deliverablesData = [
  { name: 'Digital Ads and Marketing', price: 1500 },
  { name: 'Face Photoshoot', price: 2000 },
  { name: 'Logo Branding', price: 2000 },
];

const SelectedDeliverables = () => {
  const [deliverables, setDeliverables] = useState(deliverablesData);

  const handleDelete = (index) => {
    const newDeliverables = deliverables.filter((_, i) => i !== index);
    setDeliverables(newDeliverables);
  };

  return (
    <DeliverablesComponent
      deliverables={deliverables}
      onDelete={handleDelete}
    />
  );
};

export default SelectedDeliverables;