import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Container, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { IngredientSchema } from '../../shared/schemas';
import PageHeader from '../../shared/layout/PageHeader';
import InputBox from '../../shared/layout/InputBox';
import useAxios from '../../shared/hooks/useAxios';

const NewOrEditIngredient = () => {
    const [categories, setCategories] = useState([]);
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            category: null,
        },
        resolver: yupResolver(IngredientSchema),
    });
    const { axiosFetch, loading, error, popup } = useAxios();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getIngredient = async () => {
            const data = await axiosFetch({ url: `/ingredients/${params.id}` });

            reset(data);
        };

        const getCategories = async () => {
            const data = await axiosFetch({ url: '/ingredients/categories' });

            setCategories(data);
        };

        getCategories();
        if (params?.id) getIngredient();
    }, [axiosFetch, params, reset]);

    const handleCreate = async (data) => {
        if (params?.id) {
            await axiosFetch({
                url: `/ingredients/${params.id}`,
                method: 'patch',
                data: {
                    ingredient: {
                        title: data.title,
                        category: data.category._id,
                    },
                },
            });
        } else {
            await axiosFetch({
                url: '/ingredients',
                method: 'post',
                data: {
                    ingredient: {
                        title: data.title,
                        category: data.category._id,
                    },
                },
            });
        }

        if (!error) navigate(-1);
    };

    return (
        <Container maxWidth="lg" sx={{ pt: 1.5 }}>
            {popup}
            <PageHeader
                title={
                    params?.id
                        ? 'Update a ingredient'
                        : 'Create a new ingredient'
                }
            />

            <InputBox title="Basic details">
                <Controller
                    control={control}
                    name="title"
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            label="Title"
                            required
                            fullWidth
                            type="text"
                            variant="standard"
                            error={error ? true : false}
                            helperText={error?.message}
                        />
                    )}
                />
            </InputBox>

            <InputBox title="Category">
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
                                    required
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
            </InputBox>

            <Box sx={{ textAlign: 'right', mb: 3 }}>
                <Button
                    variant="outlined"
                    component={Link}
                    to="/ingredients"
                    sx={{ mx: 2 }}
                >
                    Back
                </Button>
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    onClick={handleSubmit(handleCreate)}
                >
                    Save
                </LoadingButton>
            </Box>
        </Container>
    );
};

export default NewOrEditIngredient;
