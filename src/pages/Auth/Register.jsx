import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';

import { RegisterSchema } from '../../shared/schemas';
import Blueberries from '../../shared/assets/img/background/blueberries2.jpg';
import axios from '../../shared/axios';
import PopupAlert from '../../shared/components/alert/PopupAlert';

const Register = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
        },
        resolver: yupResolver(RegisterSchema),
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (data) => {
        try {
            setLoading(true);

            await axios({
                url: '/auth/register',
                method: 'post',
                data: {
                    user: {
                        ...data,
                    },
                },
            });

            if (!error) navigate('/login');
        } catch (err) {
            setError(err?.response?.data || { message: err.massage });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container
            maxWidth="lg"
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <PopupAlert error={error} clearError={() => setError(null)} />
            <Card
                sx={{
                    maxWidth: { xs: '100%', sm: '80%', md: '60%', lg: '40%' },
                }}
            >
                <Box display="flex" justifyContent="center">
                    <CardMedia
                        component="img"
                        height="200"
                        image={Blueberries}
                        alt="Login image"
                        sx={{
                            backgroundColor: '#596a87',
                            borderTopLeftRadius: 1,
                            borderTopRightRadius: 1,
                        }}
                    />
                </Box>
                <CardContent>
                    <Grid container direction="column">
                        <Grid item xs={12} align="center">
                            <Typography variant="h4" sx={{ mt: 1, mb: 2 }}>
                                Register
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name="username"
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            {...field}
                                            variant="standard"
                                            type="text"
                                            label="Username"
                                            error={error ? true : false}
                                            helperText={error?.message}
                                            required
                                            fullWidth
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={control}
                                    name="firstName"
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            {...field}
                                            variant="standard"
                                            type="text"
                                            label="First name"
                                            error={error ? true : false}
                                            helperText={error?.message}
                                            required
                                            fullWidth
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={control}
                                    name="lastName"
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            {...field}
                                            variant="standard"
                                            type="text"
                                            label="Last name"
                                            error={error ? true : false}
                                            helperText={error?.message}
                                            required
                                            fullWidth
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            {...field}
                                            variant="standard"
                                            type="email"
                                            label="Email"
                                            error={error ? true : false}
                                            helperText={error?.message}
                                            required
                                            fullWidth
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name="password"
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            {...field}
                                            variant="standard"
                                            type="password"
                                            label="Password"
                                            error={error ? true : false}
                                            helperText={error?.message}
                                            required
                                            fullWidth
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} textAlign="right">
                                <Button
                                    size="small"
                                    sx={{
                                        typography: 'body2',
                                        textTransform: 'none',
                                    }}
                                    component={Link}
                                    to="/forgot-password"
                                >
                                    Forgot password?
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <LoadingButton
                                    loading={loading}
                                    fullWidth
                                    variant="contained"
                                    onClick={handleSubmit(handleRegister)}
                                >
                                    Register
                                </LoadingButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    display="inline-block"
                                    mr={0.5}
                                >
                                    Already have an account?
                                </Typography>
                                <Button
                                    size="small"
                                    variant="text"
                                    sx={{
                                        typography: 'body2',
                                        textTransform: 'none',
                                    }}
                                    component={Link}
                                    to="/login"
                                >
                                    Login.
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Register;
