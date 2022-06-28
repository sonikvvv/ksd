import * as yup from 'yup';

export default yup.object().shape({
    image: yup.mixed().required('Recipe image is required.'),
    title: yup.string().required('Title is required.'),
    description: yup.string(),
    category: yup
        .object()
        .shape({
            _id: yup.string(),
            title: yup.string(),
        })
        .required('Category is required.'),
});
