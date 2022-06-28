import * as yup from 'yup';
import moment from 'moment';

export default yup.object().shape({
    date: yup
        .date()
        .max(moment().add(1, 'day'), 'Date must be at earlier than tomorrow.')
        .required('Date is required.'),
});
