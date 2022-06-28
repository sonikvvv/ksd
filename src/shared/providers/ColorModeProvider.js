import { useEffect, useMemo, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {
    createTheme,
    darkScrollbar,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material';
import Theme from '../themes/Theme';

import ColorModeContext from '../contexts/ColorModeContext';
import { grey } from '@mui/material/colors';

const ColorModeProvider = ({ children }) => {
    const [mode, setMode] = useState('light');

    useEffect(() => {
        setMode(localStorage.getItem('theme') || 'light');
    }, []);

    const colorMode = useMemo(
        () => ({
            toggleColorMode: (mode) => {
                setMode(mode);
                localStorage.setItem('theme', mode);
            },
        }),
        []
    );

    let theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
                ...Theme,
                components: {
                    MuiCssBaseline: {
                        styleOverrides: {
                            '*': {
                                ...darkScrollbar(
                                    mode === 'light'
                                        ? {
                                              track: 'transparent',
                                              thumb: grey[500],
                                              active: grey[500],
                                          }
                                        : undefined
                                ),
                                '&::-webkit-scrollbar': {
                                    width: 5,
                                    backgroundColor: 'transparent',
                                },
                                scrollbarWidth: 'thin',
                            },
                        },
                    },
                },
            }),
        [mode]
    );

    theme = responsiveFontSizes(theme);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default ColorModeProvider;
