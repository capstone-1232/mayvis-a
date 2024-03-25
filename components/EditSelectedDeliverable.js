import { useState, useEffect } from 'react';
import { TextField, Button, Box, FormControlLabel, Checkbox, MenuItem } from '@mui/material';

const EditSelectedDeliverable = ({ deliverable, onSave, onCancel }) => {
    const [editedDeliverable, setEditedDeliverable] = useState({
        ...deliverable,
        recurring_option: deliverable.recurring_option || '', // Use '' as default if undefined
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

    // Populate this with your categories
    const recurringOptions = ["Monthly", "Yearly", "Weekly"];

    return (<>
        <Box>
            <TextField
                label="Product Name"
                name="product_name"
                value={editedDeliverable.product_name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
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
            <FormControlLabel
                control={
                    <Checkbox
                        checked={editedDeliverable.is_recurring}
                        onChange={handleInputChange}
                        name="is_recurring"
                    />
                }
                label="Is Recurring"
            />
            <TextField
                select
                label="Recurring Option"
                name="recurring_option"
                value={editedDeliverable.recurring_option}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            >
                <MenuItem value="">None</MenuItem>
                {recurringOptions.map((option) => (
                    <MenuItem key={option} value={option}>
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
