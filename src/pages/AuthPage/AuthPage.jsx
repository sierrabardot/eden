import React from 'react';
import { useLocation } from 'react-router-dom';
import { SignUpForm } from '../../components/SignUpForm/SignUpForm';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { LandingPageInfo } from '../../components/LandingPageInfo/LandingPageInfo'

export function AuthPage() {
    const location = useLocation();

    return (
        <div className='container-fluid vh-100'>
            <div className="row d-flex">
                <div className="col-md-7 d-flex justify-content-center align-items-center bg-image vh-100 position-relative">
                <img src="/assets/logo_white.png" className='logo-dashboard position-absolute top-0 start-0 p-3' alt="" />
                    <div className='col-md-9'>
                        {location.pathname === '/login' && <LoginForm />}
                        {location.pathname === '/signup' && <SignUpForm />}
                    </div>
                </div>
                <div className="col-md-5 p-0">
                    <LandingPageInfo />
                </div>
            </div>
        </div>
    );
}