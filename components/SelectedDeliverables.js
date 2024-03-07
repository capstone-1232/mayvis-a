import { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DeliverablesComponent = ({ deliverables, projectTotal, recurringTotal, proposalTotal, onDelete }) => {
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
              <IconButton edge="end" aria-label="delete" onClick={() => onDelete(index)}>
                <CloseIcon />
              </IconButton>
            }
            divider
            sx={{ bgcolor: 'grey.100', mb: 1 }}
          >
            <ListItemText primary={item.name} secondary={`$${item.price.toFixed(2)}`} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">Project Total: ${projectTotal.toFixed(2)}</Typography>
        <Typography variant="body1">Recurring Total: ${recurringTotal.toFixed(2)}</Typography>
        <Typography variant="h6">Proposal Total: ${proposalTotal.toFixed(2)}</Typography>
      </Box>
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
  const projectTotal = deliverables.reduce((acc, item) => acc + item.price, 0);
  const recurringTotal = 1500;
  const proposalTotal = projectTotal + recurringTotal;

  const handleDelete = (index) => {
    const newDeliverables = deliverables.filter((_, i) => i !== index);
    setDeliverables(newDeliverables);
  };

  return (
    <DeliverablesComponent
      deliverables={deliverables}
      projectTotal={projectTotal}
      recurringTotal={recurringTotal}
      proposalTotal={proposalTotal}
      onDelete={handleDelete}
    />
  );
};

export default SelectedDeliverables;