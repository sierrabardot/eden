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
        {
            name: 'Explore',
            path: '/map',
            img: '/assets/card-backgrounds/card_explore.png'
        },
        {
            name: 'Saved Locations',
            img: '/assets/card-backgrounds/card_saved.png'
        },
        {
            name: 'Search',
            img: '/assets/card-backgrounds/card_search.png'
        },
        {
            name: 'Log Out',
            action: handleLogOut,
            img: '/assets/card-backgrounds/card_add.png'
        }
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
            data = savedLocations.filter(location => location.is_wishlist || location.is_favourite
            );
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
                    <div className="col-6" key={option.name}>
                    {option.path ? (
                        <div className="card shadow border-0 m-2 link">
                            <Link className="text-decoration-none" to={option.path}>
                            <img src={option.img} className="card-img-top" alt={option.name} />
                            <div className="card-body">
                                <div className="card-title m-0 text-black">{option.name}</div>
                            </div>
                            </Link>
                        </div>
                        ) : (
                        <div className="card shadow border-0 m-2 link" onClick={option.action ? option.action : () => handleSetActiveComponent(option.name)}>
                            <img src={option.img} className="card-img-top" alt={option.name} />
                                <div className="card-body">
                                    <div className="card-title">{option.name}</div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
