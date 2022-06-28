import * as yup from 'yup';

export default yup.object().shape({
    title: yup.string(),
    ingredient: yup.object().shape({
        _id: yup.string(),
        title: yup.string(),
    }),
});
