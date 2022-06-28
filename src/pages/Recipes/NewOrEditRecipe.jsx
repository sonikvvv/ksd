import React, { useEffect, useState } from 'react';
import {
    Container,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useParams } from 'react-router-dom';

import SelectIngredients from './subpages/SelectIngredients';
import BasicDetails from './subpages/BasicDetails';
import Finish from './subpages/Finish';
import useAxios from '../../shared/hooks/useAxios';

const emptyRecipe = {
    title: '',
    description: '',
    ingredients: [],
};

const NewRecipe = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [recipe, setRecipe] = useState(emptyRecipe);
    const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const params = useParams();
    const { axiosFetch, popup } = useAxios();

    useEffect(() => {
        const getRecipe = async () => {
            const data = await axiosFetch({
                url: `/recipes/${params.id}`,
            });

            setRecipe(data);
        };

        if (params?.id) {
            getRecipe();
        }
    }, [params, axiosFetch]);

    const handleNext = (data) => {
        setRecipe((old) => ({ ...old, ...data }));

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setRecipe(emptyRecipe);
        setActiveStep(1);
    };

    const steps = [
        { title: 'Start', content: null },
        {
            title: 'Basic details',
            content: (
                <BasicDetails
                    data={recipe}
                    btnMB={matches}
                    onNext={handleNext}
                />
            ),
        },
        {
            title: 'Ingredients',
            content: (
                <SelectIngredients
                    data={recipe}
                    btnMB={matches}
                    onBack={handleBack}
                    onNext={handleNext}
                />
            ),
        },
        {
            title: 'Finish',
            content: params?.id ? (
                <Finish to={{ title: 'All recipes', path: '/recipes' }} />
            ) : (
                <Finish
                    handleReset={handleReset}
                    to={{ title: 'All recipes', path: '/recipes' }}
                />
            ),
        },
    ];

    const tabletUp = (
        <>
            <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
                {steps.map((el, index) => (
                    <Step key={index}>
                        <StepLabel>{el.title}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {steps[activeStep].content}
        </>
    );

    const tabletDown = (
        <Stepper activeStep={activeStep} sx={{ mb: 3 }} orientation="vertical">
            {steps.map((el, index) => (
                <Step key={index}>
                    <StepLabel>{el.title}</StepLabel>
                    <StepContent>{el.content}</StepContent>
                </Step>
            ))}
        </Stepper>
    );

    return (
        <Container maxWidth="lg" sx={{ pt: 1.5 }}>
            {popup}
            <Typography variant="h4" my={5}>
                {params?.id ? 'Edit a recipe' : 'Create a new recipe'}
            </Typography>
            {matches ? tabletUp : tabletDown}
        </Container>
    );
};

export default NewRecipe;
