import { Suspense, useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthPage } from '../AuthPage/AuthPage';
import { MapPage } from '../Map/Map'
import { Routes, Route, Navigate } from 'react-router-dom';
import { NavBar } from '../../components/NavBar/NavBar';
import { Home } from '../Home/Home';
import * as usersService from '../../utilities/users-service'
import './App.css';

function App() {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const checkLoggedIn = async () => {
            const user = await usersService.getUser()
            setUser(user)
        }
        checkLoggedIn()
    }, [])
    
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
                                <Route path='/home' element={<Home setUser={setUser} />} />
                                <Route path='/map' element={<MapPage />} />
                                <Route path='*' element={<Navigate to='/home' />} />
                            </Routes>
                        ) : (
                            <Routes>
                                <Route path='/login' element={<AuthPage user={user} setUser={setUser} />} />
                                <Route path='/signup' element={<AuthPage user={user} setUser={setUser} />} />
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
