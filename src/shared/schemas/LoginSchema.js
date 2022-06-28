import * as yup from 'yup';

export default yup.object().shape({
    username: yup.string().min(3).required('Username is required.'),
    password: yup.string().min(8).required('Password is required.'),
});
