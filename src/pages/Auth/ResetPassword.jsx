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
import { Link, useNavigate, useParams } from 'react-router-dom';

import Kiwi from '../../shared/assets/img/background/kiwi.jpg';
import { ResetPasswordSchema } from '../../shared/schemas';
import axios from '../../shared/axios';
import PopupAlert from '../../shared/components/alert/PopupAlert';

const ResetPassword = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            password: '',
            passwordConfirm: '',
        },
        resolver: yupResolver(ResetPasswordSchema),
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const params = useParams();
    const navigate = useNavigate();

    const handleReset = async (data) => {
        try {
            setLoading(true);

            await axios({
                url: `/auth/reset-password/${params.userId}/${params.token}`,
                method: 'post',
                data,
            });

            navigate('/login', { replace: true });
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
                        image={Kiwi}
                        alt="Login image"
                        sx={{
                            backgroundColor: '#768739',
                            borderTopLeftRadius: 1,
                            borderTopRightRadius: 1,
                        }}
                    />
                </Box>
                <CardContent>
                    <Grid container direction="column">
                        <Grid item xs={12} align="center">
                            <Typography variant="h4" sx={{ mt: 1, mb: 3 }}>
                                Reset password
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} spacing={2}>
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
                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name="passwordConfirm"
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            {...field}
                                            variant="standard"
                                            type="password"
                                            label="Confirm Password"
                                            error={error ? true : false}
                                            helperText={error?.message}
                                            required
                                            fullWidth
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LoadingButton
                                    loading={loading}
                                    fullWidth
                                    variant="contained"
                                    onClick={handleSubmit(handleReset)}
                                    sx={{ mt: 3 }}
                                >
                                    Reset
                                </LoadingButton>
                                <Box textAlign="center">
                                    <Button
                                        component={Link}
                                        to="/login"
                                        variant="text"
                                        size="small"
                                        sx={{ mt: 3 }}
                                    >
                                        back to login
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ResetPassword;
