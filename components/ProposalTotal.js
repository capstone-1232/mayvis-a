import { useState } from 'react';
import { Box, Typography } from '@mui/material';

const recurringMultipliers = {
    weekly: 4,
    monthly: 1,
    quarterly: 3 / 12,
    yearly: 1 / 12,
};

const ProposalTotal = ({ deliverables }) => {
    const { projectTotal, recurringTotal } = deliverables.reduce((totals, item) => {
        const price = parseFloat(item.price);
        if (item.is_recurring) {
          const multiplier = recurringMultipliers[item.recurring_option] || 1;
          totals.recurringTotal += price * multiplier;
        } else {
          totals.projectTotal += price;
        }
        return totals;
      }, { projectTotal: 0, recurringTotal: 0 });

    const proposalTotal = projectTotal + recurringTotal;

    return (
        <Box sx={{ bgcolor: 'background.paper', p: 1 }}>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1">
                        Project Total:
                    </Typography>
                    <Typography variant="body1">
                        ${projectTotal.toFixed(2)}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1">
                        Recurring Total:
                    </Typography>
                    <Typography variant="body1">
                        ${recurringTotal.toFixed(2)}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1">
                        Proposal Total:
                    </Typography>
                    <Typography variant="h6">
                        ${proposalTotal.toFixed(2)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default ProposalTotal;