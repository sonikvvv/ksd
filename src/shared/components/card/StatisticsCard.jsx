import React from 'react';
import {
    Avatar,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';

import StatisticsIcon from '../../utils/StatisticsIcon';

const StatisticsCard = ({ data }) => {
    const value = data?.newValue - data?.oldValue;

    return (
        <Card>
            <CardMedia
                component="img"
                height="300"
                image={
                    data?.recipe?.image?.url ||
                    'https://source.unsplash.com/random/?ingredient'
                }
                alt="Recipe image"
                sx={{
                    backgroundColor: 'background.paper',
                }}
            />
            <CardContent
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {data?.recipe?.title}
                </Typography>
                <Avatar
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? grey[50]
                                : '#303030',
                    }}
                >
                    {StatisticsIcon(value)}
                </Avatar>
            </CardContent>
        </Card>
    );
};

export default StatisticsCard;
