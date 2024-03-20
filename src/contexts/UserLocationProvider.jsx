import { createContext, useContext, useState, useEffect } from 'react';

const UserLocationContext = createContext({})

export const UserLocationProvider = ({ children }) => {
    const [userLocation, setUserLocation] = useState(null)
    
    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setUserLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        });
                    },
                    (error) => {
                        console.error('Error getting location: ' + error.message);
                    }
                );
            } else {
                throw new Error('Geolocation is not supported by this browser.');
            }
        };
        getLocation();
    }, []);
    console.log(userLocation)

    return (
        <UserLocationContext.Provider value={{userLocation, setUserLocation}}>
            {children}
        </UserLocationContext.Provider>
    )
}

export const useUserLocation = () => {
    return useContext(UserLocationContext)
}