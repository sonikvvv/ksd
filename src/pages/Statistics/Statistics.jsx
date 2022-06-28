import React, { lazy, Suspense, useState } from 'react';
import { Box, Button, Container, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

import PageHeader from '../../shared/layout/PageHeader';
import WeekStatistics from './subpages/WeekStatistics';
import Pages from '../../shared/load/Pages';
import useAuth from '../../shared/hooks/useAuth';

const MonthStatistics = lazy(() => import('./subpages/MonthStatistics'));
const ThreeMonthStatistics = lazy(() =>
    import('./subpages/ThreeMonthStatistics')
);

const Statistics = () => {
    const [tab, setTab] = useState('1');
    const { isAllowed } = useAuth();

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const button = isAllowed('u') && isAllowed('c') && (
        <Button
            variant="contained"
            startIcon={<EditIcon />}
            component={Link}
            to="/statistics/edit"
        >
            Edit
        </Button>
    );

    return (
        <Container maxWidth="lg" sx={{ pt: 1.5 }}>
            <PageHeader title="Statistics" button={button} />

            <Box sx={{ width: '100%' }}>
                <TabContext value={tab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                        >
                            <Tab label="Week" value="1" />
                            <Tab label="Month" value="2" />
                            <Tab label="3 Months" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ px: 0 }}>
                        <WeekStatistics />
                    </TabPanel>
                    <TabPanel value="2" sx={{ px: 0 }}>
                        <Suspense fallback={<Pages card />}>
                            <MonthStatistics />
                        </Suspense>
                    </TabPanel>
                    <TabPanel value="3" sx={{ px: 0 }}>
                        <Suspense fallback={<Pages card />}>
                            <ThreeMonthStatistics />
                        </Suspense>
                    </TabPanel>
                </TabContext>
            </Box>
        </Container>
    );
};

export default Statistics;
