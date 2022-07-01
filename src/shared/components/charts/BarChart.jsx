import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Chart as ChartComponent } from 'react-chartjs-2';
import { Box, Divider, Paper, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import moment from 'moment';
import { useTheme } from '@emotion/react';

Chart.register();
//     LinearScale,
//     CategoryScale,
//     BarElement,
//     PointElement,
//     LineElement,
//     Legend,
//     Tooltip
// );

const defaultOptions = {
    responsive: true,
    scales: {},
    plugins: {
        tooltip: {
            callbacks: {
                title: (context) => context[0]?.label?.replaceAll(',', ' '),
            },
        },
    },
};

const BarChart = ({ options = defaultOptions, data = [], title, subtitle }) => {
    const [barData, setBarData] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        setBarData(data || []);
    }, [data]);

    if (theme.palette.mode === 'dark') {
        options.scales = {
            y: {
                ticks: {
                    color: theme.palette.text.secondary,
                },
                grid: {
                    color: grey[800],
                },
            },
            x: {
                ticks: {
                    color: theme.palette.text.secondary,
                },
                grid: {
                    color: grey[800],
                },
            },
        };
        options.plugins['legend'] = {
            labels: { color: theme.palette.text.secondary },
        };
    }

    return (
        <Box component={Paper} sx={{ width: '100%' }}>
            <Box p={3}>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {moment(subtitle).format('D MMM')}
                </Typography>
            </Box>
            <Divider />
            <Box
                p={3}
                sx={{
                    width: '100%',
                    '& canvas': {
                        width: '100% !important',
                    },
                }}
            >
                <ChartComponent
                    type="bar"
                    options={options}
                    data={{
                        labels: [
                            ...barData?.map((item) => {
                                const title = item?.recipe?.title;

                                return title?.length > 20
                                    ? title?.split(' ')
                                    : title;
                            }),
                        ],
                        datasets: [
                            {
                                type: 'line',
                                label: 'Old value',
                                borderWidth: 2,
                                fill: false,
                                data: barData?.map((item) => item?.oldValue),
                                borderColor:
                                    theme.palette.mode === 'light'
                                        ? theme.palette.secondary.light
                                        : theme.palette.secondary.dark,
                                backgroundColor:
                                    theme.palette.mode === 'light'
                                        ? theme.palette.secondary.light
                                        : theme.palette.secondary.dark,
                            },
                            {
                                type: 'bar',
                                label: 'New value',
                                data: barData?.map((item) => item?.newValue),
                                backgroundColor:
                                    theme.palette.mode === 'light'
                                        ? theme.palette.primary.light
                                        : theme.palette.primary.dark,
                            },
                        ],
                    }}
                />
            </Box>
        </Box>
    );
};

export default BarChart;
