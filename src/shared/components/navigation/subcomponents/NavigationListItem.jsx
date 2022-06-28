import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const NavigationListItem = ({ route, selected, index, onClick }) => {
    return (
        <ListItemButton
            component={Link}
            to={route.path}
            selected={selected === index}
            onClick={(event) => onClick(event, index)}
            sx={{
                mx: 1.5,
                borderRadius: 2,
                '& .MuiListItemIcon-root, .MuiListItemText-root': selected ===
                    index && {
                    color: 'secondary.main',
                },
            }}
        >
            {route?.icon && (
                <ListItemIcon sx={{ minWidth: 40 }}>{route.icon}</ListItemIcon>
            )}
            <ListItemText primary={route.title} />
        </ListItemButton>
    );
};

export default NavigationListItem;
