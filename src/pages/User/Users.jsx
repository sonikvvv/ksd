import React, { useEffect, useState } from 'react';
import {
    Container,
    FormControlLabel,
    Grid,
    Pagination,
    Switch,
    Typography,
    useMediaQuery,
} from '@mui/material';

import UserCard from '../../shared/components/card/UserCard';
import PageHeader from '../../shared/layout/PageHeader';
import useAxios from '../../shared/hooks/useAxios';
import useAuth from '../../shared/hooks/useAuth';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [pageCount, setPageCount] = useState(10);
    const { axiosFetch, popup } = useAxios();
    const { isAllowed } = useAuth();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            const data = await axiosFetch({
                url: '/users/search',
                method: 'post',
                data: {
                    flag: checked,
                    page: {
                        page: page,
                        pageCount: 12,
                    },
                },
            });

            setUsers(data?.users);
            setPage(0);
            setPageCount(data?.pages === 1 ? 1 : data?.pages);
        };

        getUsers();
    }, [axiosFetch, page, checked]);

    const handlePageChange = (event, value) => {
        setPage(value - 1);
    };

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const flagged = isAllowed('d') && (
        <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Flagged users"
            labelPlacement="start"
        />
    );

    return (
        <Container maxWidth="lg" sx={{ pt: 1.5 }}>
            {popup}
            <PageHeader title="Employees" button={flagged} />

            <Grid container spacing={3} mb={3}>
                {users?.length !== 0 ? (
                    users?.map((user, index) => (
                        <Grid item key={index} xs={12} sm={6} md={6} lg={4}>
                            <UserCard user={user} />
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography>There are no employees.</Typography>
                    </Grid>
                )}
            </Grid>

            {users?.length !== 0 && (
                <Grid container my={3}>
                    <Grid item xs={12} display="flex" justifyContent="center">
                        <Pagination
                            count={pageCount}
                            page={page + 1}
                            color="primary"
                            size={matches ? 'small' : 'medium'}
                            onChange={handlePageChange}
                        />
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default Users;
