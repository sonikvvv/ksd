import React, { Suspense } from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './shared/providers/AuthProvider';
import ColorModeProvider from './shared/providers/ColorModeProvider';
import PageWithNav from './shared/load/PageWithNav';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <ColorModeProvider>
            <Suspense fallback={<PageWithNav />}>
                <AuthProvider>
                    <Routes>
                        <Route path="/*" element={<App tab="home" />} />
                    </Routes>
                </AuthProvider>
            </Suspense>
        </ColorModeProvider>
    </BrowserRouter>
);
