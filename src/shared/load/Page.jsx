import React from 'react';
import {
    Grid,
    Skeleton,
    Typography,
    Container,
    Box,
    Paper,
    Avatar,
    Chip,
} from '@mui/material';

import ListLoad from './ListLoad';

const Page = ({ subheader, list }) => {
    return (
        <Container maxWidth="lg">
            <Typography variant="h2" my={5}>
                <Skeleton />
            </Typography>

            {subheader && (
                <Typography variant="subtitle1" mb={5}>
                    <Skeleton />
                </Typography>
            )}

            <Box component={Paper}>
                <Skeleton
                    variant="rectangular"
                    sx={{
                        height: { xs: 200, sm: 300 },
                        width: '100%',
                        borderRadius: 1,
                    }}
                />

                <Box p={3} mb={3}>
                    <Grid container>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: 'flex',
                            }}
                        >
                            <Skeleton variant="circular">
                                <Avatar
                                    sx={{
                                        display: 'flex',
                                        alignSelf: 'center',
                                        width: { xs: 70, sm: 100 },
                                        height: { xs: 70, sm: 100 },
                                    }}
                                />
                            </Skeleton>
                            <Grid
                                item
                                container
                                alignItems="center"
                                ml={{ xs: 1.5, sm: 3 }}
                            >
                                <Grid item xs={12}>
                                    <Typography variant="h5">
                                        <Skeleton />
                                    </Typography>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{ mr: 2, width: '60%' }}
                                        >
                                            <Skeleton />
                                        </Typography>
                                        <Skeleton>
                                            <Chip size="small" label="test" />
                                        </Skeleton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            {list && <ListLoad />}
        </Container>
    );
};

export default Page;
