import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { grey } from '@mui/material/colors';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { PermissionsSchema } from '../../../shared/schemas';
import accessCols from '../../../shared/utils/consts/accessCols';
import InputBox from '../../../shared/layout/InputBox';
import useAxios from '../../../shared/hooks/useAxios';

const Permissions = ({ data, btnMB, onBack, onNext }) => {
    const [permissions, setPermissions] = useState([]);
    const [lengthError, setLengthError] = useState(false);
    const { axiosFetch, loading, error, popup } = useAxios();
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            path: '',
            create: false,
            read: false,
            update: false,
            delete: false,
        },
        resolver: yupResolver(PermissionsSchema),
    });

    useEffect(() => {
        setPermissions(data.permissions);
    }, [data, setPermissions]);

    const handleAddPermission = (data) => {
        setLengthError(false);

        const crud = `${data.create ? 'c' : '-'}${data.read ? 'r' : '-'}${
            data.update ? 'u' : '-'
        }${data.delete ? 'd' : '-'}`;

        setPermissions((old) => [
            ...old,
            { title: data.title, path: data.path, crud },
        ]);
        handleClear();
    };

    const handleEditClick = (id) => {
        const permission = handleDeleteClick(id, true);
        const parts = permission.crud.split('');

        reset(
            {
                title: permission.title,
                path: permission.path,
                create: parts[0] === 'c' ? true : false,
                read: parts[1] === 'r' ? true : false,
                update: parts[2] === 'u' ? true : false,
                delete: parts[3] === 'd' ? true : false,
            },
            { keepDefaultValues: true }
        );
    };

    const handleDeleteClick = (id, ret = false) => {
        let foundPermission = permissions.filter(
            (permission) => permission.title === id
        )[0];

        setPermissions((old) =>
            old.filter((permission) => permission.title !== id)
        );

        if (ret) {
            return foundPermission;
        }
    };

    const handleClear = () => {
        reset();
    };

    const handleCreateOrUpdate = async () => {
        if (data?._id) {
            await axiosFetch({
                url: `/access/${data._id}`,
                method: 'patch',
                data: { access: { title: data.title, permissions } },
            });
        } else {
            await axiosFetch({
                url: '/access',
                method: 'post',
                data: { access: { title: data.title, permissions } },
            });
        }
    };

    const handleNext = () => {
        if (permissions.length > 0) {
            setLengthError(false);
            handleCreateOrUpdate();

            if (!error) onNext({}, true);
        }

        setLengthError(true);
    };

    return (
        <>
            {popup}
            <InputBox title="Permission">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="path"
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Path"
                                    required
                                    fullWidth
                                    type="text"
                                    variant="standard"
                                    error={error ? true : false}
                                    helperText={error?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            control={control}
                            name="create"
                            render={({ field }) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={field.value}
                                            onChange={(e) =>
                                                field.onChange(e.target.checked)
                                            }
                                        />
                                    }
                                    label="Create"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            control={control}
                            name="read"
                            render={({ field }) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={field.value}
                                            onChange={(e) =>
                                                field.onChange(e.target.checked)
                                            }
                                        />
                                    }
                                    label="Read"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            control={control}
                            name="update"
                            render={({ field }) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={field.value}
                                            onChange={(e) =>
                                                field.onChange(e.target.checked)
                                            }
                                        />
                                    }
                                    label="Update"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            control={control}
                            name="delete"
                            render={({ field }) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={field.value}
                                            onChange={(e) =>
                                                field.onChange(e.target.checked)
                                            }
                                        />
                                    }
                                    label="Delete"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleClear}
                        >
                            clear
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleSubmit(handleAddPermission)}
                        >
                            add
                        </Button>
                    </Grid>
                </Grid>
            </InputBox>

            <InputBox title="Permission" bigContent>
                {lengthError && (
                    <Typography variant="body2" color="error" gutterBottom>
                        Permissions table must not be empty.
                    </Typography>
                )}
                <Box
                    sx={{
                        display: 'flex',
                        height: '100%',
                        mt: 3,
                        '& .MuiDataGrid-columnHeader': {
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? grey['A100']
                                    : grey[900],
                        },
                    }}
                >
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            autoHeight
                            columns={[
                                ...accessCols,
                                {
                                    field: 'actions',
                                    type: 'actions',
                                    headerName: 'Actions',
                                    width: 100,
                                    cellClassName: 'actions',
                                    getActions: ({ id }) => [
                                        <GridActionsCellItem
                                            icon={<EditIcon />}
                                            label="Edit"
                                            className="textPrimary"
                                            onClick={() => handleEditClick(id)}
                                        />,
                                        <GridActionsCellItem
                                            icon={<DeleteIcon />}
                                            label="Delete"
                                            onClick={() =>
                                                handleDeleteClick(id)
                                            }
                                        />,
                                    ],
                                },
                            ]}
                            rows={permissions}
                            getRowId={(row) => row?.title}
                            hideFooterPagination
                        />
                    </div>
                </Box>
            </InputBox>

            <Box
                display="flex"
                justifyContent="space-between"
                mb={btnMB ? 3 : 0}
            >
                <Button color="inherit" onClick={onBack}>
                    Back
                </Button>
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    onClick={handleNext}
                >
                    Next
                </LoadingButton>
            </Box>
        </>
    );
};

export default Permissions;
