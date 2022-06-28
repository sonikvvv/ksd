import React from 'react';
import { Box, Button, Grid, TextField, useMediaQuery } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

import InputBox from '../../../shared/layout/InputBox';
import useAxios from '../../../shared/hooks/useAxios';

const Conclusion = ({ recipe, btnMB, onNext, onBack }) => {
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const { control, setError, handleSubmit } = useForm({
        defaultValues: {
            notes: '',
        },
    });
    const { axiosFetch, loading, error, popup } = useAxios();

    const handleRefuse = async (data) => {
        if (!!data.notes.trim()) {
            await axiosFetch({
                url: '/recipes/status',
                method: 'post',
                data: {
                    status: {
                        recipe: recipe._id,
                        approved: false,
                        notes: data.notes,
                    },
                },
            });

            if (!error) onNext({});
        }

        setError(
            'notes',
            { type: 'required', message: 'Note is required.' },
            { shouldFocus: true }
        );
    };

    const onSubmit = async () => {
        await axiosFetch({
            url: '/recipes/status',
            method: 'post',
            data: {
                status: {
                    recipe: recipe._id,
                    approved: true,
                    notes: '',
                },
            },
        });

        if (!error) onNext({});
    };

    const backBtn = (
        <Grid item xs={12} sm>
            <Button
                onClick={onBack}
                variant={matches ? 'outlined' : 'text'}
                fullWidth={matches}
            >
                Back
            </Button>
        </Grid>
    );

    return (
        <>
            {popup}
            <InputBox
                title="Notes"
                subtitle="If you do not approve the recipe, you should write
                        explanatory notes."
            >
                <Controller
                    control={control}
                    name="notes"
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            label="Notes"
                            fullWidth
                            multiline
                            type="text"
                            variant="standard"
                            error={error ? true : false}
                            helperText={error?.message}
                        />
                    )}
                />
            </InputBox>

            <Box mb={btnMB ? 3 : 0}>
                <Grid container spacing={3}>
                    {!matches && backBtn}
                    <Grid
                        item
                        container
                        spacing={3}
                        xs={12}
                        sm={6}
                        md={6}
                        lg={4}
                    >
                        <Grid
                            item
                            xs
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <LoadingButton
                                loading={loading}
                                variant="outlined"
                                color="error"
                                fullWidth={matches}
                                onClick={handleSubmit(handleRefuse)}
                                startIcon={<CloseIcon />}
                            >
                                Refuse
                            </LoadingButton>
                        </Grid>
                        <Grid
                            item
                            xs
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <LoadingButton
                                loading={loading}
                                variant="contained"
                                fullWidth={matches}
                                onClick={handleSubmit(onSubmit)}
                                startIcon={<DoneIcon />}
                            >
                                Approve
                            </LoadingButton>
                        </Grid>
                    </Grid>
                    {matches && backBtn}
                </Grid>
            </Box>
        </>
    );
};

export default Conclusion;
