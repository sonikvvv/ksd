import * as yup from 'yup';

export default yup.object().shape({
    image: yup.mixed(),
    firstName: yup.string(),
    lastName: yup.string(),
    description: yup.string(),
    phone: yup.string(),
    dateOfBirth: yup.date(),
    username: yup.string(),
    email: yup.string(),
});
