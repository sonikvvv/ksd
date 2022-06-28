import { useLocation, Navigate, Outlet } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import SearchedRoute from '../../utils/SearchedRoute';
import AllowedActions from '../../utils/AllowedActions';

const RequireAuth = () => {
    const { user, isLoggedIn } = useAuth();
    const location = useLocation();
    const access = user?.access;

    const route = SearchedRoute(location.pathname);
    const neededAccess = AllowedActions(location.pathname);

    if (isLoggedIn) {
        const permission = access?.permissions?.find(
            (el) => el?.path?.localeCompare(route) === 0
        );

        if (!permission)
            return <Navigate to="/401" state={{ from: location }} replace />;

        const res = neededAccess?.map((el) => permission.crud.includes(el));

        if (!res.includes(false)) return <Outlet />;
        return <Navigate to="/401" state={{ from: location }} replace />;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
