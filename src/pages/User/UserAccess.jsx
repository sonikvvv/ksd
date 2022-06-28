import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, Autocomplete, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import UserCard from '../../shared/components/card/UserCard';
import PageHeader from '../../shared/layout/PageHeader';
import InputBox from '../../shared/layout/InputBox';
import useAxios from '../../shared/hooks/useAxios';

const UserAccess = () => {
    const [user, setUser] = useState({});
    const [accesses, setAccesses] = useState([]);
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            access: null,
        },
    });
    const { axiosFetch, loading, error, popup } = useAxios();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getUserAndAccesses = async () => {
            const userData = await axiosFetch({ url: `/users/${params.id}` });

            setUser(userData);
            const accessesData = await axiosFetch({ url: '/access' });

            setAccesses(accessesData);
            reset({ access: userData?.access }, { keepDefaultValues: true });
        };

        getUserAndAccesses();
    }, [params, axiosFetch, reset]);

    const onSubmit = async (data) => {
        await axiosFetch({
            url: '/users/access',
            method: 'patch',
            data: {
                accessToChange: {
                    user: user._id,
                    access: data.access._id,
                },
            },
        });

        if (!error) navigate(`/users/${user._id}`);
    };

    return (
        <Container maxWidth="lg" sx={{ pt: 1.5 }}>
            {popup}
            <PageHeader title="Change access" />
            <Box my={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={5}>
                        <UserCard user={user} />
                    </Grid>
                    <Grid item xs={12} md={7} sx={{ my: '-24px' }}>
                        <InputBox title="Change Access" bigContent>
                            <Controller
                                control={control}
                                name="access"
                                render={({
                                    field: { value, onChange },
                                    fieldState: { error },
                                }) => (
                                    <Autocomplete
                                        value={value}
                                        options={accesses}
                                        getOptionLabel={(option) =>
                                            option.title
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Access"
                                                variant="standard"
                                                fullWidth
                                                required
                                                error={error ? true : false}
                                                helperText={error?.message}
                                                sx={{ my: 3 }}
                                            />
                                        )}
                                        isOptionEqualToValue={(option, value) =>
                                            option._id.localeCompare(
                                                value._id
                                            ) === 0
                                        }
                                        onChange={(event, data) =>
                                            onChange(data)
                                        }
                                    />
                                )}
                            />

                            <Box display="flex" justifyContent="end">
                                <LoadingButton
                                    loading={loading}
                                    variant="contained"
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    Save
                                </LoadingButton>
                            </Box>
                        </InputBox>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default UserAccess;
