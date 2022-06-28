import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link, useLocation } from 'react-router-dom';

import PageHeader from '../../shared/layout/PageHeader';
import useAxios from '../../shared/hooks/useAxios';
import ItemList from '../../shared/components/lists/ItemList';
import useAuth from '../../shared/hooks/useAuth';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [reload, setReload] = useState(0);
    const location = useLocation();
    const { axiosFetch, popup } = useAxios();
    const { isAllowed } = useAuth();

    useEffect(() => {
        const getCategories = async () => {
            const data = await axiosFetch({
                url: location.pathname,
            });

            if (data) setCategories(data);
        };

        getCategories();
    }, [axiosFetch, location, reload]);

    const handleReload = () => {
        setReload((old) => old + 1);
    };

    const button = isAllowed('c') && (
        <Button
            component={Link}
            to={`${location.pathname}/new`}
            variant="contained"
            startIcon={<AddIcon />}
        >
            Add
        </Button>
    );

    return (
        <Container maxWidth="lg" sx={{ pt: 1.5 }}>
            {popup}
            <PageHeader
                title={`${
                    location.pathname.includes('recipe')
                        ? 'Recipe'
                        : 'Ingredients'
                } categories`}
                button={button}
            />
            {categories.length !== 0 ? (
                <Box mb={5}>
                    <ItemList
                        items={categories}
                        pathname={location.pathname}
                        reload={handleReload}
                    />
                </Box>
            ) : (
                <Typography>There are no categories.</Typography>
            )}
        </Container>
    );
};

export default Categories;
