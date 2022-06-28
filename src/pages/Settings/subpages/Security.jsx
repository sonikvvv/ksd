import React from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import InputBox from '../../../shared/layout/InputBox';
import { ChangePasswordSchema } from '../../../shared/schemas';

const Security = ({ user }) => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            oldPassword: '',
            password: '',
            passwordConfirm: '',
        },
        resolver: yupResolver(ChangePasswordSchema),
    });

    const handleSave = (data) => {
        console.log('Updating user password to:', data, user._id);
        /////  send updated data
    };

    return (
        <Box sx={{ width: '100%' }}>
            <InputBox title="Change password">
                <Stack spacing={4}>
                    <Controller
                        control={control}
                        name="oldPassword"
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label="Old password"
                                required
                                fullWidth
                                type="password"
                                variant="standard"
                                error={error ? true : false}
                                helperText={error?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label="Password"
                                required
                                fullWidth
                                type="password"
                                variant="standard"
                                error={error ? true : false}
                                helperText={error?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="passwordConfirm"
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label="Confirm password"
                                required
                                fullWidth
                                type="password"
                                variant="standard"
                                error={error ? true : false}
                                helperText={error?.message}
                            />
                        )}
                    />

                    <Box sx={{ textAlign: 'right' }}>
                        <Button
                            variant="contained"
                            onClick={handleSubmit(handleSave)}
                        >
                            Save
                        </Button>
                    </Box>
                </Stack>
            </InputBox>
        </Box>
    );
};

export default Security;
