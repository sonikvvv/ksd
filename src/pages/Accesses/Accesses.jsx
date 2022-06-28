import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Container,
    Divider,
    List,
    ListItemButton,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

import PageHeader from '../../shared/layout/PageHeader';
import useAxios from '../../shared/hooks/useAxios';
import useAuth from '../../shared/hooks/useAuth';

const Accesses = () => {
    const [accesses, setAccesses] = useState([]);
    const { axiosFetch, popup } = useAxios();
    const { isAllowed } = useAuth();

    useEffect(() => {
        const getAccesses = async () => {
            const data = await axiosFetch({ url: '/access' });

            setAccesses(data);
        };

        getAccesses();
    }, [axiosFetch]);

    const button = isAllowed('c') ? (
        <Button
            component={Link}
            to="/access/new"
            variant="contained"
            startIcon={<AddIcon />}
        >
            Add
        </Button>
    ) : null;

    return (
        <Container maxWidth="lg" sx={{ pt: 1.5 }}>
            {popup}
            <PageHeader title="Accesses" button={button} />

            {accesses.length !== 0 ? (
                <Box my={3}>
                    <List component={Paper}>
                        {accesses.map((item, index) => (
                            <Box key={item._id}>
                                <ListItemButton
                                    component={Link}
                                    to={`/access/${item._id}`}
                                    sx={{ borderRadius: 2 }}
                                >
                                    <ListItemText primary={item.title} />
                                </ListItemButton>
                                {index < accesses.length - 1 && (
                                    <Divider variant="middle" />
                                )}
                            </Box>
                        ))}
                    </List>
                </Box>
            ) : (
                <Typography>There are no accesses.</Typography>
            )}
        </Container>
    );
};

export default Accesses;
