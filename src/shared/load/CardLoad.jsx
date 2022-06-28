import React from 'react';
import {
    CardContent,
    CardMedia,
    Skeleton,
    Typography,
    Card,
    CardActions,
    Grid,
} from '@mui/material';

const CardLoad = ({ image = true }) => {
    return (
        <Card sx={{ width: '100%' }}>
            {image && (
                <CardMedia
                    component={Skeleton}
                    variant="rectangular"
                    sx={{ height: 200, width: '100%' }}
                />
            )}
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    <Skeleton variant="text" />
                </Typography>

                <Typography variant="body2" mx={2} gutterBottom>
                    <Skeleton variant="text" />
                </Typography>
            </CardContent>
            <CardActions>
                <Grid
                    container
                    sx={{
                        alignItems: 'end',
                        justifyContent: 'space-between',
                        px: 2,
                    }}
                >
                    <Grid item xs={6}>
                        <Typography
                            variant="body2"
                            sx={{ width: '70%', mb: 1.5 }}
                        >
                            <Skeleton variant="text" />
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Skeleton variant="text" sx={{ width: '100%', p: 3 }} />
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
};

export default CardLoad;
