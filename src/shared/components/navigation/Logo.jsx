import { Button, Divider, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
    const LogoText = styled('div')(({ theme }) => ({
        ...theme.mixins.toolbar,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Montserrat, sans-serif',
        width: '100%',
    }));

    return (
        <>
            <LogoText>
                <Button
                    component={Link}
                    to="/"
                    variant="text"
                    disableRipple
                    fullWidth
                    disableElevation
                >
                    <Typography variant="h4">KSD</Typography>
                </Button>
            </LogoText>

            <Divider />
        </>
    );
};

export default Logo;
