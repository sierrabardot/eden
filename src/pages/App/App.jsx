import { ErrorBoundary } from 'react-error-boundary';
import { AuthPage } from '../AuthPage/AuthPage';
import { MapPage } from '../Map/Map';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../Home/Home';
import { useAuth } from '../../contexts/AuthProvider';
import { LoadingProvider } from '../../contexts/LoadingProvider';
import { UserLocationProvider } from '../../contexts/UserLocationProvider';

function App() {
    const { user } = useAuth();
    return (
        <>
            <ErrorBoundary fallback={<div>Something went wrong!</div>}>
                <LoadingProvider>
                    <UserLocationProvider>
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
            </ErrorBoundary>
        </>
    );
}

export default App;