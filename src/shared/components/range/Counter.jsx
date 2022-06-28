import { Button, ButtonGroup, InputBase, Paper } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { grey } from '@mui/material/colors';

const btnStyles = {
    backgroundColor: (theme) =>
        theme.palette.mode === 'dark' ? grey[800] : grey[300],
    color: (theme) => (theme.palette.mode === 'dark' ? grey[300] : grey[800]),
};
const inputStyles = {
    backgroundColor: (theme) =>
        theme.palette.mode === 'dark' ? grey[700] : grey[200],
    '& .MuiInputBase-input': {
        textAlign: 'center',
        color: (theme) =>
            theme.palette.mode === 'dark' ? grey[300] : grey[800],
        fontSize: 20,
        fontWeight: 'bold',
        p: 0,
    },
};

const Counter = ({ counter, onChange }) => {
    const [count, setCount] = useState(counter);

    const handleCountUp = () => {
        const newValue = count + 1;
        setCount(newValue);
        onChange(newValue);
    };

    const handleCountDown = () => {
        const newValue = count - 1;
        if (newValue > 0) {
            setCount(newValue);
            onChange(newValue);
        }
    };

    return (
        <ButtonGroup
            component={Paper}
            sx={{
                width: 120,
            }}
        >
            <Button
                variant="text"
                size="small"
                onClick={handleCountDown}
                sx={btnStyles}
            >
                <RemoveIcon />
            </Button>

            <InputBase sx={inputStyles} value={count} readOnly />

            <Button
                variant="text"
                size="small"
                onClick={handleCountUp}
                sx={btnStyles}
            >
                <AddIcon />
            </Button>
        </ButtonGroup>
    );
};

export default Counter;
