import * as yup from 'yup';

export default yup.object().shape({
    title: yup.string().required('Title is required.'),
    category: yup
        .object()
        .shape({
            _id: yup.string(),
            title: yup.string(),
        })
        .required('Category is required.'),
});
