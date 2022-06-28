import * as yup from 'yup';

export default yup.object().shape({
    password: yup.string().min(8).required('Password is required.'),
    passwordConfirm: yup
        .string()
        .label('Confirm password')
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
        .required(),
});
