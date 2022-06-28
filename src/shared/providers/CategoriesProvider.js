import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CategoriesContext from '../contexts/CategoriesContext';
import useAxios from '../hooks/useAxios';

const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const { axiosFetch } = useAxios();
    const location = useLocation();

    const pathname = location.pathname.includes('recipes')
        ? '/recipes'
        : '/ingredients';

    useEffect(() => {
        const getCategories = async () => {
            const data = await axiosFetch({
                url: `${pathname}/categories`,
            });

            setCategories(data);
        };

        getCategories();
    }, [axiosFetch, pathname]);

    return (
        <CategoriesContext.Provider value={{ categories, setCategories }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export default CategoriesProvider;
