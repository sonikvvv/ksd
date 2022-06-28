import React, { useEffect, useState } from 'react';
import { AlertTitle, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PopupAlert = ({ error, clearError }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (error?.message) setOpen(true);
    }, [error]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        clearError();
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert
                elevation={6}
                onClose={handleClose}
                severity="error"
                sx={{ width: '100%' }}
            >
                <AlertTitle>
                    Error {error?.statusCode && ` - ${error.statusCode}`}
                </AlertTitle>
                {error?.message}
            </Alert>
        </Snackbar>
    );
};

export default PopupAlert;
