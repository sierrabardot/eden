import { NavLink } from 'react-router-dom';

export function NavBar() {

    return (
        <nav className='navbar bg-opacity-10 bg-light-green'>
            <div className='container-fluid d-flex flex-row justify-content-between'>
                <NavLink to='/'>
                    <img src="/assets/logo_white.png" className='logo-dashboard' alt="Eden Logo"/>
                </NavLink>
                <div className='flex-row d-flex align-items-center '>
                    <div className='text-red h3 m-0'>|</div>
                    <NavLink to='/' className="text-decoration-none">
                        <div className='text-white mx-2 mx-md-5 fw-semibold'>
                            Dashboard
                        </div>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}
