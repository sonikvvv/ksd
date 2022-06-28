import React from 'react';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import moment from 'moment';

import LabeledBlock from '../containers/LabeledBlock';

const GridItem = (primary, secondary) => {
    return (
        <Grid container>
            <Grid item xs={12} sm={5}>
                <Typography
                    variant="body1"
                    fontWeight={500}
                    sx={{ wordWrap: 'break-word' }}
                >
                    {primary}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={7}>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ wordWrap: 'break-word' }}
                >
                    {secondary}
                </Typography>
            </Grid>
        </Grid>
    );
};

const UserDetails = ({ user }) => {
    const {
        username = '',
        phone = '',
        email = '',
        dateOfBirth = new Date(),
    } = user;

    const parsedDateOfBirth = moment(dateOfBirth).format('D MMM YYYY');

    return (
        <LabeledBlock title="Basic Details" divider contentPadding={{ p: 3 }}>
            <Stack divider={<Divider flexItem />} spacing={2}>
                {username !== '' && GridItem('Username', username)}
                {phone !== '' && GridItem('Phone', phone)}
                {email !== '' && GridItem('Email', email)}
                {dateOfBirth !== '' &&
                    GridItem('Date of birth', parsedDateOfBirth)}
            </Stack>
        </LabeledBlock>
    );
};

export default UserDetails;
