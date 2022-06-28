import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';

import StatisticsIcon from '../../shared/utils/StatisticsIcon';
import useAxios from '../../shared/hooks/useAxios';

const columns = [
    {
        field: 'title',
        headerName: 'Recipe',
        minWidth: 300,
        flex: 1,
        valueGetter: (params) => params.row.recipe.title,
    },
    {
        field: 'status',
        headerName: 'Status',
        minWidth: 110,
        flex: 1,
        valueGetter: (params) => params.row.recipe.status,
    },
    {
        field: 'deleted',
        headerName: 'Deleted',
        minWidth: 110,
        flex: 1,
        type: 'boolean',
        valueGetter: (params) => params.row.recipe.deleted,
    },
    {
        field: 'dateCreated',
        headerName: 'Date created',
        minWidth: 110,
        flex: 1,
        renderCell: (params) =>
            moment(params.row.recipe.dateCreated).format('D MMM YYYY'),
    },
    {
        field: 'value',
        headerName: 'Tendency',
        minWidth: 150,
        valueGetter: (params) => params.row.newValue - params.row.oldValue,
        // flex: 1,
        renderCell: (params) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {StatisticsIcon(params.row.newValue - params.row.oldValue)}
                {params.value}
            </Box>
        ),
        sortComparator: (v1, v2) => v1 - v2,
    },
];

const RecipesStatistics = () => {
    const [recipes, setRecipes] = useState([]);
    const [timePeriod, setTimePeriod] = useState(1);
    const { axiosFetch, loading, popup } = useAxios();

    useEffect(() => {
        const getWeek = async () => {
            let data = [];

            if (timePeriod === 1) {
                data = await axiosFetch({ url: '/statistics/week' });
            } else if (timePeriod === 2) {
                data = await axiosFetch({ url: '/statistics/month' });
            } else if (timePeriod === 3) {
                data = await axiosFetch({ url: '/statistics/months' });
            }

            setRecipes(data || []);
        };

        getWeek();
    }, [axiosFetch, timePeriod]);

    const handleTimePeriodChange = async (event) => {
        const value = event.target.value;
        setTimePeriod(value);
    };

    return (
        <Container maxWidth="lg" sx={{ pt: 1.5 }}>
            {popup}
            <Grid
                container
                direction="row"
                alignItems="center"
                sx={{
                    mb: 5,
                    display: 'flex',
                    alignItems: 'end',
                    justifyContent: 'end',
                }}
            >
                <Grid item xs={12} sm>
                    <Typography variant="h4">Statistics for recipes</Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={3}
                    md={3}
                    lg={2}
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        mt: {
                            xs: 3,
                        },
                    }}
                >
                    <FormControl fullWidth variant="standard">
                        <InputLabel id="select-period">Time period</InputLabel>
                        <Select
                            labelId="select-period"
                            value={timePeriod}
                            label="Time period"
                            onChange={handleTimePeriodChange}
                        >
                            <MenuItem value={1}>Week</MenuItem>
                            <MenuItem value={2}>Month</MenuItem>
                            <MenuItem value={3}>3 Months</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Box
                sx={{
                    display: 'flex',
                    height: '100%',
                    mb: 3,
                    '& .MuiDataGrid-columnHeaders': {
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
                        loading={loading}
                        columns={columns}
                        rows={recipes}
                        getRowId={(row) => row?.recipe?.title}
                        initialState={{
                            sorting: {
                                sortModel: [
                                    {
                                        field: 'value',
                                        sort: 'desc',
                                    },
                                ],
                            },
                            pagination: {
                                pageSize: 25,
                            },
                        }}
                    />
                </div>
            </Box>
        </Container>
    );
};

export default RecipesStatistics;
