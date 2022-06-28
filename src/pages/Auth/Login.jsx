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
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoginSchema } from '../../shared/schemas';
import axios from '../../shared/axios';
import useAuth from '../../shared/hooks/useAuth';
import Pomegranate from '../../shared/assets/img/background/pomegranate.jpg';
import PopupAlert from '../../shared/components/alert/PopupAlert';

const Login = () => {
    const { login } = useAuth();
    const { control, handleSubmit } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(LoginSchema),
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = async (data) => {
        try {
            setLoading(true);

            const res = await axios({
                url: '/auth/login',
                method: 'post',
                data: {
                    user: data,
                },
                withCredentials: true,
            });

            login({ ...res?.data?.user, token: res?.data?.token });
            navigate(from, { replace: true });
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
                        height="250"
                        image={Pomegranate}
                        alt="Login image"
                        sx={{
                            backgroundColor: '#844235',
                            borderTopLeftRadius: 1,
                            borderTopRightRadius: 1,
                        }}
                    />
                </Box>
                <CardContent>
                    <Grid container direction="column">
                        <Grid item align="center">
                            <Typography variant="h4" sx={{ mt: 1, mb: 3 }}>
                                Login
                            </Typography>
                        </Grid>
                        <Grid container item spacing={3}>
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
                                    onClick={handleSubmit(handleLogin)}
                                >
                                    Login
                                </LoadingButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    display="inline-block"
                                    mr={0.5}
                                >
                                    Don't have an account?
                                </Typography>
                                <Button
                                    size="small"
                                    variant="text"
                                    sx={{
                                        typography: 'body2',
                                        textTransform: 'none',
                                    }}
                                    component={Link}
                                    to="/register"
                                >
                                    Sign up.
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Login;
