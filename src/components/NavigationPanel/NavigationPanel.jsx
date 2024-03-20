import { Link } from 'react-router-dom'
import { logout } from '../../utilities/users-service'
import { useAuth } from '../../contexts/AuthProvider';
import { useActiveComp } from '../../contexts/ActiveCompProvider';
import * as locationsService from '../../utilities/locations-service'
import { useSavedLocations } from '../../contexts/SavedLocationsProvider';
import { useUserLocation } from '../../contexts/UserLocationProvider';

export function NavigationPanel() {
    const { setUser } = useAuth()
    const { setData } = useActiveComp()
    const { savedLocations } = useSavedLocations()
    const { userLocation } = useUserLocation()

        const navOptions = [
        { name: 'Explore', path: '/map' },
        { name: 'Saved Spots' },
        { name: 'Adventure Log' },
        { name: 'Search' },
        { name: 'Settings' },
        { name: 'Log Out', action: handleLogOut }
    ];

    function handleLogOut() {
        logout();
        setUser(null);
    }

    async function handleSetActiveComponent(navOption) {
        let data; 
        if (navOption === 'Search') {
            data = await locationsService.getNearbyLocations(userLocation)
        } else {
            data = savedLocations
        }
        setData(navOption, data)
        console.log(data)
    }    

    return (
        <div className="container-fluid text-center py-4">
            <div className="row justify-content-start">
                {navOptions.map(option => (
                    <div className="col-md-6" key={option.name}>
                        <div className="card m-2" onClick={option.action ? option.action : () => handleSetActiveComponent(option.name)}>
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