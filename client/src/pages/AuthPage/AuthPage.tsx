import React from 'react';
import { useLocation } from 'react-router-dom';
import { SignUpForm } from '../../components/SignUpForm/SignUpForm';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import UserStore from '../../store/UserStore';

export function AuthPage() {
    const location = useLocation();
    const userStore = new UserStore();

    return (
        <div>
            {location.pathname === '/login' ? (
                <LoginForm userStore={userStore} />
            ) : (
                <SignUpForm userStore={userStore} />
            )}
        </div>
    );
}
