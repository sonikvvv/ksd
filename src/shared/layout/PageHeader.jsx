import React, { useState } from 'react';
import { Button, Grid, Menu, Paper, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const PageHeader = ({ title, menuContent = [], button }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const items = menuContent.filter((el) => el !== false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menu = (
        <>
            <Button
                variant="outlined"
                onClick={handleClick}
                startIcon={<MoreVertIcon />}
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
                    {menuContent}
                </Menu>
            </Paper>
        </>
    );

    return (
        <Grid container direction="row" alignItems="center" sx={{ my: 5 }}>
            <Grid item xs={items?.length > 0 || button ? 6 : 12}>
                <Typography variant="h4">{title}</Typography>
            </Grid>
            {items?.length > 0 && (
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    {menu}
                </Grid>
            )}
            {button && (
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    {button}
                </Grid>
            )}
        </Grid>
    );
};

export default PageHeader;
