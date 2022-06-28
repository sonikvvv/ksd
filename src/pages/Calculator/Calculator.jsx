import React, { useEffect, useState } from 'react';
import {
    Autocomplete,
    Container,
    Divider,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { CalculatorSchema } from '../../shared/schemas';
import PageHeader from '../../shared/layout/PageHeader';
import InputBox from '../../shared/layout/InputBox';
import CheckList from '../../shared/components/lists/CheckList';
import useAxios from '../../shared/hooks/useAxios';

const Calculator = () => {
    const [recipes, setRecipes] = useState([]);
    const [calculatedRecipe, setCalculatedRecipe] = useState([]);
    const { axiosFetch, loading, popup } = useAxios();

    const { control, handleSubmit } = useForm({
        defaultValues: {
            recipe: null,
            servings: 1,
        },
        resolver: yupResolver(CalculatorSchema),
    });

    useEffect(() => {
        const getRecipes = async () => {
            const data = await axiosFetch({ url: '/recipes/short' });

            setRecipes(data);
        };

        getRecipes();
    }, [axiosFetch]);

    const handleCalculate = async (data) => {
        const calculatedData = await axiosFetch({
            url: '/calculator',
            method: 'post',
            data: {
                calculate: {
                    recipe: data.recipe._id,
                    servings: data.servings,
                },
            },
        });

        setCalculatedRecipe(calculatedData.ingredients);
    };

    return (
        <Container maxWidth="lg" sx={{ pt: 1.5 }}>
            {popup}
            <PageHeader title="Calculator" />

            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6} lg={4}>
                    <Controller
                        control={control}
                        name="recipe"
                        render={({
                            field: { value, onChange },
                            fieldState: { error },
                        }) => (
                            <Autocomplete
                                value={value}
                                options={recipes}
                                getOptionLabel={(option) => option.title}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Recipe"
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
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <Controller
                        control={control}
                        name="servings"
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                variant="standard"
                                type="number"
                                label="Servings"
                                error={error ? true : false}
                                helperText={error?.message}
                                required
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    lg={3}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <LoadingButton
                        loading={loading}
                        color="primary"
                        variant="contained"
                        fullWidth
                        onClick={handleSubmit(handleCalculate)}
                    >
                        Calculate
                    </LoadingButton>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
            </Grid>

            <InputBox title="Calculated recipe" bigContent>
                {calculatedRecipe.length !== 0 ? (
                    <CheckList ingredients={calculatedRecipe} />
                ) : (
                    <Typography variant="body1">
                        First select a recipe, adjust the number of servings and
                        press the 'Calculate' button.
                    </Typography>
                )}
            </InputBox>
        </Container>
    );
};

export default Calculator;
