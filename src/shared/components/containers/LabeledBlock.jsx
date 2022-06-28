import React from 'react';
import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

const LabeledBlock = ({
    title,
    contentPadding = null,
    divider = false,
    button = null,
    children,
}) => {
    return (
        <Box component={Paper} sx={{ width: '100%' }}>
            <Box p={3}>
                <Typography variant="h6">{title}</Typography>
            </Box>

            {divider && <Divider />}

            <Box sx={contentPadding}>{children}</Box>

            {button && (
                <>
                    <Divider />

                    <Box p={3}>
                        <Button
                            size="large"
                            variant="outlined"
                            endIcon={<ArrowForwardIcon />}
                            component={Link}
                            to={button}
                        >
                            See more
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default LabeledBlock;
