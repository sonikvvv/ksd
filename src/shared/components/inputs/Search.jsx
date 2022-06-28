import React, { useContext } from 'react';
import { Autocomplete, Box, Button, Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { yupResolver } from '@hookform/resolvers/yup';

import { SearchSchema } from '../../schemas';
import CategoriesContext from '../../contexts/CategoriesContext';

const Search = ({ onSearch }) => {
    const { categories } = useContext(CategoriesContext);
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            category: null,
        },
        resolver: yupResolver(SearchSchema),
    });

    const onSubmit = (data) => {
        if (data.title.length > 0 || data.category !== null) {
            onSearch({
                title: data.title || '',
                category: data.category?._id || '',
            });
        }
    };

    const handleClear = () => {
        reset();

        onSearch({});
    };

    return (
        <Box
            sx={{
                width: '100%',
                mt: 6,
            }}
        >
            <Grid container direction="row" alignItems="end" spacing={3}>
                <Grid item xs={12} sm={6} lg>
                    <Controller
                        control={control}
                        name="title"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Title"
                                fullWidth
                                type="text"
                                variant="standard"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg>
                    <Controller
                        control={control}
                        name="category"
                        render={({
                            field: { value, onChange },
                            fieldState: { error },
                        }) => (
                            <Autocomplete
                                value={value}
                                options={categories}
                                getOptionLabel={(option) => option.title}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Category"
                                        variant="standard"
                                        fullWidth
                                        error={error ? true : false}
                                        helperText={error?.message}
                                    />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                    option._id.localeCompare(value._id) === 0
                                }
                                onChange={(event, data) => onChange(data)}
                            />
                        )}
                    />
                </Grid>
                <Grid
                    item
                    container
                    xs={12}
                    lg={4}
                    spacing={3}
                    direction="row"
                    justifyContent="flex-end"
                >
                    <Grid item xs>
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<CloseIcon />}
                            onClick={handleClear}
                        >
                            Clear
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <Button
                            variant="contained"
                            fullWidth
                            startIcon={<SearchIcon />}
                            onClick={handleSubmit(onSubmit)}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Search;
