import axios from '../axios';
import useAuth from './useAuth';

const useLogout = () => {
    const { logout: resetUser } = useAuth();

    const logout = async () => {
        try {
            await axios('/auth/logout', { withCredentials: true });
        } catch (error) {
            console.log(error.message);
        } finally {
            resetUser();
        }
    };

    return logout;
};

export default useLogout;
