import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    Skeleton,
    Typography,
} from '@mui/material';

const AuthLoad = () => {
    return (
        <Container
            maxWidth="lg"
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Card
                sx={{
                    width: { xs: '100%', sm: '80%', md: '60%', lg: '40%' },
                }}
            >
                <Box display="flex" justifyContent="center">
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            width: '100%',
                            height: 250,
                            borderTopLeftRadius: 1,
                            borderTopRightRadius: 1,
                        }}
                    />
                </Box>
                <CardContent>
                    <Grid container direction="column">
                        <Grid item align="center">
                            <Skeleton
                                width="50%"
                                sx={{ mt: 1, mb: 3, py: 3 }}
                            />
                        </Grid>
                        <Grid container item>
                            <Grid item xs={12}>
                                <Skeleton height={40} sx={{ py: 3 }} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sx={{ display: 'flex', justifyContent: 'end' }}
                            >
                                <Skeleton sx={{ py: 1.5, width: '35%' }} />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Skeleton sx={{ py: 3, width: '45%' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    display="inline-block"
                                    sx={{
                                        width: '40%',
                                        mr: 1,
                                    }}
                                >
                                    <Skeleton sx={{ py: 0.5 }} />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    display="inline-block"
                                    sx={{
                                        width: '20%',
                                    }}
                                >
                                    <Skeleton sx={{ py: 0.5 }} />
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};

export default AuthLoad;
