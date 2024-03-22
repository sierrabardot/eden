import { useState } from "react"
import { APIProvider, Map } from "@vis.gl/react-google-maps"
import { LocationInfo } from '../../components/LocationInfo/LocationInfo'
import { MarkerComponent } from "../../components/MarkerComponent/MarkerComponent";
import { useUserLocation } from "../../contexts/UserLocationProvider";
import { useActiveComp } from "../../contexts/ActiveCompProvider";
import { NavBar } from "../../components/NavBar/NavBar";

export function MapPage() {
    const { userLocation } = useUserLocation()
    const [error, setError] = useState(null)
    const [locationInfoOpen, setLocationInfoOpen] = useState(false)
    // TODO: dynamically render markers based on data provoded to map
    // const { activeComponentData } = useActiveComp()

    const center = userLocation ? userLocation : { lat: -37.8136, lng: 144.9631 };

    return (
        <div className="row">
            <header className="mb-4">
                <NavBar />
            </header>
            <div className="col-md-7">
                <APIProvider apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}>
                    <div className="container-fluid min-vh">
                        <Map defaultZoom={10} defaultCenter={center} mapId={import.meta.env.VITE_APP_GOOGLE_MAPS_MAP_ID} />
                    </div>
                </APIProvider>
                {error && error}
            </div>
            <div className="col-md-5">
                <LocationInfo />
            </div>
        </div>
    );
}