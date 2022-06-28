import React, { useEffect, useState } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { grey } from '@mui/material/colors';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import PageHeader from '../../shared/layout/PageHeader';
import InputBox from '../../shared/layout/InputBox';
import { StatisticsSchema, CalculatorSchema } from '../../shared/schemas';
import useAxios from '../../shared/hooks/useAxios';

const EditStatistics = () => {
    const [statistics, setStatistics] = useState({});
    const [statRecipes, setStatRecipes] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [lengthError, setLengthError] = useState(false);

    const {
        control: dateControl,
        handleSubmit: handleDateSubmit,
        watch,
    } = useForm({
        defaultValues: {
            date: moment(),
        },
        resolver: yupResolver(StatisticsSchema),
    });

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            recipe: null,
            servings: 1,
        },
        resolver: yupResolver(CalculatorSchema),
    });
    const { axiosFetch, loading, popup } = useAxios();

    watch(() => {
        setStatRecipes([]);
    });

    useEffect(() => {
        const getData = async () => {
            const recipesData = await axiosFetch({
                url: '/statistics/recipes',
            });
            setRecipes(recipesData);
        };

        getData();
    }, [axiosFetch]);

    const handleLoad = async (data) => {
        const dateId = await axiosFetch({
            url: '/statistics/date',
            method: 'post',
            data: {
                date: moment(data.date).format('YYYY-MM-DD'),
            },
        });

        if (dateId) {
            const statisticsData = await axiosFetch({
                url: `/statistics/${dateId?._id}`,
            });
            setStatistics(statisticsData);
            setStatRecipes(statisticsData.recipes);
        }
    };

    const handleAdd = (data) => {
        setLengthError(false);

        setStatRecipes((old) => [
            ...old,
            { recipe: data.recipe, value: data.servings },
        ]);

        handleClear();
    };

    const handleEditClick = (id) => {
        const statistic = handleDeleteClick(id, true);

        reset(
            { recipe: statistic.recipe, servings: statistic.value },
            { keepDefaultValues: true }
        );
    };

    const handleDeleteClick = (id, ret = false) => {
        let foundStatistic = statRecipes?.filter(
            (statistic) => statistic.recipe._id === id
        )[0];

        setStatRecipes((old) =>
            old.filter((statistic) => statistic.recipe._id !== id)
        );

        if (ret) {
            return foundStatistic;
        }
    };

    const handleClear = () => {
        reset();
    };

    const handleSave = async () => {
        if (statRecipes.length > 0) {
            setLengthError(false);
            await axiosFetch({
                url: `/statistics/${statistics._id}`,
                method: 'patch',
                data: {
                    statistic: {
                        recipes: statRecipes.map((el) => ({
                            recipe: el.recipe._id,
                            value: el.value,
                        })),
                    },
                },
            });
        }

        if (statRecipes.length === 0) {
            setLengthError(true);
        }
    };

    const cols = [
        {
            field: 'title',
            headerName: 'Recipe',
            minWidth: 300,
            flex: 1,
            valueGetter: (params) => params.row.recipe.title,
        },
        {
            field: 'value',
            headerName: 'Value',
            minWidth: 100,
            flex: 1,
            valueGetter: (params) => params.row.value,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            minWidth: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    onClick={() => handleEditClick(id)}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => handleDeleteClick(id)}
                />,
            ],
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ pt: 1.5 }}>
            {popup}
            <PageHeader title="Edit statistics" />

            <InputBox title="Date">
                <Controller
                    control={dateControl}
                    name="date"
                    render={({ field, fieldState: { error } }) => (
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                label="Date"
                                {...field}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        variant="standard"
                                        error={error ? true : false}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    )}
                />

                <Box display="flex" justifyContent="end" mt={3}>
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        onClick={handleDateSubmit(handleLoad)}
                    >
                        Load
                    </LoadingButton>
                </Box>
            </InputBox>

            <InputBox title="Edit recipe statistics">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
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
                                        option._id.localeCompare(value._id) ===
                                        0
                                    }
                                    onChange={(event, data) => onChange(data)}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            control={control}
                            name="servings"
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    variant="standard"
                                    type="number"
                                    label="Value"
                                    error={error ? true : false}
                                    helperText={error?.message}
                                    required
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleClear}
                        >
                            clear
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleSubmit(handleAdd)}
                        >
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </InputBox>

            <InputBox title="Statistics" bigContent>
                {lengthError && (
                    <Typography variant="body2" color="error" gutterBottom>
                        Statistics table must not be empty.
                    </Typography>
                )}
                <Box
                    sx={{
                        display: 'flex',
                        height: '100%',
                        mt: 3,
                        '& .MuiDataGrid-columnHeader': {
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? grey['A100']
                                    : grey[900],
                        },
                    }}
                >
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            autoHeight
                            columns={cols}
                            rows={statRecipes}
                            getRowId={(row) => row?.recipe?._id}
                        />
                    </div>
                </Box>
            </InputBox>

            <Box my={3} display="flex" justifyContent="end">
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    onClick={handleSave}
                >
                    Save
                </LoadingButton>
            </Box>
        </Container>
    );
};

export default EditStatistics;
