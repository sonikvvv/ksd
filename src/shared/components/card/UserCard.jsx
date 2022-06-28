import { useTheme } from '@emotion/react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    Stack,
    Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
    const theme = useTheme();

    return (
        <Card>
            <CardMedia
                component="img"
                height="200"
                image={
                    user?.bgImage ||
                    'https://source.unsplash.com/random/?land-scape'
                }
                sx={{
                    height: { xs: 150 },
                }}
            />
            <CardContent
                sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    pt: { xs: '75px', sm: '85px' },
                    px: { xs: 1, sm: 3 },
                }}
            >
                <Avatar
                    src={
                        user?.image?.url ||
                        'https://source.unsplash.com/random/?person'
                    }
                    sx={{
                        backgroundColor: 'background.paper',
                        display: 'flex',
                        position: 'absolute',
                        width: 150,
                        height: 150,
                        top: '-75px',
                        alignSelf: 'center',
                        [theme.breakpoints.down('sm')]: {
                            width: 120,
                            height: 120,
                            top: '-60px',
                        },
                        borderWidth: 3,
                        borderStyle: 'solid',
                        borderColor: grey[300],
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        direction: 'column',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        variant="h5"
                        align="center"
                        gutterBottom
                        sx={{ width: '100%' }}
                    >
                        {user?.fullName}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                        gutterBottom
                        sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {user?.description ||
                            'This user does not have description.'}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                }}
            >
                <Button
                    component={Link}
                    to={`/users/${user._id}`}
                    variant="contained"
                    sx={{ px: 8, mb: { xs: 2 } }}
                >
                    Details
                </Button>
            </CardActions>
            <Box
                sx={{
                    [theme.breakpoints.down('sm')]: {
                        display: 'none',
                    },
                }}
            >
                <Divider variant="middle" sx={{ py: 1 }} />
                <Box
                    sx={{
                        px: { xs: 1, sm: 3 },
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={{ xs: 1, md: 3 }}
                        sx={{
                            my: 3,
                            display: 'flex',
                            justifyContent: 'space-around',
                        }}
                        divider={<Divider orientation="vertical" flexItem />}
                    >
                        <Box sx={{ textAlign: 'center', p: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                {user?.createdRecipes}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Recipes
                            </Typography>
                        </Box>

                        <Box sx={{ textAlign: 'center', p: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                {user?.access?.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Profession
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Card>
    );
};

export default UserCard;
