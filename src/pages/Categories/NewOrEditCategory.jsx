import React, { useEffect } from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { CategorySchema } from '../../shared/schemas';
import PageHeader from '../../shared/layout/PageHeader';
import InputBox from '../../shared/layout/InputBox';
import useAxios from '../../shared/hooks/useAxios';

const NewOrEditCategory = () => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
        },
        resolver: yupResolver(CategorySchema),
    });
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const { axiosFetch, loading, error, popup } = useAxios();

    useEffect(() => {
        const getCategory = async () => {
            const data = await axiosFetch({
                url: `${location.pathname.replace('/edit', '')}`,
            });

            reset({ title: data.title });
        };

        if (params?.id) {
            getCategory();
        }
    }, [axiosFetch, location, params, reset]);

    const handleCreate = async (data) => {
        if (params?.id) {
            await axiosFetch({
                url: `${location.pathname.replace('/edit', '')}`,
                method: 'patch',
                data: {
                    category: {
                        title: data.title,
                    },
                },
            });
        } else {
            await axiosFetch({
                url: `${location.pathname.replace('/new', '')}`,
                method: 'post',
                data: {
                    category: {
                        title: data.title,
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
                    params?.id ? 'Update a category' : 'Create a new category'
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
                            type="text"
                            variant="standard"
                            error={error ? true : false}
                            helperText={error?.message}
                            required
                            fullWidth
                        />
                    )}
                />
            </InputBox>

            <Box sx={{ textAlign: 'right' }} my={3}>
                <Button
                    variant="outlined"
                    sx={{ mx: 2 }}
                    onClick={() => navigate(-1)}
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

export default NewOrEditCategory;
