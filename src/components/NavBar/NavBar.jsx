import React from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../../utilities/users-service';

export function NavBar({ user, setUser }) {
    function handleLogOut() {
        logout();
        setUser(null);
    }

    return (
        <nav className='navbar navbar-expand-lg bg-body-tertiary'>
            <div className='container'>
                <NavLink to='/' className='text-decoration-none'>
                    <div className='navbar-brand mb-0 h1'>Eden</div>
                </NavLink>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
            </div>
            {!user && (
                <div
                    className='collapse navbar-collapse'
                    id='navbarNavAltMarkup'>
                    <ul className='navbar-nav gap-3'>
                        <li className='nav-item'>
                            <NavLink
                                className={({ isActive }) =>
                                    'nav-link' + (isActive ? ' active' : '')
                                }
                                to='/signup'>
                                Sign Up
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink
                                className={({ isActive }) =>
                                    'nav-link' + (isActive ? ' active' : '')
                                }
                                to='/login'>
                                Log In
                            </NavLink>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
