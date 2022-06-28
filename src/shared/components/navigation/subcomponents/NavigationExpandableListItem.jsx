import React, { useState } from 'react';
import {
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import NavigationListItem from './NavigationListItem';

const NavigationExpandableListItem = ({
    route,
    selected,
    onClick,
    permission,
}) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((old) => !old);
    };

    return (
        <>
            <ListItemButton
                onClick={handleClick}
                sx={{
                    mx: 1.5,
                    borderRadius: 2,
                    '& .MuiListItemIcon-root, .MuiListItemText-root':
                        selected?.localeCompare(permission.path) === 0 && {
                            color: 'secondary.main',
                        },
                }}
            >
                <ListItemIcon sx={{ minWidth: 40 }}>{route.icon}</ListItemIcon>
                <ListItemText primary={route.title} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List
                    component="div"
                    disablePadding
                    sx={{
                        mx: 1,
                    }}
                >
                    {route.subpages.map((el, number) => {
                        if (!permission) return null;

                        return (
                            permission?.crud?.includes(el.crud) && (
                                <NavigationListItem
                                    route={{
                                        ...el,
                                        path: route.path + el.path,
                                    }}
                                    key={number}
                                    index={route.path + el.path}
                                    selected={selected}
                                    onClick={onClick}
                                />
                            )
                        );
                    })}
                </List>
            </Collapse>
        </>
    );
};

export default NavigationExpandableListItem;
