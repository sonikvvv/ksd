import React from 'react';
import {
    Grid,
    Skeleton,
    Typography,
    Container,
    useMediaQuery,
} from '@mui/material';

import CardLoad from './CardLoad';
import ListLoad from './ListLoad';

const Pages = ({ subheader, list, card }) => {
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const cards = [];
    const limit = matches ? 2 : 3;

    for (let index = 0; index < limit; index++) {
        cards.push(
            <Grid item key={index} xs={12} sm={6} lg={4}>
                <CardLoad />
            </Grid>
        );
    }

    const renderedCards = (
        <Grid container spacing={3} mb={3}>
            {cards}
        </Grid>
    );

    return (
        <Container maxWidth="lg">
            <Typography variant="h2" mt={5} mb={subheader ? 1 : 5}>
                <Skeleton />
            </Typography>
            {subheader && (
                <Typography variant="subtitle1" mb={5}>
                    <Skeleton />
                </Typography>
            )}

            {card && renderedCards}
            {list && <ListLoad />}
        </Container>
    );
};

export default Pages;
