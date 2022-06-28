import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Chip,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

import CheckList from '../../shared/components/lists/CheckList';
import BadgeTooltip from '../../shared/components/badge/BadgeTooltip';
import LabeledBlock from '../../shared/components/containers/LabeledBlock';
import PageHeader from '../../shared/layout/PageHeader';
import useAxios from '../../shared/hooks/useAxios';
import Cook from '../../shared/assets/img/background/cook.svg';
import useAuth from '../../shared/hooks/useAuth';

const Recipe = () => {
    const [recipe, setRecipe] = useState({});
    const params = useParams();
    const { axiosFetch, error, popup } = useAxios();
    const navigate = useNavigate();
    const { isAllowed } = useAuth();

    useEffect(() => {
        const getRecipe = async () => {
            const data = await axiosFetch({
                url: `/recipes/${params.id}`,
            });

            setRecipe(data);
        };

        getRecipe();
    }, [params, axiosFetch]);

    const handleDelete = async () => {
        await axiosFetch({ url: `/recipes/${params.id}`, method: 'delete' });
        if (!error) navigate(-1);
    };

    const editB = isAllowed('u') && (
        <MenuItem
            component={Link}
            key={'u'}
            to={`/recipes/${recipe?._id}/edit`}
        >
            <ListItemIcon>
                <EditIcon />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
        </MenuItem>
    );

    const deleteB = isAllowed('d') && (
        <MenuItem onClick={handleDelete} key={'d'}>
            <ListItemIcon>
                <DeleteIcon />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
        </MenuItem>
    );

    return (
        <Container maxWidth="lg" sx={{ pt: 1.5 }}>
            {popup}
            <PageHeader title="Recipe" menuContent={[editB, deleteB]} />

            <Box component={Paper}>
                <Box
                    sx={{
                        height: 400,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    {recipe?.image?.url ? (
                        <Avatar
                            src={recipe?.image?.url}
                            alt="Recipe image"
                            variant="rounded"
                            sx={{ height: 400, width: '100%' }}
                        />
                    ) : (
                        <Avatar
                            src={Cook}
                            alt="Recipe image"
                            variant="square"
                            sx={{
                                height: 400,
                                width: { xs: '100%', sm: '60%', md: '50%' },
                            }}
                        />
                    )}
                </Box>

                <Box sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h4" mr={1}>
                            {recipe?.title}
                        </Typography>
                        <Chip label={recipe?.category?.title} />
                    </Box>
                    <Box
                        sx={{
                            position: 'relative',
                            right: '10px',
                            top: '-10px',
                        }}
                    >
                        <BadgeTooltip status={recipe?.status} />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            alt="Avatar"
                            src={
                                recipe?.createdBy?.image?.url ||
                                'https://source.unsplash.com/random/?person'
                            }
                            sx={{ width: 30, height: 30 }}
                        />
                        <Typography variant="subtitle1" sx={{ ml: 1.5 }}>
                            {recipe?.createdBy?.fullName}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mx: 1 }}>
                            -
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {moment(recipe?.dateCreated || new Date()).format(
                                'D MMM YYYY'
                            )}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ my: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={4}>
                        <LabeledBlock
                            title="Ingredients"
                            divider
                            contentPadding={{ p: 3 }}
                        >
                            <CheckList
                                ingredients={recipe?.ingredients}
                                showCounter
                            />
                        </LabeledBlock>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <LabeledBlock
                            title="Description"
                            divider
                            contentPadding={{ p: 3 }}
                        >
                            <Typography variant="body1">
                                {recipe?.description ||
                                    'This recipe does not have description.'}
                            </Typography>
                        </LabeledBlock>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Recipe;
