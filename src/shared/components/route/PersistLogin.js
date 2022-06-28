import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import useRefresh from '../../hooks/useRefresh';
import PageWithNav from '../../load/PageWithNav';

const PersistLogin = () => {
    const [loading, setLoading] = useState(true);
    const refresh = useRefresh();
    const { user } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        };

        !user?.token ? verifyRefreshToken() : setLoading(false);
    }, [user, refresh]);

    return <>{loading ? <PageWithNav /> : <Outlet />}</>;
};

export default PersistLogin;
