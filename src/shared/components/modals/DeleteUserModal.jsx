import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Remove from '../../assets/img/background/remove.svg';
import Thinking from '../../assets/img/background/thinking.svg';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'background.paper',
    boxShadow: 24,
    p: 3,
};

function ChildModal({ onDelete }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" color="error" onClick={handleOpen}>
                Yes, delete!
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        ...modalStyle,
                        width: { xs: '80%', sm: '60%', md: '40%' },
                    }}
                >
                    <Box display="flex" justifyContent="center" my={1}>
                        <Box width={300}>
                            <img
                                src={Remove}
                                alt="Delete account."
                                width="100%"
                            />
                        </Box>
                    </Box>

                    <Typography
                        sx={{
                            typography: { xs: 'h6', sm: 'h5', md: 'h4' },
                            textAlign: 'center',
                        }}
                        gutterBottom
                    >
                        Delete your account?
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        textAlign="center"
                        mb={{ xs: 3, md: 6 }}
                    >
                        This will delete all your information. Are you sure?
                    </Typography>

                    <Box>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Button
                                    variant="contained"
                                    onClick={handleClose}
                                    fullWidth
                                >
                                    No
                                </Button>
                            </Grid>

                            <Grid item xs />

                            <Grid item xs={5}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={onDelete}
                                    fullWidth
                                >
                                    Yes
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

const NestedModal = ({ onDelete }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <Button variant="outlined" color="error" onClick={handleOpen}>
                Delete account
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        ...modalStyle,
                        width: { xs: '90%', sm: '70%', md: '50%' },
                    }}
                >
                    <Box display="flex" justifyContent="center" my={1}>
                        <Box width={300}>
                            <img
                                src={Thinking}
                                alt="Delete account."
                                width="100%"
                            />
                        </Box>
                    </Box>

                    <Typography
                        sx={{
                            typography: { xs: 'h6', sm: 'h5', md: 'h4' },
                            textAlign: 'center',
                        }}
                        gutterBottom
                    >
                        You are about to delete your account.
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        textAlign="center"
                        mb={{ xs: 3, md: 6 }}
                    >
                        This will delete all your information. Are you sure?
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <ChildModal onDelete={onDelete} />

                        <Button variant="contained" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default NestedModal;
