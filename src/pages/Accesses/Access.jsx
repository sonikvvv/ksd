import React, { useEffect, useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    Divider,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate, useParams } from 'react-router-dom';

import AccessImg from '../../shared/assets/img/background/access.svg';
import accessCols from '../../shared/utils/consts/accessCols';
import PageHeader from '../../shared/layout/PageHeader';
import useAxios from '../../shared/hooks/useAxios';
import useAuth from '../../shared/hooks/useAuth';

const Access = () => {
    const [access, setAccess] = useState({});
    const { axiosFetch, popup, error } = useAxios();
    const params = useParams();
    const navigate = useNavigate();
    const { isAllowed } = useAuth();

    useEffect(() => {
        const getAccess = async () => {
            const data = await axiosFetch({ url: `/access/${params.id}` });

            setAccess(data);
        };

        getAccess();
    }, [params, axiosFetch]);

    const handleDelete = async () => {
        await axiosFetch({ url: `/access/${access._id}`, method: 'delete' });
        if (!error) navigate('/access', { replace: true });
    };

    const editB = isAllowed('u') && (
        <MenuItem component={Link} to={`/access/${access._id}/edit`}>
            <ListItemIcon>
                <EditIcon />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
        </MenuItem>
    );

    const deleteB = isAllowed('d') && (
        <MenuItem onClick={handleDelete}>
            <ListItemIcon>
                <DeleteIcon />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
        </MenuItem>
    );

    return (
        <Container maxWidth="lg" sx={{ pt: 1.5 }}>
            {popup}
            <PageHeader title="Access" menuContent={[editB, deleteB]} />

            <Box component={Paper}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        sx={{
                            width: {
                                xs: '50%',
                                lg: '30%',
                            },
                        }}
                    >
                        <img src={AccessImg} alt="Access" width="100%" />
                    </Box>
                </Box>

                <Divider />

                <Box sx={{ p: 3 }}>
                    <Typography variant="h4">{access.title}</Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    height: '100%',
                    my: 3,
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
                        columns={accessCols}
                        rows={access.permissions || []}
                        getRowId={(row) => row.path}
                        initialState={{
                            pagination: {
                                pageSize: 25,
                            },
                        }}
                    />
                </div>
            </Box>
        </Container>
    );
};

export default Access;
