import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Pagination, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Link, useLocation } from 'react-router-dom';

import RecipeCard from '../../shared/components/card/RecipeCard';
import Search from '../../shared/components/inputs/Search';
import useAxios from '../../shared/hooks/useAxios';
import CategoriesProvider from '../../shared/providers/CategoriesProvider';
import useAuth from '../../shared/hooks/useAuth';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(10);
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const { axiosFetch, popup } = useAxios();
    const location = useLocation();
    const status =
        location.pathname.split('/').length === 2
            ? 'approved'
            : location.pathname.split('/')[2];
    const [search, setSearch] = useState({});
    const { isAllowed } = useAuth();

    useEffect(() => {
        const getRecipes = async () => {
            const data = await axiosFetch({
                url: '/recipes/search',
                method: 'post',
                data: {
                    status,
                    search,
                    page: {
                        page: page,
                        pageCount: 12,
                    },
                },
            });

            setRecipes(data?.recipes);
            setPageCount(data?.pages === 1 ? 1 : data?.pages);
        };

        getRecipes();
    }, [axiosFetch, status, search, page]);

    const handleSearch = (data) => {
        setSearch(data);
        setPage(0);
    };

    const handleShowSearch = () => {
        setShowSearch((old) => !old);
    };

    const handlePageChange = (event, value) => {
        setPage(value - 1);
    };

    return (
        <CategoriesProvider>
            <Container maxWidth="lg" sx={{ pt: 1.5 }}>
                {popup}
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    sx={{ my: 5 }}
                >
                    <Grid item xs={6} sm>
                        <Typography variant="h4">Recipes</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'center',
                            mt: { xs: 3, sm: 0 },
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={handleShowSearch}
                            fullWidth={matches}
                            endIcon={
                                showSearch ? (
                                    <ExpandLessIcon />
                                ) : (
                                    <ExpandMoreIcon />
                                )
                            }
                        >
                            Search
                        </Button>
                        {isAllowed('c') && (
                            <Button
                                component={Link}
                                to="/recipes/new"
                                variant="contained"
                                fullWidth={matches}
                                startIcon={<AddIcon />}
                                sx={{ ml: 3 }}
                            >
                                Add
                            </Button>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        {showSearch && (
                            <Search onSearch={handleSearch} variant="recipe" />
                        )}
                    </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                    {recipes?.length !== 0 ? (
                        recipes?.map((recipe, index) => (
                            <Grid item key={index} xs={12} sm={6} lg={4}>
                                <RecipeCard recipe={recipe} />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Typography>There are no recipes.</Typography>
                        </Grid>
                    )}
                </Grid>

                {recipes?.length !== 0 && (
                    <Grid container my={3}>
                        <Grid
                            item
                            xs={12}
                            display="flex"
                            justifyContent="center"
                        >
                            <Pagination
                                count={pageCount}
                                page={page + 1}
                                color="primary"
                                size={matches ? 'small' : 'medium'}
                                onChange={handlePageChange}
                            />
                        </Grid>
                    </Grid>
                )}
            </Container>
        </CategoriesProvider>
    );
};

export default Recipes;
