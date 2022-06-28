import React from 'react';
import {
    Avatar,
    Box,
    Button,
    Grid,
    List,
    ListItemButton,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import moment from 'moment';
import Cook from '../../../shared/assets/img/background/cook.svg';

import LabeledBlock from '../../../shared/components/containers/LabeledBlock';

const RecipeDetails = ({ recipe, btnMB = true, onNext }) => {
    return (
        <>
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
                            src={recipe?.image?.url || ''}
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
                    <Typography variant="h4" gutterBottom>
                        {recipe.title}
                    </Typography>

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
                        <Typography variant="subtitle1" sx={{ mx: 1.5 }}>
                            {recipe?.createdBy?.fullName}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            - {moment(recipe?.dateCreated).format('D MMM YYYY')}
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
                            contentPadding={{ p: 1 }}
                        >
                            <List>
                                {recipe?.ingredients?.map((el, index) => (
                                    <ListItemButton
                                        key={index}
                                        dense
                                        sx={{ borderRadius: 2 }}
                                    >
                                        <ListItemText
                                            primary={
                                                <Typography variant="body1">
                                                    {el.quantity} {el.unit} -{' '}
                                                    {el.ingredient.title}
                                                </Typography>
                                            }
                                        />
                                    </ListItemButton>
                                ))}
                            </List>
                        </LabeledBlock>
                    </Grid>
                    <Grid item container xs lg={8} spacing={3}>
                        <Grid item xs={12}>
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
                        {recipe?.notes && (
                            <Grid item xs={12}>
                                <LabeledBlock
                                    title="Notes"
                                    divider
                                    contentPadding={{ p: 3 }}
                                >
                                    <Typography variant="body1">
                                        {recipe?.notes}
                                    </Typography>
                                </LabeledBlock>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Box>
            <Box display="flex" justifyContent="end" mb={btnMB ? 3 : 0}>
                <Button variant="contained" onClick={() => onNext()}>
                    Next
                </Button>
            </Box>
        </>
    );
};

export default RecipeDetails;
