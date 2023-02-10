import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LoaderCircular } from '../../components/global/LoaderCircular';
import { userAPI } from '../../store/api/user';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { selectUserName, setUser } from '../../store/reducers/UserSlice';

export const RequireAuth = () => {
    const dispatch = useAppDispatch();
    const userName = useAppSelector(selectUserName);
    const hasAuth = localStorage.getItem('token') && userName ? true : false;

    // Проверка авторизации
    const [isCheckAuth, setIsCheckAuth] = useState(false);
    const responseUserMe = localStorage.getItem('token') ? userAPI.useMeQuery() : null;
    useEffect(() => {
        if (responseUserMe?.data) {
            dispatch(setUser(responseUserMe.data));
        } else if (responseUserMe?.error) {
            localStorage.removeItem('token');
        }
        if (responseUserMe === null || !responseUserMe.isLoading) {
            setIsCheckAuth(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [responseUserMe]);

    return isCheckAuth ? hasAuth ? <Outlet /> : <Navigate to="/login" replace /> : <LoaderCircular />;
};
