import axios from '../axios';
import useAuth from './useAuth';

const useRefresh = () => {
    const { login } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true,
        });

        login({ ...response.data.user, token: response.data.token });

        return response.data.token;
    };

    return refresh;
};

export default useRefresh;
