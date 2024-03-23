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
            img: '/assets/card-backgrounds/card_saved.png',
            path: '/saved'
        },
        {
            name: 'Find Nearby Locations',
            img: '/assets/card-backgrounds/card_search.png',
            path: '/nearby'
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
        if (navOption === 'Saved Locations') {
            try {
                data = savedLocations.filter(location => location.is_favourite);
                const apiLocationData = await Promise.all(data.map(async (location) => {
                    return {
                        ...location,
                        locationData: await fetchLocationData(location.loc_id)
                    }
                }));
                const dataWithPlantNames = await Promise.all(apiLocationData.map(async (location) => {
                    location.locationData.type_names = await fetchPlantNames(location.locationData.type_ids);
                    return location;
                }));
                setData(navOption, dataWithPlantNames);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        } else {
            try {
                const nearbyLocations =  await locationsService.getNearbyLocations(userLocation);
                const apiLocationData = await Promise.all(nearbyLocations.map(async (location) => {
                    return {
                        ...location,
                        locationData: await fetchLocationData(location.id)
                    }
                }))
                const dataWithPlantNames = await Promise.all(apiLocationData.map(async (location) => {
                    location.type_names = await fetchPlantNames(location.type_ids);
                    return location;
                }));
                setData(navOption, dataWithPlantNames);
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false);
            }
        }
    }

    async function fetchLocationData(id) {
        try {
            const data = await locationsService.getLocationData(id);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async function fetchPlantNames(ids) {
        try {
            const data = await locationsService.getPlantNames(ids);
            return data;
        } catch (error) {
            console.error(error)
        }
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