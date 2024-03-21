import { Link } from 'react-router-dom'
import { logout } from '../../utilities/users-service'
import { useAuth } from '../../contexts/AuthProvider';
import { useActiveComp } from '../../contexts/ActiveCompProvider';
import * as locationsService from '../../utilities/locations-service'
import { useSavedLocations } from '../../contexts/SavedLocationsProvider';
import { useUserLocation } from '../../contexts/UserLocationProvider';
import { useLoading } from '../../contexts/LoadingProvider';

export function NavigationComponent() {
    const { setUser } = useAuth()
    const { setData } = useActiveComp()
    const { savedLocations } = useSavedLocations()
    const { userLocation } = useUserLocation()
    const { setLoading } = useLoading()

    const navOptions = [
        { name: 'Explore', path: '/map' },
        { name: 'Saved Locations' },
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
        setLoading(true);
        let data;

        if (navOption === 'Search') {
            const nearbyLocations =  await locationsService.getNearbyLocations(userLocation);
            const locationPromises = nearbyLocations.map(async (location) => {
                return {
                    ...location,
                    locationData: await fetchLocationData(location.id)
                }
            })
            data = await Promise.all(locationPromises);
            await Promise.all(data.map(async (location) => {
                location.type_names = await fetchPlantNames(location.type_ids);
            }));
        } else {
            data = savedLocations.filter(location => {
                if (navOption === 'Adventure Log') {
                    return location.has_visited;
                } else {
                    return location.is_wishlist || location.is_favourite;
                }
            });
            await Promise.all(data.map(async (location) => {
                location.locations.type_names = await fetchPlantNames(location.locations.type_ids);
            }));
        }

        setData(navOption, data);
        setLoading(false);
    }

    async function fetchLocationData(id) {
        const data = await locationsService.getLocationData(id);
        return data;
    }

    async function fetchPlantNames(ids) {
        const data = await locationsService.getPlantNames(ids);
        return data;
    }

    return (
        <div className="container-fluid text-center py-4">
            <div className="row justify-content-start">
                {navOptions.map(option => (
                    <div className="col-md-6" key={option.name}>
                        <div className="card m-2 link" onClick={option.action ? option.action : () => handleSetActiveComponent(option.name)}>
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