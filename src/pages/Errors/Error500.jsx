import React from 'react';
import {
    Button,
    Container,
    Grid,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Error500SVG from '../../shared/assets/img/background/500-error.svg';

const Error500 = () => {
    const match = useMediaQuery((theme) => theme.breakpoints.between(0, 900));
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const imgEl = (
        <Grid
            item
            xs={12}
            lg={7}
            sx={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    width: {
                        xs: '100%',
                        sm: '60%',
                        lg: '100%',
                    },
                }}
            >
                <img src={Error500SVG} alt="Error 500." width="100%" />
            </Box>
        </Grid>
    );

    return (
        <Container maxWidth="lg" sx={{ pt: 1.5 }}>
            {match && imgEl}
            <Grid container justifyContent="center">
                <Grid
                    container
                    item
                    alignItems="center"
                    justifyContent="center"
                    direction="column"
                    xs={12}
                    lg={5}
                >
                    <Typography variant="h2" align="center" gutterBottom>
                        Internal server error
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                        You either tried some shady route or you came here by
                        mistake. Whichever it is, try using the navigation.
                    </Typography>
                    <Button
                        variant="outlined"
                        sx={{
                            mt: 3,
                            mb: { xs: 3, md: 0 },
                            textTransform: 'none',
                        }}
                        onClick={goBack}
                    >
                        Go back
                    </Button>
                </Grid>
                {!match && imgEl}
            </Grid>
        </Container>
    );
};

export default Error500;
