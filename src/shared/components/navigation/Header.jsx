import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, AppBar, Box, Toolbar, Container, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

import NavigationList from './NavigationList';
import UserMenu from '../menu/UserMenu';
import Logo from './Logo';
import useAuth from '../../hooks/useAuth';

const drawerWidth = 258;

export default function ButtonAppBar(props) {
    const { window } = props;

    const { isLoggedIn } = useAuth();

    const [mobileOpen, setMobileOpen] = useState(false);

    const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

    const container =
        window !== undefined ? () => window().document.body : undefined;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerContent = (
        <>
            <Logo />
            <NavigationList />
        </>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                }}
            >
                <Toolbar
                    component={Container}
                    maxWidth="lg"
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 'auto', display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {isLoggedIn ? (
                        <UserMenu />
                    ) : (
                        <Button
                            component={Link}
                            to="/login"
                            variant="text"
                            startIcon={<LoginIcon />}
                            sx={{ color: '#fff' }}
                        >
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            >
                <Drawer
                    anchor="left"
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Offset />
                {props.children}
            </Box>
        </Box>
    );
}
