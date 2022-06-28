import React from 'react';
import { Skeleton, Stack, Typography } from '@mui/material';

const ListLoad = ({ items = 10, spacing = 1 }) => {
    const list = [];

    for (let index = 0; index < items; index++) {
        list.push(
            <Typography key={index} variant="body1">
                <Skeleton height={35} />
            </Typography>
        );
    }

    return <Stack spacing={spacing}>{list}</Stack>;
};

export default ListLoad;
