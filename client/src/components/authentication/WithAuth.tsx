import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../utils/context/auth';


const WithAuth = ({ children }: any) => {
    const { user } = useContext(AuthContext);
    if (user?.isAdmin && user?.isVerified) {
        return children;
    }
    return <Navigate to={'/sentinel/ukwingila'} replace />;
};

export default WithAuth;
