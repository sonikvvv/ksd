import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Input,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { UserGeneralSchema } from '../../../shared/schemas';
// import DeleteUserModal from '../../../shared/components/modals/DeleteUserModal';
import ThemeSwitch from '../../../shared/components/switch/ThemeSwitch';
import InputBox from '../../../shared/layout/InputBox';
import AddFiles from '../../../shared/assets/img/background/addFiles.svg';
import useAxios from '../../../shared/hooks/useAxios';
import useAuth from '../../../shared/hooks/useAuth';

const General = ({ user }) => {
    const [imagePrevue, setImagePrevue] = useState(null);
    const { control, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            image: null,
            firstName: '',
            lastName: '',
            description: '',
            phone: '',
            dateOfBirth: '',
            username: '',
            email: '',
        },
        resolver: yupResolver(UserGeneralSchema),
    });
    const { axiosFetch, loading, popup } = useAxios();
    const { setUser } = useAuth();

    useEffect(() => {
        reset({ ...user, image: null });
    }, [user, reset]);

    const image = watch('image');

    useEffect(() => {
        if (image instanceof File) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImagePrevue(reader.result);
            };

            reader.readAsDataURL(image);
        }
    }, [image]);

    const handleSave = async (data) => {
        const userData = await axiosFetch({
            url: `/users/${user._id}`,
            method: 'patch',
            data: {
                image: data.image,
                firstName: data.firstName,
                lastName: data.lastName,
                description: data.description,
                phone: data.phone,
                dateOfBirth: data.dateOfBirth,
            },
            options: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        });

        setUser(userData);
    };

    // const handleDelete = () => {
    //     console.log(`Deleting user with id: ${user._id}`, user);
    // };

    return (
        <Box sx={{ width: '100%' }}>
            {popup}
            <InputBox title="Basic details">
                <Stack spacing={4}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            my: { xs: 3, md: 0 },
                        }}
                    >
                        <Avatar
                            src={imagePrevue || user?.image?.url || AddFiles}
                            alt="User image."
                            sx={{
                                mr: 3,
                                width: 100,
                                height: 100,
                                border: '1px solid rgba(0, 0, 0, .1)',
                            }}
                        />
                        <Controller
                            control={control}
                            name="image"
                            render={({
                                field: { name, onBlur, ref, onChange },
                                fieldState: { error },
                            }) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <label htmlFor="contained-button-file">
                                        <Input
                                            name={name}
                                            onBlur={onBlur}
                                            ref={ref}
                                            accept="image/*"
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            onChange={(e) => {
                                                onChange(e.target.files[0]);
                                            }}
                                            sx={{
                                                display: 'none',
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            component="span"
                                        >
                                            Upload
                                        </Button>
                                    </label>

                                    {error && (
                                        <Typography
                                            variant="body2"
                                            color="error"
                                            mt={1.5}
                                        >
                                            {error.message}
                                        </Typography>
                                    )}
                                </Box>
                            )}
                        />
                    </Box>

                    <Controller
                        control={control}
                        name="firstName"
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label="First Name"
                                required
                                fullWidth
                                type="text"
                                variant="standard"
                                error={error ? true : false}
                                helperText={error?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="lastName"
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label="Last Name"
                                required
                                fullWidth
                                type="text"
                                variant="standard"
                                error={error ? true : false}
                                helperText={error?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="description"
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label="Description"
                                required
                                fullWidth
                                multiline
                                type="text"
                                variant="standard"
                                error={error ? true : false}
                                helperText={error?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="phone"
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label="Phone"
                                required
                                fullWidth
                                type="text"
                                variant="standard"
                                error={error ? true : false}
                                helperText={error?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="dateOfBirth"
                        render={({ field, fieldState: { error } }) => (
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                    {...field}
                                    label="Birth date"
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            required
                                            variant="standard"
                                            error={error ? true : false}
                                            helperText={
                                                params?.inputProps?.placeholder
                                            }
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        )}
                    />

                    <Controller
                        control={control}
                        name="username"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Username"
                                required
                                fullWidth
                                type="text"
                                variant="standard"
                                disabled
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Email"
                                required
                                fullWidth
                                type="text"
                                variant="standard"
                                disabled
                            />
                        )}
                    />

                    <Box sx={{ textAlign: 'right' }}>
                        <LoadingButton
                            loading={loading}
                            variant="contained"
                            onClick={handleSubmit(handleSave)}
                        >
                            Save
                        </LoadingButton>
                    </Box>
                </Stack>
            </InputBox>

            <InputBox title="Color scheme">
                <ThemeSwitch />
            </InputBox>

            {/* <InputBox title="Delete account">
                <Typography variant="body1" mb={3}>
                    Delete your account and all of your data. This is
                    irreversible.
                </Typography>
                <DeleteUserModal onDelete={handleDelete} />
            </InputBox> */}
        </Box>
    );
};

export default General;
