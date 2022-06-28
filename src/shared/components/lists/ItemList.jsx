import React from 'react';
import {
    Box,
    Chip,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';

const ItemList = ({ items, chip, pathname, reload }) => {
    const { axiosFetch, error } = useAxios();
    const { isAllowed } = useAuth();

    const handleDelete = async (url) => {
        await axiosFetch({ url, method: 'delete' });

        if (!error) reload();
    };

    return (
        <List component={Paper}>
            {items?.map((item, index) => (
                <Box key={item._id}>
                    <ListItemButton
                        sx={{
                            borderRadius: 3,
                            mx: 1,
                            cursor: 'default',
                        }}
                        disableTouchRipple
                    >
                        <ListItemText>
                            <Box display="flex" flexWrap="wrap">
                                <Typography>{item.title}</Typography>
                                {chip && (
                                    <Chip
                                        label={item?.category?.title}
                                        variant="outlined"
                                        sx={{
                                            color: 'text.secondary',
                                            ml: { xs: 1, sm: 3 },
                                        }}
                                    />
                                )}
                            </Box>
                        </ListItemText>

                        {isAllowed('u') && (
                            <IconButton
                                component={Link}
                                to={`${pathname}/${item._id}/edit`}
                            >
                                <EditIcon />
                            </IconButton>
                        )}
                        {isAllowed('d') && (
                            <IconButton
                                onClick={() =>
                                    handleDelete(`${pathname}/${item._id}`)
                                }
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </ListItemButton>
                    {items.length - 1 !== index && <Divider variant="middle" />}
                </Box>
            ))}
        </List>
    );
};

export default ItemList;
