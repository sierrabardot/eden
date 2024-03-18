import { Suspense, useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthPage } from '../AuthPage/AuthPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NavBar } from '../../components/NavBar/NavBar';
import * as usersService from '../../utilities/users-service'
import './App.css';

function App() {
    const [user, setUser] = useState(() => {
        usersService.getUser();
    });

    return (
        <>
            <ErrorBoundary fallback={<div>Something went wrong!</div>}>
                <Suspense fallback={<div>Loading...</div>}>
                    <header>
                        <NavBar user={user} setUser={setUser} />
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
                                    element={
                                        <AuthPage
                                            user={user}
                                            setUser={setUser}
                                        />
                                    }
                                />
                                <Route
                                    path='/signup'
                                    element={
                                        <AuthPage
                                            user={user}
                                            setUser={setUser}
                                        />
                                    }
                                />
                                <Route
                                    path='*'
                                    element={<Navigate to='/login' />}
                                />
                            </Routes>
                        )}
                    </main>
                    <footer></footer>
                </Suspense>
            </ErrorBoundary>
        </>
    );
};

export default App;
