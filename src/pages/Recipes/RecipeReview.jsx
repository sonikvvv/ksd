import React, { useEffect, useState } from 'react';
import {
    Container,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import RecipeDetails from './subpages/RecipeDetails';
import Conclusion from './subpages/Conclusion';
import Finish from './subpages/Finish';
import useAxios from '../../shared/hooks/useAxios';

const RecipeReview = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [recipe, setRecipe] = useState({});
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

        getRecipe();
    }, [params, axiosFetch]);

    const handleNext = (data) => {
        setRecipe((old) => {
            return { ...old, ...data };
        });

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const steps = [
        { title: 'Start', content: null },
        {
            title: 'Recipe details',
            content: (
                <RecipeDetails
                    recipe={recipe}
                    btnMB={matches}
                    onNext={handleNext}
                />
            ),
        },
        {
            title: 'Conclusion',
            content: (
                <Conclusion
                    recipe={recipe}
                    btnMB={matches}
                    onNext={handleNext}
                    onBack={handleBack}
                />
            ),
        },
        {
            title: 'Finish',
            content: (
                <Finish
                    to={{
                        path: '/recipes/pending',
                        title: 'To pending recipes',
                    }}
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
                Review recipe
            </Typography>
            {matches ? tabletUp : tabletDown}
        </Container>
    );
};

export default RecipeReview;
