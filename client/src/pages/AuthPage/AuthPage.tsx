import React from 'react';
import { useLocation } from 'react-router-dom';
import { SignUpForm } from '../../components/SignUpForm/SignUpForm';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { Props } from '../../types/userTypes';

export function AuthPage({ setUser }: Props) {
    const location = useLocation();

    return (
        <div>
            {location.pathname === '/login' ? (
                <LoginForm setUser={setUser} />
            ) : (
                <SignUpForm setUser={setUser} />
            )}
        </div>
    );
}
