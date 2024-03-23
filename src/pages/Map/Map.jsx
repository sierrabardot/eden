import { useState, useEffect } from "react"
import { APIProvider, AdvancedMarker, InfoWindow, Map, Marker } from "@vis.gl/react-google-maps"
import { useUserLocation } from "../../contexts/UserLocationProvider";
import { NavBar } from "../../components/NavBar/NavBar";
import { getNearbyLocations, getLocationData, getPlantNames } from "../../utilities/locations-service";
import { MarkerComponent } from "../../components/MarkerComponent/MarkerComponent";

export function MapPage() {
    const { userLocation } = useUserLocation()
    const [error, setError] = useState(null)
    const [locations, setLocations] = useState([])

    useEffect(() => {
        const getLocations = async (userLocation) => {
            const nearbyLocations =  await getNearbyLocations(userLocation);
            const apiLocationData = await Promise.all(nearbyLocations.map(async (location) => {
                return {
                    ...location,
                    locationData: await getLocationData(location.id)
                }
            }))
            setLocations(apiLocationData);
            console.log(locations)
        }
        getLocations(userLocation)
    }, [])
    
    const center = userLocation ? userLocation : { lat: -37.8136, lng: 144.9631 };

    return (
        <div className="row">
            <header className="mb-4">
                <NavBar />
            </header>
            <div className="vh-100">
                <APIProvider apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}>
                    <div className="container-fluid vh-100">
                        <Map defaultZoom={12} defaultCenter={center} mapId={import.meta.env.VITE_APP_GOOGLE_MAPS_MAP_ID}>
                            {locations.map((l) => (
                                <MarkerComponent key={l.id} location={l} />
                            ))}
                        </Map>
                    </div>
                </APIProvider>
                {error && error}
            </div>
        </div>
    );
}