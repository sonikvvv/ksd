import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const InputBox = ({ title, subtitle, bigContent = false, children }) => {
    return (
        <Grid container component={Paper} direction="row" p={3} my={3}>
            <Grid item xs={12} md={bigContent ? 12 : 6}>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                {subtitle && (
                    <Typography variant="subtitle1" gutterBottom mr={3}>
                        {subtitle}
                    </Typography>
                )}
            </Grid>
            <Grid item xs={12} md={bigContent ? 12 : 6}>
                {children}
            </Grid>
        </Grid>
    );
};

export default InputBox;
