import { useState, useEffect } from "react"
import { APIProvider, AdvancedMarker, Map, Marker } from "@vis.gl/react-google-maps"
import { useUserLocation } from "../../contexts/UserLocationProvider";
// import { useActiveComp, ActiveCompProvider } from "../../contexts/ActiveCompProvider"
import { NavBar } from "../../components/NavBar/NavBar";
import { getNearbyLocations } from "../../utilities/locations-service";

export function MapPage() {
    const { userLocation } = useUserLocation()
    const [error, setError] = useState(null)
    const [open, setOpen] = useState(false)
    const [locations, setLocations] = useState([])
    useEffect(() => {
        const getLocations = async (userLocation) => {
            const locations = await getNearbyLocations(userLocation)
            console.log(locations)

            setLocations(locations)
        }
        getLocations(userLocation)

    }, [])
    // const { activeComponentData } = useActiveComp()
    // console.log(activeComponentData)
    
    // TODO: dynamically render markers based on data provoded to map
    
    const center = userLocation ? userLocation : { lat: -37.8136, lng: 144.9631 };

    return (
        <div className="row">
            <header className="mb-4">
                <NavBar />
            </header>
            <div className="vh-100">
                <APIProvider apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}>
                    <div className="container-fluid vh-100">
                        <Map defaultZoom={10} defaultCenter={center} mapId={import.meta.env.VITE_APP_GOOGLE_MAPS_MAP_ID}>
                            {locations.map((l) => (
                                <AdvancedMarker position={{ lat: l.lat, lng: l.lng }} />
                            ))}
                        </Map>
                    </div>
                </APIProvider>
                {error && error}
            </div>
        </div>
    );
}