import React, { useEffect, useState } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    List,
    ListItemButton,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { RecipeIngredientSchema } from '../../../shared/schemas';
import InputBox from '../../../shared/layout/InputBox';
import useAxios from '../../../shared/hooks/useAxios';

const SelectIngredients = ({ data, btnMB = true, onBack, onNext }) => {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [lengthError, setLengthError] = useState(false);
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            ingredient: null,
            quantity: '',
            unit: '',
        },
        resolver: yupResolver(RecipeIngredientSchema),
    });
    const { axiosFetch, loading, error, popup } = useAxios();

    useEffect(() => {
        const getIngredients = async () => {
            const data = await axiosFetch({ url: '/ingredients/short' });

            setIngredients(data);
        };

        if (data.ingredients !== null) {
            setSelectedIngredients(data.ingredients);
        }

        getIngredients();
    }, [data, axiosFetch]);

    const handleAddIngredient = (data) => {
        setLengthError(false);
        setSelectedIngredients((old) => [...old, data]);

        handleClear();
    };

    const handleRemoveIngredient = (removeIndex) => {
        setSelectedIngredients((prevState) => [
            ...prevState.filter((item, index) => index !== removeIndex),
        ]);
    };

    const handleEditIngredient = (editIndex) => {
        const foundIngredient = selectedIngredients.filter(
            (ingredient, index) => index === editIndex
        )[0];

        handleRemoveIngredient(editIndex);

        reset(
            {
                ingredient: foundIngredient.ingredient,
                quantity: foundIngredient.quantity,
                unit: foundIngredient.unit,
            },
            { keepDefaultValues: true }
        );
    };

    const handleClear = () => {
        reset();
    };

    const handleFinish = async () => {
        if (selectedIngredients.length > 0) {
            setLengthError(false);

            if (data?._id) {
                await axiosFetch({
                    url: `/recipes/${data._id}`,
                    method: 'patch',
                    data: {
                        image: data.image instanceof File ? data.image : '',
                        title: data.title || '',
                        description: data.description || '',
                        category: data?.category?._id || '',
                        ingredients: selectedIngredients.map((el) => ({
                            ...el,
                            ingredient: el.ingredient._id,
                        })),
                    },
                    options: {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                });
            } else {
                await axiosFetch({
                    url: '/recipes',
                    method: 'post',
                    data: {
                        image: data.image || '',
                        title: data.title || '',
                        description: data.description || '',
                        category: data?.category?._id || '',
                        ingredients: selectedIngredients.map((el) => ({
                            ...el,
                            ingredient: el.ingredient._id,
                        })),
                    },
                    options: {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                });
            }

            setLengthError(true);
            if (!error) onNext({});
        }
    };

    return (
        <>
            {popup}
            <InputBox title="Ingredients">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="ingredient"
                            render={({
                                field: { value, onChange },
                                fieldState: { error },
                            }) => (
                                <Autocomplete
                                    value={value}
                                    options={ingredients}
                                    getOptionLabel={(option) => option.title}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Ingredient"
                                            variant="standard"
                                            fullWidth
                                            required
                                            error={error ? true : false}
                                            helperText={error?.message}
                                        />
                                    )}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id.localeCompare(value._id) ===
                                        0
                                    }
                                    onChange={(event, data) => onChange(data)}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Controller
                            control={control}
                            name="quantity"
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Quantity"
                                    required
                                    fullWidth
                                    type="number"
                                    variant="standard"
                                    error={error ? true : false}
                                    helperText={error?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Controller
                            control={control}
                            name="unit"
                            render={({ field, fieldState: { error } }) => (
                                <FormControl
                                    fullWidth
                                    variant="standard"
                                    required
                                    error={error ? true : false}
                                >
                                    <InputLabel id="categoryUnit">
                                        Unit
                                    </InputLabel>
                                    <Select
                                        {...field}
                                        labelId="categoryUnit"
                                        label="Unit"
                                    >
                                        <MenuItem value="">None</MenuItem>
                                        <MenuItem value="ml">ml</MenuItem>
                                        <MenuItem value="l">l</MenuItem>
                                        <MenuItem value="g">g</MenuItem>
                                        <MenuItem value="kg">kg</MenuItem>
                                    </Select>
                                    <FormHelperText>
                                        {error?.message}
                                    </FormHelperText>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleClear}
                        >
                            clear
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleSubmit(handleAddIngredient)}
                        >
                            add
                        </Button>
                    </Grid>
                </Grid>
            </InputBox>

            <InputBox title="Recipe ingredients">
                {lengthError && (
                    <Typography variant="body2" color="error" gutterBottom>
                        Recipe ingredients must not be empty.
                    </Typography>
                )}
                <List>
                    {selectedIngredients?.map((el, index) => (
                        <ListItemButton
                            key={index}
                            sx={{
                                borderRadius: 3,
                                mx: 1,
                                cursor: 'default',
                            }}
                            disableTouchRipple
                        >
                            <ListItemText
                                primary={`${el.quantity} ${el.unit} - ${el.ingredient.title}`}
                            />
                            <IconButton
                                edge="end"
                                aria-label="edit ingredient"
                                sx={{ mx: 1 }}
                                onClick={() => handleEditIngredient(index)}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="delete ingredient"
                                onClick={() => handleRemoveIngredient(index)}
                            >
                                <CloseIcon />
                            </IconButton>
                        </ListItemButton>
                    ))}
                </List>
            </InputBox>

            <Box
                display="flex"
                justifyContent="space-between"
                mb={btnMB ? 3 : 0}
            >
                <Button variant="outlined" onClick={onBack}>
                    Back
                </Button>
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    onClick={handleFinish}
                >
                    Finish
                </LoadingButton>
            </Box>
        </>
    );
};

export default SelectIngredients;
