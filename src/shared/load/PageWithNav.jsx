import React from 'react';
import { Container, Grid, Skeleton, useMediaQuery } from '@mui/material';

import ListLoad from './ListLoad';
import CardLoad from './CardLoad';

const PageWithNav = () => {
    const matches = useMediaQuery((theme) => theme.breakpoints.down('md'));
    return (
        <Container maxWidth="xl">
            <Grid container spacing={1.5} sx={{ height: '100vh' }}>
                {!matches && (
                    <Grid item xs={3}>
                        <Skeleton variant="text" sx={{ height: 70 }} />
                        <ListLoad items={17} spacing={0.5} />
                    </Grid>
                )}
                <Grid item container spacing={1} xs={matches ? 12 : 9}>
                    <Grid item xs={12}>
                        <Skeleton sx={{ height: 70 }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1.5}>
                            <Grid item xs={12}>
                                <Skeleton
                                    variant="text"
                                    sx={{
                                        height: 55,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={4}>
                                <CardLoad />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={4}>
                                <CardLoad />
                            </Grid>
                            {!matches && (
                                <>
                                    <Grid item xs={12} sm={6} lg={4}>
                                        <CardLoad />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={4}>
                                        <CardLoad image={false} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={4}>
                                        <CardLoad image={false} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={4}>
                                        <CardLoad image={false} />
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PageWithNav;
