import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import UserStore from '../../store/UserStore';
import { observer } from 'mobx-react';
import { User } from '../../types/userTypes';
import { AuthPage } from '../AuthPage/AuthPage';
import { Routes, Route, Navigate } from 'react-router-dom';

const App: React.FunctionComponent = observer(() => {
    const userStore = new UserStore();
    const user: User | null = userStore.user;

    return (
        <>
            <ErrorBoundary fallback={<div>Something went wrong!</div>}>
                <Suspense fallback={<div>Loading...</div>}>
                    <header>
                        <h1>Eden</h1>
                    </header>
                    <main className='App'>
                        {user !== null ? (
                            <Routes>
                                <Route
                                    path='/'
                                    element={<Navigate to='/' replace />}
                                />
                                <Route path='*' element={<Navigate to='/' />} />
                            </Routes>
                        ) : (
                            <Routes>
                                <Route path='/login' element={<AuthPage />} />
                                <Route path='/signup' element={<AuthPage />} />
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
});

export default App;
