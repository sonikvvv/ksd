import * as yup from 'yup';

export default yup.object().shape({
    username: yup.string().min(3).required('Username is required.'),
    email: yup.string().email().required('Email is required.'),
    password: yup.string().min(8).required('Password is required.'),
    firstName: yup.string().min(3).required('First name is .min(3)required.'),
    lastName: yup.string().min(3).required('Last name is required.'),
});
