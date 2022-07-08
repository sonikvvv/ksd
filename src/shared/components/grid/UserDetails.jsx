import React from 'react';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import moment from 'moment';

import LabeledBlock from '../containers/LabeledBlock';

const UserDetails = ({ user }) => {
    return (
        <LabeledBlock title="Basic Details" divider contentPadding={{ p: 3 }}>
            <Stack divider={<Divider flexItem />} spacing={2}>
                <Grid container>
                    <Grid item xs={12} sm={5}>
                        <Typography
                            variant="body1"
                            fontWeight={500}
                            sx={{ wordWrap: 'break-word' }}
                        >
                            Username
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ wordWrap: 'break-word' }}
                        >
                            {user?.username || '-'}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={5}>
                        <Typography
                            variant="body1"
                            fontWeight={500}
                            sx={{ wordWrap: 'break-word' }}
                        >
                            Phone
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ wordWrap: 'break-word' }}
                        >
                            {user?.phone || '-'}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={5}>
                        <Typography
                            variant="body1"
                            fontWeight={500}
                            sx={{ wordWrap: 'break-word' }}
                        >
                            Email
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ wordWrap: 'break-word' }}
                        >
                            {user?.email || '-'}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={5}>
                        <Typography
                            variant="body1"
                            fontWeight={500}
                            sx={{ wordWrap: 'break-word' }}
                        >
                            Date of birth
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ wordWrap: 'break-word' }}
                        >
                            {user?.dateOfBirth
                                ? moment(user?.dateOfBirth).format('D MMM YYYY')
                                : '-'}
                        </Typography>
                    </Grid>
                </Grid>
            </Stack>
        </LabeledBlock>
    );
};

export default UserDetails;
