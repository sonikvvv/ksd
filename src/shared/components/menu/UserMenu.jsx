import React, { useState } from 'react';
import {
    Avatar,
    Box,
    Divider,
    Grid,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import useLogout from '../../hooks/useLogout';

const UserMenu = () => {
    const [open, setOpen] = useState(false);
    const { user } = useAuth();
    const logout = useLogout();

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <IconButton size="large" onClick={handleOpen} color="inherit">
                <Avatar
                    alt="User avatar"
                    src={
                        user?.image?.url ||
                        'https://source.unsplash.com/random/?person'
                    }
                />
            </IconButton>
            <Paper>
                <Menu
                    id="user-menu"
                    anchorEl={open}
                    keepMounted
                    open={Boolean(open)}
                    onClose={handleClose}
                >
                    <Box sx={{ width: 300, px: 2, py: 2, display: 'flex' }}>
                        <Avatar
                            alt="User avatar"
                            src={
                                user?.image?.url ||
                                'https://source.unsplash.com/random/?person'
                            }
                            sx={{ width: 50, height: 50 }}
                        />
                        <Grid container ml={2}>
                            <Grid item xs={12}>
                                <Typography>
                                    {user.firstName} {user.lastName}
                                </Typography>
                            </Grid>
                            {user?.access?.title && (
                                <Grid item xs={12}>
                                    <Typography
                                        variant="subtitle1"
                                        color="text.secondary"
                                    >
                                        {user.access.title}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                    <Divider />
                    <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to={`/users/profile`}
                        sx={{ mt: 1 }}
                    >
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to={`/users/settings`}
                    >
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText>Settings</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </MenuItem>
                </Menu>
            </Paper>
        </>
    );
};

export default UserMenu;
