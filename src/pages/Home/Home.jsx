import React from 'react';
import Box from '@mui/material/Box';

import BackgroundImage from '../../shared/assets/img/background/blueberries.jpg'; // average color -> #333434
import { Button, Typography, useTheme } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { grey } from '@mui/material/colors';
import useAuth from '../../shared/hooks/useAuth';
import { Link } from 'react-router-dom';

const Home = () => {
    const theme = useTheme();
    const { isLoggedIn } = useAuth();

    const smallText = {
        fontSize: 82,
        fontFamily: 'Lora, serif',
        fontStyle: 'italic',
        textTransform: 'lowercase',
        lineHeight: '5rem',
        [theme.breakpoints.down('md')]: {
            fontSize: 52,
            lineHeight: '3rem',
        },
    };

    const bigText = {
        fontSize: '100px',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        lineHeight: '5rem',
        my: 3,
        [theme.breakpoints.down('md')]: {
            fontSize: 70,
            lineHeight: '3rem',
        },
    };

    const bgImage = {
        display: 'flex',
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: `linear-gradient(90deg, rgba(51, 52, 52, 0.35) 0%, rgba(51, 52, 52, 0.35) 100%), url(${BackgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '50% 0%',
        color: grey[200],
        fontWeight: 400,
        [theme.breakpoints.down('md')]: {
            minHeight: '90vh',
        },
    };

    const heroBtn = {
        width: '20rem',
        typography: 'body1',
        textTransform: 'capitalize',
        mt: (theme) => theme.spacing(6),
        [theme.breakpoints.down('sm')]: {
            width: '60%',
        },
        [theme.breakpoints.down('md')]: {
            mt: 4,
        },
    };

    return (
        <>
            <Box sx={bgImage}>
                <Box
                    sx={{
                        display: 'flex',
                        height: 40,
                        position: 'absolute',
                        right: 0,
                        mx: 3,
                        my: 1.5,
                        alignItems: 'center',
                    }}
                >
                    {!isLoggedIn ? (
                        <>
                            <Button component={Link} to="/login">
                                Login
                            </Button>
                            <Typography mx={1}>/</Typography>
                            <Button component={Link} to="/register">
                                Register
                            </Button>
                        </>
                    ) : (
                        <Button component={Link} to="/users/profile">
                            Profile
                        </Button>
                    )}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 4,
                    }}
                >
                    <Typography component="span" sx={smallText}>
                        Kitchen's
                    </Typography>
                    <Typography component="span" sx={bigText}>
                        Secret
                    </Typography>
                    <Typography component="span" sx={smallText}>
                        Desire
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<KeyboardArrowRightIcon />}
                        sx={heroBtn}
                        color="secondary"
                        component={Link}
                        to={isLoggedIn ? '/calculator' : '/login'}
                    >
                        Let's Go
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default Home;
