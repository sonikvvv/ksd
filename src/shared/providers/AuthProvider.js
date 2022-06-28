import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import SearchedRoute from '../utils/SearchedRoute';

const AuthProvider = ({ children }) => {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (user) => {
        setUser(user);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
    };

    const isAllowed = (crud, path = null, returnPath = false) => {
        const route = SearchedRoute(path || location.pathname);
        const foundPermission = user?.access?.permissions?.find(
            (el) => el?.path?.localeCompare(route) === 0
        );

        return returnPath
            ? foundPermission
            : foundPermission?.crud?.includes(crud);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn,
                login,
                logout,
                setUser,
                isAllowed,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
