import React, { useState } from 'react';
import { List, Typography } from '@mui/material';

import routes from '../../routes';
import NavigationListItem from './subcomponents/NavigationListItem';
import NavigationExpandableListItem from './subcomponents/NavigationExpandableListItem';
import useAuth from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const headerStyle = {
    fontWeight: 'bold',
    ml: 3,
    mt: 3,
    color: 'text.secondary',
};

const NavigationList = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const { isAllowed } = useAuth();
    const location = useLocation();

    useEffect(() => {
        setSelectedIndex(location.pathname);
    }, [location]);

    const handleListItemClick = (event, newValue) => {
        setSelectedIndex(newValue);
    };

    return (
        <>
            <Typography variant="overline" sx={headerStyle}>
                General
            </Typography>

            <List>
                <NavigationListItem
                    route={routes[0]}
                    index={routes[0].path}
                    selected={selectedIndex}
                    onClick={handleListItemClick}
                />

                {isAllowed('r', '/calculator') && (
                    <NavigationListItem
                        route={routes[1]}
                        index={routes[1].path}
                        selected={selectedIndex}
                        onClick={handleListItemClick}
                    />
                )}
            </List>

            {(isAllowed('r', '/recipes') || isAllowed('r', '/ingredients')) && (
                <>
                    <Typography variant="overline" sx={headerStyle}>
                        Recipes
                    </Typography>

                    <List>
                        {isAllowed('r', '/recipes') && (
                            <NavigationExpandableListItem
                                route={routes[2]}
                                index={routes[2].path}
                                selected={selectedIndex}
                                onClick={handleListItemClick}
                                permission={isAllowed('', '/recipes', true)}
                            />
                        )}

                        {isAllowed('r', '/ingredients') && (
                            <NavigationExpandableListItem
                                route={routes[3]}
                                index={routes[3].path}
                                selected={selectedIndex}
                                onClick={handleListItemClick}
                                permission={isAllowed('', '/ingredients', true)}
                            />
                        )}
                    </List>
                </>
            )}

            {(isAllowed('r', '/recipes/categories') ||
                isAllowed('r', '/ingredients/categories')) && (
                <>
                    <Typography variant="overline" sx={headerStyle}>
                        Categories
                    </Typography>

                    <List>
                        {isAllowed('r', '/recipes/categories') && (
                            <NavigationExpandableListItem
                                route={routes[4]}
                                index={routes[4].path}
                                selected={selectedIndex}
                                onClick={handleListItemClick}
                                permission={isAllowed(
                                    '',
                                    '/recipes/categories',
                                    true
                                )}
                            />
                        )}
                        {isAllowed('r', '/ingredients/categories') && (
                            <NavigationExpandableListItem
                                route={routes[5]}
                                index={routes[5].path}
                                selected={selectedIndex}
                                onClick={handleListItemClick}
                                permission={isAllowed(
                                    '',
                                    '/ingredients/categories',
                                    true
                                )}
                            />
                        )}
                    </List>
                </>
            )}

            {isAllowed('r', '/statistics') && (
                <>
                    <Typography variant="overline" sx={headerStyle}>
                        Statistics
                    </Typography>

                    <List>
                        <NavigationListItem
                            route={routes[6]}
                            index={routes[6].path}
                            selected={selectedIndex}
                            onClick={handleListItemClick}
                        />

                        <NavigationListItem
                            route={routes[7]}
                            index={routes[7].path}
                            selected={selectedIndex}
                            onClick={handleListItemClick}
                        />
                    </List>
                </>
            )}

            {isAllowed('r', '/users') && (
                <>
                    <Typography variant="overline" sx={headerStyle}>
                        Users
                    </Typography>

                    <List>
                        {isAllowed('r', '/users') && (
                            <>
                                <NavigationListItem
                                    route={routes[8]}
                                    index={routes[8].path}
                                    selected={selectedIndex}
                                    onClick={handleListItemClick}
                                />

                                <NavigationListItem
                                    route={routes[9]}
                                    index={routes[9].path}
                                    selected={selectedIndex}
                                    onClick={handleListItemClick}
                                />
                            </>
                        )}

                        {isAllowed('r', '/access') && (
                            <NavigationExpandableListItem
                                route={routes[10]}
                                index={routes[10].path}
                                selected={selectedIndex}
                                onClick={handleListItemClick}
                                permission={isAllowed('', '/access', true)}
                            />
                        )}

                        {isAllowed('u', '/users') && (
                            <NavigationListItem
                                route={routes[11]}
                                index={routes[11].path}
                                selected={selectedIndex}
                                onClick={handleListItemClick}
                            />
                        )}
                    </List>
                </>
            )}
        </>
    );
};

export default NavigationList;
