import { createContext } from 'react';

export default createContext({
    user: {},
    isLoggedIn: false,
    setUser: () => {},
    login: () => {},
    logout: () => {},
    isAllowed: () => {},
});
