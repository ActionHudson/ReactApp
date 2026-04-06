import {
    Alert,
    LoadingOverlay,
    PasswordInput,
    Stack,
    TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

import { Colours } from '../Codex/ArcaneThreads/Colours';
import Button from '../Codex/Runes/Button/Button';

import { AuthContext } from './useAuth';

function LoginForm ({ setIsLoggedIn, setRole }) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            inputRef.current?.focus();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const handleLogin = async e => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('/aether/Login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok && data.status === 'success') {
                setIsLoggedIn(true);
                setRole(data.role);
                modals.closeAll();
            } else {
                setError(
                    data.message || 'Login failed. Please check your credentials.'
                );
            }
        } catch (err) {
            console.error(err);
            setError('A network error occurred while trying to log in.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={ handleLogin }>
            <Stack>
                <TextInput
                    ref={ inputRef }
                    label="Username"
                    value={ username }
                    onChange={ event => setUsername(event.currentTarget.value) }
                />

                <PasswordInput
                    label="Password"
                    value={ password }
                    onChange={ event => setPassword(event.currentTarget.value) }
                />

                <Button
                    label="Login"
                    isSubmit
                    isFullWidth
                    isLoading={ isLoading }
                />

                { error && (
                    <Alert color={ Colours.status.error } variant="light">
                        { error }
                    </Alert>
                ) }
            </Stack>
        </form>
    );
}

LoginForm.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
    setRole: PropTypes.func.isRequired
};

export const AuthProvider = ({ children }) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ role, setRole ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    const openLoginModal = () => modals.open({
        title: 'Login',
        centered: true,
        children: <LoginForm
            setIsLoggedIn={ setIsLoggedIn }
            setRole={ setRole }
        />
    });

    useEffect(() => {
        const verifyLoginStatus = async () => {
            try {
                const response = await fetch('/aether/check_auth.php', {
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.authenticated) {
                        setIsLoggedIn(true);
                        setRole(data.role);
                    } else {
                        setIsLoggedIn(false);
                        setRole(null);
                    }
                } else {
                    setIsLoggedIn(false);
                    setRole(null);
                }
            } catch (error) {
                console.error(error);
                setIsLoggedIn(false);
                setRole(null);
            } finally {
                setIsLoading(false);
            }
        };

        verifyLoginStatus();
    }, []);

    if (isLoading) {
        return (
            <LoadingOverlay
                visible={ true }
                zIndex={ 1000 }
                overlayProps={ {
                    radius: "sm",
                    blur: 1
                } }
                loaderProps={ {
                    size: 200,
                    color: Colours.accent.primary,
                    type: 'oval'
                } }
                style={ {
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0
                } }
            />
        );
    }

    return (
        <AuthContext.Provider value={ {
            isLoggedIn,
            setIsLoggedIn,
            role,
            setRole,
            openLoginModal
        } }>
            { children }
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};
