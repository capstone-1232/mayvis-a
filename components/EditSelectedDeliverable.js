import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';

import CustomToggleButton from './CustomToggleButton';

const EditSelectedDeliverable = ({ deliverable, onSave, onCancel }) => {
    const [editedDeliverable, setEditedDeliverable] = useState({
        ...deliverable,
        recurring_option: deliverable.recurring_option || '',
    });

    useEffect(() => {
        setEditedDeliverable({
            ...deliverable,
            recurring_option: deliverable.recurring_option || '',
        });
    }, [deliverable]);

    const handleInputChange = (e) => {
        const { name, value, checked, type } = e.target;
        setEditedDeliverable({
            ...editedDeliverable,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSaveClick = () => {
        onSave(editedDeliverable);
    };

    const recurringOptions = ["Weekly", "Monthly", "Quarterly", "Yearly"];

    return (<>
        <Box>
            <Typography 
                variant="h5"
                sx={{
                    mb: 2
                }}
            >
                {editedDeliverable.product_name}
            </Typography>

            <Typography 
                variant="body1"
                sx={{
                    mb: 2
                }}
            >
                {editedDeliverable.description}
            </Typography>

            <TextField
                label="Price"
                name="price"
                value={editedDeliverable.price}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                type="number"
            />
            <TextField
                label="Quantity"
                name="quantity"
                value={editedDeliverable.quantity}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                type="number"
            />
            <CustomToggleButton
                label="Is Recurring"
                checked={editedDeliverable.is_recurring}
                onChange={(event) => {
                    setEditedDeliverable({
                    ...editedDeliverable,
                    is_recurring: event.target.checked,
                    });
                }}
            />
            <TextField
                select
                label="Recurring Option"
                name="recurring_option"
                value={editedDeliverable.recurring_option}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputProps={{
                    readOnly: !editedDeliverable.is_recurring,
                }}
            >
                <MenuItem value="">None</MenuItem>
                {recurringOptions.map((option) => (
                    <MenuItem key={option} value={option.toLowerCase()}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="Notes"
                name="notes"
                value={editedDeliverable.notes}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
            />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5 }}>
            <Button
                variant="contained"
                sx={{
                    py: 1.5,
                    borderRadius: 2,
                    width: '25%',
                }}
                onClick={onCancel}
            >
                Cancel
            </Button>

            <Button
                variant="contained"
                sx={{
                    py: 1.5,
                    ml: 3,
                    borderRadius: 2,
                    width: '25%',
                    bgcolor: '#2A987A',
                    '&:hover': {
                        bgcolor: '#238b6a',
                        boxShadow: 'none'
                    }
                }}
                onClick={handleSaveClick}
            >
                Save
            </Button>
        </Box>
    </>
    );
};

export default EditSelectedDeliverable;
