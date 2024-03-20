import { useState } from "react"
import { APIProvider, Map } from "@vis.gl/react-google-maps"
import { LocationInfo } from '../../components/LocationInfo/LocationInfo'
import { MarkerComponent } from "../../components/MarkerComponent/MarkerComponent";
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner'
import { useUserLocation } from "../../contexts/UserLocationProvider";
import { useActiveComp } from "../../contexts/ActiveCompProvider";

export function MapPage() {
    const { userLocation } = useUserLocation()
    const [error, setError] = useState(null)
    const [locationInfoOpen, setLocationInfoOpen] = useState(false)
    // TODO: dynamically render markers based on data provoded to map
    // const { activeComponentData } = useActiveComp()

    const center = userLocation ? userLocation : { lat: -37.8136, lng: 144.9631 };

    if (!userLocation) return <LoadingSpinner />

    return (
        <div className="row my-2">
            <div className="col-md-8">
                <APIProvider apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}>
                    <div className="container-fluid vh-100 h-50">
                        <Map defaultZoom={10} defaultCenter={center} mapId={import.meta.env.VITE_APP_GOOGLE_MAPS_MAP_ID} />
                    </div>
                </APIProvider>
                {error && error}
            </div>
            <div className="col-md-4">
                <LocationInfo />
            </div>
        </div>
    );
}