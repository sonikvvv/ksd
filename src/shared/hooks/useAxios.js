import { useState, useEffect, useCallback } from 'react';

import axios from '../axios';
import useAuth from './useAuth';
import PopupAlert from '../components/alert/PopupAlert';
import useRefresh from './useRefresh';
import { useLocation, useNavigate } from 'react-router-dom';

const useAxios = () => {
    const refresh = useRefresh();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [controller, setController] = useState();
    const { user, logout, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const requestIntercept = axios.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${user.token}`;
                }

                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;

                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;

                    try {
                        const newAccessToken = await refresh();

                        prevRequest.headers[
                            'Authorization'
                        ] = `Bearer ${newAccessToken}`;

                        return axios(prevRequest);
                    } catch (error) {
                        logout();
                        navigate('/login', {
                            state: { from: location },
                            replace: true,
                        });
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestIntercept);
            axios.interceptors.response.eject(responseIntercept);
        };
    }, [user, refresh, navigate, location, logout]);

    const axiosFetch = useCallback(
        async ({ method = 'get', url, data = {}, options = {} }) => {
            try {
                setLoading(true);
                const ctrl = new AbortController();
                setController(ctrl);

                const res = await axios({
                    url,
                    method,
                    data,
                    ...options,
                    withCredentials: isLoggedIn,
                    signal: ctrl.signal,
                });

                return res.data;
            } catch (err) {
                console.log(err);

                setError(err?.response?.data || { message: err.massage });
            } finally {
                setLoading(false);
            }
        },
        [isLoggedIn]
    );

    useEffect(() => {
        return () => controller && controller.abort();
    }, [controller]);

    return {
        error,
        loading,
        axiosFetch,
        popup: error && (
            <PopupAlert error={error} clearError={() => setError(null)} />
        ),
    };
};

export default useAxios;
