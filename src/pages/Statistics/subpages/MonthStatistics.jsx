import React, { useEffect, useState } from 'react';
import {
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Box,
    Typography,
} from '@mui/material';

import BarChart from '../../../shared/components/charts/BarChart';
import StatisticsCard from '../../../shared/components/card/StatisticsCard';
import LabeledBlock from '../../../shared/components/containers/LabeledBlock';
import useAxios from '../../../shared/hooks/useAxios';

const chartsStyles = {
    display: { xs: 'none', sm: 'block' },
};

const MonthStatistics = () => {
    const [recipes, setRecipes] = useState([]);
    const { axiosFetch, popup } = useAxios();

    useEffect(() => {
        const getWeek = async () => {
            const data = await axiosFetch({ url: '/statistics/month' });

            setRecipes(data.slice(0, 6));
        };

        getWeek();
    }, [axiosFetch]);

    return (
        <Box sx={{ width: '100%' }}>
            {popup}
            {recipes?.length > 0 ? (
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12} sx={chartsStyles}>
                        <BarChart
                            data={recipes}
                            title="Top used recipes"
                            subtitle={new Date().toISOString()}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <LabeledBlock title="Most used recipe">
                            <StatisticsCard data={recipes[0]} />
                        </LabeledBlock>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <LabeledBlock
                            title="Most used recipes"
                            button="/statistics/recipes"
                            divider
                            contentPadding={{ px: 1 }}
                        >
                            <List>
                                {recipes?.map((item, index) => (
                                    <Box key={index}>
                                        <ListItem sx={{ borderRadius: 2 }}>
                                            <ListItemText
                                                primary={item?.recipe?.title}
                                                sx={{ wordBreak: 'break-all' }}
                                            />
                                            {item?.newValue}
                                        </ListItem>
                                        {index < recipes.length - 1 && (
                                            <Divider variant="middle" />
                                        )}
                                    </Box>
                                ))}
                            </List>
                        </LabeledBlock>
                    </Grid>
                </Grid>
            ) : (
                <Typography>There is no statistics data.</Typography>
            )}
        </Box>
    );
};

export default MonthStatistics;
