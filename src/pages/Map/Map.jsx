import { useState, useEffect } from "react"
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps"
import { LocationInfo } from '../../components/LocationInfo/LocationInfo'

export function MapPage() {
    const [userLocation, setUserLocation] = useState(null);
    const [error, setError] = useState(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                    });
                },
                (error) => {
                    setError('Error getting location: ', error);
                });
            } else {
                setError('Geolocation is not supported by this browser.');
            }};
            getLocation();
    }, []);

    const center = userLocation ? userLocation : { lat: 37.8136, lng: 144.9631 };

    return (
        <div className="row my-2">
            <div className="col-md-8">
                {userLocation ? (
                    <div>
                        <APIProvider apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}>
                            <div className="container-fluid vh-100 h-50">
                                <Map defaultZoom={10} defaultCenter={center} mapId={import.meta.env.VITE_APP_GOOGLE_MAPS_MAP_ID}>                                    
                                </Map>
                            </div>
                        </APIProvider>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            {error && error}
        </div>
        <div className="col-md-4">
            <LocationInfo />
        </div>
    </div>
  );
}

// Sample markers - use within Map component
// <AdvancedMarker position={mapBounds} onClick={() => setOpen(true)}>
//     <Pin background={"gold"} glyphColor={"black"} borderColor={"black"} />
//     <Pin background={"red"} glyphColor={"black"} borderColor={"black"} />
// </AdvancedMarker>
// {open && <InfoWindow position={mapBounds} onCloseClick={() => setOpen(false)}><p>Hello from Melbourne!</p></InfoWindow>}