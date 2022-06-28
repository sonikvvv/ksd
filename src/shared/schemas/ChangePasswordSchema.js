import * as yup from 'yup';

export default yup.object().shape({
    oldPassword: yup.string().required('Old password is required.'),
    password: yup.string().required('Password is required.'),
    passwordConfirm: yup
        .string()
        .when('password', (password, field) =>
            password
                ? field
                      .required()
                      .oneOf(
                          [yup.ref('password')],
                          'Confirm password must match password field.'
                      )
                : field
        )
        .required('Confirm password is required.'),
});
