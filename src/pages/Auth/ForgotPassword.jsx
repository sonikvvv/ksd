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
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import Lime from '../../shared/assets/img/background/lime.jpg';
import { ForgotPasswordSchema } from '../../shared/schemas';
import axios from '../../shared/axios';
import PopupAlert from '../../shared/components/alert/PopupAlert';

const ForgotPassword = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
        },
        resolver: yupResolver(ForgotPasswordSchema),
    });
    const [text, setText] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleForgotPassword = async (data) => {
        try {
            setLoading(true);
            
            await axios({
                url: '/auth/forgot-password',
                method: 'post',
                data,
            });

            setText(true);
            setTimeout(() => navigate('/'), 20000);
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
                    width: { xs: '100%', sm: '80%', md: '60%', lg: '40%' },
                }}
            >
                <Box display="flex" justifyContent="center">
                    <CardMedia
                        component="img"
                        height="250"
                        image={Lime}
                        alt="Login image"
                        sx={{
                            backgroundColor: '#847747',
                            borderTopLeftRadius: 1,
                            borderTopRightRadius: 1,
                        }}
                    />
                </Box>
                <CardContent>
                    <Grid container direction="column" spacing={3}>
                        <Grid item xs={12} align="center" mb={1.5}>
                            <Typography
                                variant="h4"
                                gutterBottom
                                sx={{ mt: 1 }}
                            >
                                Forgot your password?
                            </Typography>
                            {text && (
                                <Typography variant="body2">
                                    An email with a password reset link was sent
                                    to you. <br />
                                    Please check your email.
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                control={control}
                                name="email"
                                render={({ field, fieldState: { error } }) => (
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
                            <LoadingButton
                                loading={loading}
                                fullWidth
                                variant="contained"
                                onClick={handleSubmit(handleForgotPassword)}
                                sx={{ mt: 3 }}
                            >
                                Send request
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
                </CardContent>
            </Card>
        </Container>
    );
};

export default ForgotPassword;
