import React from 'react';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import Completed from '../../../shared/assets/img/background/completed.svg';

const Finish = ({ handleReset, to }) => {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    my: 3,
                    color: 'text.secondary',
                }}
            >
                <Box
                    sx={{
                        width: {
                            xs: '100%',
                            sm: '60%',
                            md: '50%',
                            lg: '33%',
                        },
                    }}
                >
                    <img src={Completed} alt="Error 401." width="100%" />
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    py: 3,
                }}
            >
                {handleReset && (
                    <Button variant="outlined" onClick={handleReset}>
                        Reset
                    </Button>
                )}
                <Button
                    component={Link}
                    to={to.path}
                    variant="contained"
                    sx={{ ml: 'auto' }}
                >
                    {to.title}
                </Button>
            </Box>
        </>
    );
};

export default Finish;
