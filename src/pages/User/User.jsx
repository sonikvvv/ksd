import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Chip,
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Button,
    Menu,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyIcon from '@mui/icons-material/Key';
import TourIcon from '@mui/icons-material/Tour';
import { Link, useNavigate, useParams } from 'react-router-dom';

import UserDetails from '../../shared/components/grid/UserDetails';
import RecipeCard from '../../shared/components/card/RecipeCard';
import LabeledBlock from '../../shared/components/containers/LabeledBlock';
import useAxios from '../../shared/hooks/useAxios';
import useAuth from '../../shared/hooks/useAuth';
import DeleteUserModal from '../../shared/components/modals/DeleteUserModal';

const User = () => {
    const [user, setUser] = useState({});
    const params = useParams();
    const { axiosFetch, error, popup } = useAxios();
    const { user: loggedUser, isAllowed } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async (id) => {
            const userData = await axiosFetch({ url: `/users/${id}` });
            setUser(userData);
        };

        if (params?.id) {
            getUser(params.id);
        } else if (loggedUser?._id) {
            getUser(loggedUser._id);
        }
    }, [params, axiosFetch, loggedUser]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        await axiosFetch({
            url: `/users/${user._id}`,
            method: 'delete',
        });

        if (!error) navigate('/users');
    };

    const handleFlag = async () => {
        await axiosFetch({
            url: `/users/${user._id}/flag`,
        });

        if (!error) setUser((data) => ({ ...data, flag: true }));
    };

    const handleRemoveFlag = async () => {
        await axiosFetch({
            url: `/users/${user._id}/flag`,
            method: 'delete',
        });

        if (!error) setUser((data) => ({ ...data, flag: false }));
    };

    const changeAccessB = isAllowed('u', '/access') && (
        <MenuItem component={Link} to={`/users/${user?._id}/access/edit`}>
            <ListItemIcon>
                <KeyIcon />
            </ListItemIcon>
            <ListItemText>Change access</ListItemText>
        </MenuItem>
    );

    const flagB = !user?.flag && user?._id !== loggedUser?._id && (
        <MenuItem onClick={handleFlag}>
            <ListItemIcon>
                <TourIcon />
            </ListItemIcon>
            <ListItemText>Flag</ListItemText>
        </MenuItem>
    );

    const removeFlagB = isAllowed('d') && user?.flag && (
        <MenuItem onClick={handleRemoveFlag}>
            <ListItemIcon>
                <TourIcon />
            </ListItemIcon>
            <ListItemText>Remove flag</ListItemText>
        </MenuItem>
    );

    const deleteB = isAllowed('d') && (
        <DeleteUserModal onDelete={handleDelete} />
    );

    return (
        <Container maxWidth="lg" sx={{ pt: 1.5 }}>
            {popup}
            <Grid container direction="row" alignItems="center" sx={{ my: 5 }}>
                <Grid item xs={flagB || removeFlagB || deleteB ? 6 : 12}>
                    <Typography variant="h4">User</Typography>
                </Grid>

                {(flagB || removeFlagB || deleteB) && (
                    <Grid
                        item
                        container
                        spacing={3}
                        xs={6}
                        sx={{ display: 'flex', justifyContent: 'end' }}
                    >
                        <Button
                            variant="outlined"
                            onClick={handleClick}
                            startIcon={<MoreVertIcon />}
                            sx={{ mr: 3 }}
                        >
                            Actions
                        </Button>
                        <Paper>
                            <Menu
                                keepMounted
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                {changeAccessB}
                                {flagB}
                                {removeFlagB}
                            </Menu>
                        </Paper>

                        {deleteB}
                    </Grid>
                )}
            </Grid>

            <Box component={Paper}>
                <Box
                    sx={{
                        height: { xs: 200, sm: 300 },
                        width: '100%',
                        backgroundImage: `url(${
                            user?.bgImage ||
                            'https://source.unsplash.com/random/?land-scape'
                        })`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: 1,
                    }}
                />

                <Box p={3}>
                    <Grid container>
                        <Grid
                            item
                            xs={9}
                            sm={9}
                            sx={{
                                display: 'flex',
                            }}
                        >
                            <Avatar
                                alt="User avatar"
                                src={
                                    user?.image?.url ||
                                    'https://source.unsplash.com/random/?person'
                                }
                                sx={{
                                    display: 'flex',
                                    alignSelf: 'center',
                                    width: { xs: 70, sm: 100 },
                                    height: { xs: 70, sm: 100 },
                                }}
                            />
                            <Grid
                                item
                                container
                                alignItems="center"
                                ml={{ xs: 1.5, sm: 3 }}
                            >
                                <Grid item xs={12}>
                                    <Typography variant="h5">
                                        {user?.firstName} {user?.lastName}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Profession:
                                        <Chip
                                            size="small"
                                            label={user?.access?.title}
                                            sx={{
                                                textTransform: 'uppercase',
                                                ml: 1,
                                            }}
                                        />
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Box my={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={4}>
                        <UserDetails user={user} />
                        <Box my={3} />
                        <LabeledBlock
                            title="Description"
                            divider
                            contentPadding={{ p: 3 }}
                        >
                            <Typography variant="body1" color="text.secondary">
                                {user?.description
                                    ? user.description
                                    : 'There is no description.'}
                            </Typography>
                        </LabeledBlock>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <LabeledBlock
                            title="Created Recipes"
                            divider
                            contentPadding={{ p: 3 }}
                        >
                            <Grid container spacing={3}>
                                {user?.recipes?.length !== 0 ? (
                                    user?.recipes?.map((recipe, index) => (
                                        <Grid item key={index} xs={12} sm={6}>
                                            <RecipeCard recipe={recipe} />
                                        </Grid>
                                    ))
                                ) : (
                                    <Grid item xs={12} sm={6}>
                                        <Typography>
                                            There are no recipes created by this
                                            user.
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                        </LabeledBlock>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default User;
