import { Link } from 'react-router-dom'
import { logout } from '../../utilities/users-service'
import { useAuth } from '../../contexts/AuthProvider';
import { useActiveComp } from '../../contexts/ActiveCompProvider';

export function NavigationPanel() {
    const { setUser } = useAuth()
    const { setActiveComponent } = useActiveComp()

        const navOptions = [
        { name: 'Explore Map', path: '/map' },
        { name: 'Saved Locations' },
        { name: 'History' },
        { name: 'Search' },
        { name: 'Settings' },
        { name: 'Log Out', action: handleLogOut }
    ];

    function handleLogOut() {
        logout();
        setUser(null);
    }

    return (
        <div className="container-fluid text-center border">
            <div className="row justify-content-start">
                {navOptions.map(option => (
                    <div className="col-md-6" key={option.name}>
                        <div className="card m-2" onClick={option.action ? option.action : () => setActiveComponent(option.name)}>
                            {option.path ? (
                                <Link className="card-body text-decoration-none" to={option.path}>
                                    <div className="card-title">{option.name}</div>
                                </Link>
                            ) : (
                                <div className="card-body">
                                    <div className="card-title">{option.name}</div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}