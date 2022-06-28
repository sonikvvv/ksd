import React, { useEffect, useState } from 'react';
import {
    Button,
    Container,
    Grid,
    Pagination,
    Typography,
    useMediaQuery,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import ItemList from '../../shared/components/lists/ItemList';
import Search from '../../shared/components/inputs/Search';
import useAxios from '../../shared/hooks/useAxios';
import CategoriesProvider from '../../shared/providers/CategoriesProvider';
import useAuth from '../../shared/hooks/useAuth';

const Ingredients = () => {
    const [ingredients, setIngredients] = useState([]);
    const [page, setPage] = useState(0);
    const [reload, setReload] = useState(0);
    const [pageCount, setPageCount] = useState(10);
    const [showSearch, setShowSearch] = useState(false);
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const { axiosFetch, popup } = useAxios();
    const [search, setSearch] = useState({});
    const { isAllowed } = useAuth();

    useEffect(() => {
        const getIngredients = async () => {
            const data = await axiosFetch({
                url: '/ingredients/search',
                method: 'post',
                data: {
                    search,
                    page: {
                        page: page,
                        pageCount: 10,
                    },
                },
            });

            setIngredients(data?.ingredients);
            setPageCount(data?.pages === 1 ? 1 : data?.pages);
        };

        getIngredients();
    }, [axiosFetch, reload, search, page]);

    const handleReload = () => {
        setReload((old) => old + 1);
    };

    const handlePageChange = (event, value) => {
        setPage(value - 1);
    };

    const handleSearch = (data) => {
        setSearch(data);
        setPage(0);
    };

    const handleShowSearch = () => {
        setShowSearch((old) => !old);
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
                        <Typography variant="h4">Ingredients</Typography>
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
                                to="/ingredients/new"
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
                            <Search
                                onSearch={handleSearch}
                                variant="ingredient"
                            />
                        )}
                    </Grid>
                </Grid>

                {ingredients?.length !== 0 ? (
                    <ItemList
                        items={ingredients}
                        chip
                        pathname="/ingredients"
                        reload={handleReload}
                    />
                ) : (
                    <Typography>There are no ingredients.</Typography>
                )}

                {ingredients?.length !== 0 && (
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

export default Ingredients;
