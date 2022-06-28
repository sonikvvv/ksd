import green from '@mui/material/colors/green';
import yellow from '@mui/material/colors/yellow';
import amber from '@mui/material/colors/amber';
import orange from '@mui/material/colors/orange';
import red from '@mui/material/colors/red';
import blue from '@mui/material/colors/blue';

const status = {
    approved: {
        key: 'approved',
        title: 'Approved.',
        message: 'The recipe is approved.',
        color: green[500],
    },
    pending: {
        key: 'pending',
        title: 'Pending',
        message: 'The recipe is pending.',
        color: blue[500],
    },
    edit1: {
        key: 'edit1',
        title: 'First edit.',
        message: 'The recipe is pending. With first edit.',
        color: yellow[500],
    },
    edit2: {
        key: 'edit2',
        title: 'Second edit.',
        message: 'The recipe is pending. With second edit.',
        color: amber[500],
    },
    edit3: {
        key: 'edit3',
        title: 'Third edit.',
        message: 'The recipe is pending. With third edit.',
        color: orange[500],
    },
    refused: {
        key: 'refused',
        title: 'Refused.',
        message: 'The recipe is refused.',
        color: red[600],
    },
};

export const statusArray = [
    { key: 'approved', title: 'Approved' },
    { key: 'pending', title: 'Pending' },
    { key: 'edit1', title: 'First edit' },
    { key: 'edit2', title: 'Second edit' },
    { key: 'edit3', title: 'Third edit' },
    { key: 'refused', title: 'Refused' },
];

export default status;
