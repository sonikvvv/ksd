import * as yup from 'yup';

export default yup.object().shape({
    ingredient: yup
        .object()
        .shape({
            _id: yup.string(),
            title: yup.string(),
        })
        .typeError('Ingredient is required.')
        .required('Ingredient is required.'),
    quantity: yup
        .number()
        .typeError('Quantity must be a number.')
        .moreThan(0, 'Quantity must be greater than 0.')
        .required('Quantity is required.'),
    unit: yup
        .string()
        .defined()
        .oneOf(
            ['', 'ml', 'l', 'g', 'kg'],
            'Unit must be one of the following values: none, ml, l, g, kg.'
        ),
});
