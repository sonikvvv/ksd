import React, { useState } from 'react';
import { Container, Tab, Box } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import General from './subpages/General';
import PageHeader from '../../shared/layout/PageHeader';
import Security from './subpages/Security';
import useAuth from '../../shared/hooks/useAuth';

const Settings = () => {
    const [tab, setTab] = useState('1');
    const { user } = useAuth();

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Container maxWidth="lg" sx={{ pt: 1.5 }}>
            <PageHeader title="Settings" />

            <Box sx={{ width: '100%' }}>
                <TabContext value={tab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                        >
                            <Tab label="General" value="1" />
                            {/* <Tab label="Security" value="2" />
                            <Tab label="Item Three" value="3" /> */}
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ p: 0 }}>
                        <General user={user} />
                    </TabPanel>
                    <TabPanel value="2" sx={{ p: 0 }}>
                        <Security user={user} />
                    </TabPanel>
                    <TabPanel value="3" sx={{ p: 0 }}>
                        Item Three
                    </TabPanel>
                </TabContext>
            </Box>
        </Container>
    );
};

export default Settings;
