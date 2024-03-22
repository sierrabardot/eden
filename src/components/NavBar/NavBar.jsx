import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';

export function NavBar() {
    const {user} = useAuth()

    return (
        <nav className='navbar bg-opacity-10 bg-light-green'>
            <div className='container-fluid d-flex flex-row justify-content-between'>
                <NavLink to='/'>
                    <img src="/assets/logo_white.png" className='logo-dashboard' alt="Eden Logo"/>
                </NavLink>
                <div className='flex-row d-flex'>
                    <NavLink to='/' className="text-decoration-none">
                        <div className='text-white fw-semibold'>
                            Dashboard
                        </div>
                    </NavLink>
                    <div className='text-white mx-5'>Welcome, {user.user_metadata.username}</div>
                </div>
            </div>
        </nav>
    );
}
