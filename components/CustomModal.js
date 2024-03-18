import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Modal, Typography, Button } from '@mui/material';
import Link from 'next/link';

function CustomModal({ icon, title, message, buttons, linkText, open, onClose }) {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      onClose();
    }
  };

  return (
    <Modal 
      open={open} 
      onClose={handleClose}
      disableEscapeKeyDown
    >
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
        <Typography variant="h4" align="center" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="body1" align="center" sx={{ my: 3, fontSize: '20px' }}>
          {message}
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
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
                mx: 1,
                borderRadius: 3,
                px: 3,
                py: 1.5,
                color: 'white',
                ...button.sx
              }}
            >
              {button.label}
            </Button>
          ))}
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            mt: 3,
          }}
        >
          <Typography variant="h6" onClick={onClose} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            {linkText}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}

export default CustomModal;
