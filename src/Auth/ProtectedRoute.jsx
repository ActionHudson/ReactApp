import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { notify } from '../Codex/ArcaneThreads/Notify';

import { useAuth } from './useAuth';

export default function ProtectedRoute ({ children, requiredRole = null }) {
    const { isLoggedIn, role } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            notify.error('Unauthorized', 'You must be logged in to access this area.');
        } else if (requiredRole && role !== requiredRole) {
            notify.error('Access Denied', 'You do not have the required permissions.');
        }
    }, [ isLoggedIn, role, requiredRole ]);

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    requiredRole: PropTypes.string
};
