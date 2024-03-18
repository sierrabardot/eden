import { Link } from 'react-router-dom'
import navigationLinks from './navLinks.json'
import { logout } from '../../utilities/users-service'

export function NavigationPanel({ setUser, setActiveComponent }) {
    function handleLogOut() {
        logout();
        setUser(null);
    }
    
    return (
        <div className="container-fluid text-center border">
            <div className="row justify-content-start">
                {navigationLinks.map((link) => (
                <div className="col-6" key={link.id} >
                    {link.is_link ? (
                    <div className="card m-2">
                        <Link className="card-body text-decoration-none" to={link.path}>
                            <div className="card-title">{link.title}</div>
                        </Link>
                    </div>
                        ) : (
                            <div className="card m-2" onClick={() => {setActiveComponent(link.id)}}>
                                <div className="card-body">
                                <div className="card-title">{link.title}</div>
                                </div>
                            </div>
                        )}
                    </div>
                    ))}
                <div className="col-6">
                    <div className="card m-2" onClick={() => {handleLogOut()}}>
                        <div className="card-body">
                            <div className="card-title">Log Out</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}