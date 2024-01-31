import { Route, useLocation } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { FullRedirect } from './FullRedirect';

const AdminRoute = ({ component, render, ...config }) => {
    const { user } = useContext(AuthContext);
    const { pathname } = useLocation();

    return (
        <Route
            {...config}
            render={(props) => {
                if (!user) {
                    return (
                        <FullRedirect
                            to={{
                                pathname: '/login',
                                search: buildQueryString({ next: pathname }),
                            }}
                        />
                    );
                }
                return Component ? <Component {...props} /> : render();
            }}
        />
    );
};
