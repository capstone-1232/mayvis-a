import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const recurringMultipliers = {
    weekly: 4,
    monthly: 1,
    quarterly: 3 / 12,
    yearly: 1 / 12,
};

const ProposalTotal = ({ deliverables }) => {
    const [projectTotal, setProjectTotal] = useState(0);
    const [recurringTotal, setRecurringTotal] = useState(0);
    const [proposalTotal, setProposalTotal] = useState(0);

    useEffect(() => {
        const { projectTotal, recurringTotal } = deliverables.reduce((acc, item) => {
            const pricePerUnit = parseFloat(item.price?.$numberDecimal || item.price);
            const productCost = pricePerUnit * item.quantity;

            if (item.is_recurring) {
                const multiplier = recurringMultipliers[item.recurring_option] || 1;
                acc.recurringTotal += productCost * multiplier;
                setRecurringTotal(acc.recurringTotal);

            } else {
                acc.projectTotal += productCost;
                setProjectTotal(acc.projectTotal);
            }

            return acc;
        }, { projectTotal: 0, recurringTotal: 0 });

        const proposalTotal = projectTotal + recurringTotal;

        setProposalTotal(proposalTotal);

        sessionStorage.setItem('projectTotal', projectTotal);
        sessionStorage.setItem('recurringTotal', recurringTotal);
        sessionStorage.setItem('proposalTotal', proposalTotal);

    }, [deliverables]);

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