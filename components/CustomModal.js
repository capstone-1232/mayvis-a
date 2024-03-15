import { useState } from 'react';
import { Box, Modal, Typography, Button } from '@mui/material';

function CustomModal({ icon, title, message, buttons, open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {icon && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
          {icon}
        </Box>}
        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          {message}
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            mt: 2
          }}
        >
          {buttons.map((button, index) => (
            <Button 
              key={index}
              variant={button.variant || "contained"}
              color={button.color || "primary"}
              onClick={button.onClick || onClose}
              sx={{
                width: '50%',
                mx: 1,
                ...button.sx 
              }}
            >
              {button.label}
            </Button>
          ))}
        </Box>
      </Box>
    </Modal>
  );
}

export default CustomModal;
