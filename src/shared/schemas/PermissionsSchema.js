import * as yup from 'yup';

yup.addMethod(yup.string, 'noWhiteSpaces', function (errorMessage) {
    return this.test(`test-no-white-spaces`, errorMessage, function (value) {
        const { path, createError } = this;

        const splitted = value.split(' ');

        return (
            (splitted && splitted.length <= 1) ||
            createError({ path, message: errorMessage })
        );
    });
});

export default yup.object().shape({
    title: yup.string().required('Title is required.'),
    path: yup
        .string()
        .matches(
            new RegExp('/[a-zA-Z0-9]+', 'g'),
            "Path should start with '/'."
        )
        .noWhiteSpaces('Path should not contain white spaces.')
        .required('Path is required.'),
    create: yup.bool(),
    read: yup.bool(),
    update: yup.bool(),
    delete: yup.bool(),
});
