import { useState } from 'react';
import { Box, Typography } from '@mui/material';

const ProposalTotalComponent = ({ deliverables, projectTotal, recurringTotal, proposalTotal }) => {
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
    )
}

const deliverablesData = [
    { name: 'Digital Ads and Marketing', price: 1500 },
    { name: 'Face Photoshoot', price: 2000 },
    { name: 'Logo Branding', price: 2000 },
];

const ProposalTotal = () => {
    const [deliverables, setDeliverables] = useState(deliverablesData);
    const projectTotal = deliverables.reduce((acc, item) => acc + item.price, 0);
    const recurringTotal = 1500;
    const proposalTotal = projectTotal + recurringTotal;

    return (
        <ProposalTotalComponent
            projectTotal={projectTotal}
            recurringTotal={recurringTotal}
            proposalTotal={proposalTotal}
        />
    );
}

export default ProposalTotal;