import React, { FunctionComponent, Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { User } from '../../types/userTypes';
import { AuthPage } from '../AuthPage/AuthPage';
import { getUser } from '../../utilities/users-service';
import { Routes, Route, Navigate } from 'react-router-dom';

const App: FunctionComponent = () => {
    const [user, setUser] = useState<User | null>(() => {
        return getUser();
    });

    return (
        <>
            <ErrorBoundary fallback={<div>Something went wrong!</div>}>
                <Suspense fallback={<div>Loading...</div>}>
                    <header>
                        <h1>Eden</h1>
                        {user ? (
                            <div>Welcome, {user.name}</div>
                        ) : (
                            <div>No user</div>
                        )}
                    </header>
                    <main className='App'>
                        {user ? (
                            <Routes>
                                <Route
                                    path='/'
                                    element={<Navigate to='/' replace />}
                                />
                                <Route path='*' element={<Navigate to='/' />} />
                            </Routes>
                        ) : (
                            <Routes>
                                <Route
                                    path='/login'
                                    element={<AuthPage setUser={setUser} />}
                                />
                                <Route
                                    path='/signup'
                                    element={<AuthPage setUser={setUser} />}
                                />
                                <Route
                                    path='*'
                                    element={<Navigate to='/login' />}
                                />
                            </Routes>
                        )}
                    </main>
                </Suspense>
            </ErrorBoundary>
        </>
    );
};

export default App;
