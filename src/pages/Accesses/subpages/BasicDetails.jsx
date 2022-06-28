import React, { useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { AccessSchema } from '../../../shared/schemas';
import InputBox from '../../../shared/layout/InputBox';

const BasicDetails = ({ data, onNext }) => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
        },
        resolver: yupResolver(AccessSchema),
    });

    useEffect(() => {
        reset({ title: data.title });
    }, [data, reset]);

    const onSubmit = (data) => {
        onNext(data);
    };

    return (
        <>
            <InputBox title="Basic details">
                <Controller
                    control={control}
                    name="title"
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            label="Title"
                            required
                            fullWidth
                            type="text"
                            variant="standard"
                            error={error ? true : false}
                            helperText={error?.message}
                        />
                    )}
                />
            </InputBox>

            <Box display="flex" justifyContent="end">
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                    Next
                </Button>
            </Box>
        </>
    );
};

export default BasicDetails;
