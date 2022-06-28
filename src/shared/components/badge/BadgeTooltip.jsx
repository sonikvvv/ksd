import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

import statusInfo from '../../utils/consts/status';

const BadgeTooltip = ({ status = 'refused', children }) => {
    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
            <Tooltip title={statusInfo[status]?.message} arrow>
                <Box
                    sx={{
                        position: 'absolute',
                        width: '20px',
                        height: '20px',
                        top: '-10px',
                        right: '-10px',
                        background: statusInfo[status].color,
                        borderRadius: '50%',
                    }}
                />
            </Tooltip>
            {children}
        </Box>
    );
};

export default BadgeTooltip;
