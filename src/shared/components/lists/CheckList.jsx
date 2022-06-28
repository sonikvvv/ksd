import React, { useState } from 'react';
import {
    Box,
    Checkbox,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import Counter from '../range/Counter';

const CheckList = ({ ingredients = [], showCounter = false }) => {
    const [servings, setServings] = useState(1);
    const [checked, setChecked] = useState([]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleServingsChange = (servings) => {
        setServings(servings);
    };

    const ListItems = ingredients.map((item, index) => {
        let quantity = item.quantity * servings;
        let unit = item.unit;

        if (quantity >= 1000) {
            quantity = (item.quantity * servings) / 1000;

            if (item.unit === 'ml') unit = 'l';
            else if (item.unit === 'g') unit = 'kg';
        }

        return (
            <ListItemButton
                key={index}
                dense
                onClick={handleToggle(index)}
                sx={{ pl: 0, borderRadius: 2 }}
            >
                <ListItemIcon sx={{ minWidth: 30 }}>
                    <Checkbox
                        disableRipple
                        checked={checked.indexOf(index) !== -1}
                        sx={{ p: 0 }}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Typography variant="body1">
                            {quantity} {unit} - {item.ingredient.title}
                        </Typography>
                    }
                />
            </ListItemButton>
        );
    });

    return (
        <Box>
            {showCounter && (
                <Grid item container xs={12} pb={1}>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">Servings</Typography>
                    </Grid>

                    <Grid item xs={6} textAlign="right">
                        <Counter
                            counter={servings}
                            onChange={handleServingsChange}
                        />
                    </Grid>
                </Grid>
            )}

            <List>{ListItems}</List>
        </Box>
    );
};

export default CheckList;
