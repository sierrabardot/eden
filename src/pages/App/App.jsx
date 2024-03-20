import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthPage } from '../AuthPage/AuthPage';
import { MapPage } from '../Map/Map';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NavBar } from '../../components/NavBar/NavBar';
import { Home } from '../Home/Home';
import './App.css';
import { useAuth } from '../../contexts/AuthProvider';
import { LoadingProvider } from '../../contexts/LoadingProvider';
import { UserLocationProvider } from '../../contexts/UserLocationProvider';

function App() {
    const { user } = useAuth();
    return (
        <>
            <ErrorBoundary fallback={<div>Something went wrong!</div>}>
                <Suspense fallback={<div>Loading...</div>}>
                    <LoadingProvider>
                        <UserLocationProvider>
                            <header>
                                <NavBar />
                            </header>
                            <main className='App'>
                                {user ? (
                                    <Routes>
                                        <Route path='/home' element={<Home />} />
                                        <Route path='/map' element={<MapPage />} />
                                        <Route path='*' element={<Navigate to='/home' />} />
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
                        </UserLocationProvider>
                    </LoadingProvider>
                </Suspense>
            </ErrorBoundary>
        </>
    );
}

export default App;