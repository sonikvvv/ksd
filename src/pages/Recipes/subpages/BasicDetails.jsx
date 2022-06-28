import React, { useEffect, useState } from 'react';
import {
    Autocomplete,
    Button,
    Input,
    TextField,
    Box,
    Typography,
    Avatar,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { RecipeSchema } from '../../../shared/schemas';
import InputBox from '../../../shared/layout/InputBox';
import AddFiles from '../../../shared/assets/img/background/addFiles.svg';
import useAxios from '../../../shared/hooks/useAxios';

const BasicDetails = ({ data, btnMB = true, onNext }) => {
    const [imagePrevue, setImagePrevue] = useState(null);
    const [recipeCategories, setRecipeCategories] = useState([]);
    const { control, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            image: null,
            title: '',
            description: '',
            category: null,
        },
        resolver: yupResolver(RecipeSchema),
    });
    const { axiosFetch, popup } = useAxios();

    useEffect(() => {
        const getRecipeCategories = async () => {
            const data = await axiosFetch({ url: '/recipes/categories' });

            setRecipeCategories(data);
        };

        getRecipeCategories();
        reset(data);
    }, [data, reset, axiosFetch]);

    const image = watch('image');

    useEffect(() => {
        if (image instanceof File) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImagePrevue(reader.result);
            };

            reader.readAsDataURL(image);
        }
    }, [image]);

    const onSubmit = (data) => {
        onNext(data);
    };

    return (
        <>
            {popup}
            <InputBox title="Image">
                <Avatar
                    src={imagePrevue || data?.image?.url || AddFiles}
                    variant="rounded"
                    alt="Recipe image."
                    sx={{
                        width: '100%',
                        height: 350,
                        border: '1px solid rgba(0, 0, 0, .1)',
                    }}
                />

                <Box
                    sx={{
                        mt: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyItems: 'center',
                    }}
                >
                    <Controller
                        control={control}
                        name="image"
                        render={({
                            field: { name, onBlur, ref, onChange },
                            fieldState: { error },
                        }) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'end',
                                    }}
                                >
                                    <label htmlFor="contained-button-file">
                                        <Input
                                            name={name}
                                            onBlur={onBlur}
                                            ref={ref}
                                            accept="image/*"
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            onChange={(e) => {
                                                onChange(e.target.files[0]);
                                            }}
                                            sx={{
                                                display: 'none',
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            component="span"
                                        >
                                            Upload
                                        </Button>
                                    </label>
                                </Box>
                                {error && (
                                    <Typography
                                        variant="body2"
                                        color="error"
                                        mt={3}
                                    >
                                        {error.message}
                                    </Typography>
                                )}
                            </Box>
                        )}
                    />
                </Box>
            </InputBox>

            <InputBox title="Title">
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

            <InputBox title="Description">
                <Controller
                    control={control}
                    name="description"
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            label="Description"
                            fullWidth
                            multiline
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
                            options={recipeCategories}
                            getOptionLabel={(el) => el.title}
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

            <Box display="flex" justifyContent="end" mb={btnMB ? 3 : 0}>
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                    Next
                </Button>
            </Box>
        </>
    );
};

export default BasicDetails;
