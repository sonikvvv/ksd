import React, { useEffect, useState } from 'react';
import {
    Container,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    useMediaQuery,
} from '@mui/material';
import BasicDetails from './subpages/BasicDetails';
import Permissions from './subpages/Permissions';
import { useParams } from 'react-router-dom';

import Finish from '../Recipes/subpages/Finish';
import PageHeader from '../../shared/layout/PageHeader';
import useAxios from '../../shared/hooks/useAxios';

const emptyAccess = {
    title: '',
    permissions: [],
};

const NewAccess = () => {
    const [access, setAccess] = useState(emptyAccess);
    const [activeStep, setActiveStep] = useState(1);
    const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const { axiosFetch, popup } = useAxios();
    const params = useParams();

    useEffect(() => {
        const getAccess = async () => {
            const data = await axiosFetch({ url: `/access/${params.id}` });

            setAccess(data);
        };

        if (params?.id) {
            getAccess();
        }
    }, [params, axiosFetch]);

    const handleNext = (data) => {
        setAccess((old) => ({ ...old, ...data }));
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setAccess(emptyAccess);
        setActiveStep(1);
    };

    const steps = [
        { title: 'Start', content: null },
        {
            title: 'Basic details',
            content: <BasicDetails data={access} onNext={handleNext} />,
        },
        {
            title: 'Permissions',
            content: (
                <Permissions
                    data={access}
                    btnMB={matches}
                    onBack={handleBack}
                    onNext={handleNext}
                />
            ),
        },
        {
            title: 'Finish',
            content: params?.id ? (
                <Finish to={{ title: 'All accesses', path: '/access' }} />
            ) : (
                <Finish
                    handleReset={handleReset}
                    to={{ title: 'All accesses', path: '/access' }}
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
            <PageHeader
                title={params?.id ? 'Update a access' : 'Create a new access'}
            />
            {matches ? tabletUp : tabletDown}
        </Container>
    );
};

export default NewAccess;
