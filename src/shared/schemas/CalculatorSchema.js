import * as yup from 'yup';

export default yup.object().shape({
    servings: yup
        .number()
        .typeError('Servings must be a number.')
        .required('Servings is required.')
        .min(1, 'Servings must be higher than 1.'),
    recipe: yup
        .object()
        .shape({
            _id: yup.string(),
            title: yup.string(),
        })
        .typeError('Recipe is required.')
        .required('Recipe is required.'),
});
