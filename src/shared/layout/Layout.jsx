import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/navigation/Header';

const Layout = () => {
    return (
        <main>
            <Header>
                <Outlet />
            </Header>
        </main>
    );
};

export default Layout;
