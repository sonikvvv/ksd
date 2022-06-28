import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const renderBoolean = ({ value }) =>
    value === true ? (
        <CheckIcon color="success" />
    ) : (
        <CloseIcon color="error" />
    );

const accessCols = [
    {
        field: 'title',
        headerName: 'Title',
        minWidth: 200,
        type: 'string',
        flex: 1,
    },
    {
        field: 'path',
        headerName: 'Path',
        minWidth: 200,
        type: 'string',
        flex: 1,
    },
    {
        field: 'create',
        headerName: 'Create',
        minWidth: 100,
        type: 'boolean',
        renderCell: renderBoolean,
        valueGetter: (params) => {
            const parts = params.row.crud.split('');
            return parts[0] === 'c' ? true : false;
        },
    },
    {
        field: 'read',
        headerName: 'Read',
        minWidth: 100,
        type: 'boolean',
        renderCell: renderBoolean,
        valueGetter: (params) => {
            const parts = params.row.crud.split('');
            return parts[1] === 'r' ? true : false;
        },
    },
    {
        field: 'update',
        headerName: 'Update',
        minWidth: 100,
        type: 'boolean',
        renderCell: renderBoolean,
        valueGetter: (params) => {
            const parts = params.row.crud.split('');
            return parts[2] === 'u' ? true : false;
        },
    },
    {
        field: 'delete',
        headerName: 'Delete',
        minWidth: 100,
        type: 'boolean',
        renderCell: renderBoolean,
        valueGetter: (params) => {
            const parts = params.row.crud.split('');
            return parts[3] === 'd' ? true : false;
        },
    },
];

export default accessCols;
