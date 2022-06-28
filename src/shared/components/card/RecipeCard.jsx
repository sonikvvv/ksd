import React from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { Link } from 'react-router-dom';
import moment from 'moment';

import BadgeTooltip from '../badge/BadgeTooltip';
import useAuth from '../../hooks/useAuth';

const RecipeCard = ({ recipe = {} }) => {
    const formattedDate = moment(recipe?.dateCreated).format('D MMM YYYY');
    const { isAllowed } = useAuth();

    const reviewB = isAllowed('d', '/recipes') &&
        recipe.status !== 'approved' && (
            <Button
                component={Link}
                to={`/recipes/${recipe._id}/review`}
                variant="contained"
                startIcon={<ReviewsIcon />}
                sx={{ ml: 'auto' }}
            >
                Review
            </Button>
        );

    const seeB = (
        <Button
            component={Link}
            to={`/recipes/${recipe._id}`}
            variant="outlined"
            sx={{ ml: 'auto' }}
        >
            See more
        </Button>
    );

    return (
        <BadgeTooltip status={recipe?.status}>
            <Card sx={{ width: '100%' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={
                        recipe?.image?.url ||
                        'https://source.unsplash.com/random/?food'
                    }
                    alt="Recipe image"
                    sx={{
                        backgroundColor: 'background.paper',
                    }}
                ></CardMedia>
                <CardContent>
                    <Typography
                        variant="h5"
                        sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {recipe.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {recipe.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Typography variant="body2" color="text.secondary" pl={1}>
                        {recipe?.dateCreated && formattedDate}
                    </Typography>

                    {reviewB || seeB}
                </CardActions>
            </Card>
        </BadgeTooltip>
    );
};

export default RecipeCard;
