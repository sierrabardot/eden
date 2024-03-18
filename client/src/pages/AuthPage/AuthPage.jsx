import React from 'react';
import { useLocation } from 'react-router-dom';
import { SignUpForm } from '../../components/SignUpForm/SignUpForm';
import { LoginForm } from '../../components/LoginForm/LoginForm';

export function AuthPage({ setUser, user }) {
    const location = useLocation();

    return (
        <div>
            {location.pathname === '/login' ? (
                <LoginForm setUser={setUser} user={user} />
            ) : (
                <SignUpForm setUser={setUser} user={user} />
            )}
        </div>
    );
}
