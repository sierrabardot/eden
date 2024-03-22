import { useState } from "react"
import { APIProvider, Map } from "@vis.gl/react-google-maps"
import { MarkerComponent } from "../../components/MarkerComponent/MarkerComponent";
import { useUserLocation } from "../../contexts/UserLocationProvider";
import { ActiveCompProvider } from "../../contexts/ActiveCompProvider"
import { NavBar } from "../../components/NavBar/NavBar";

export function MapPage() {
    const { userLocation } = useUserLocation()
    const [error, setError] = useState(null)
    // const { activeComponentData } = useActiveComp()
    // console.log(activeComponentData)
    
    // TODO: dynamically render markers based on data provoded to map
    
    const center = userLocation ? userLocation : { lat: -37.8136, lng: 144.9631 };

    return (
        <ActiveCompProvider>
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
                </div>
            </div>
        </ActiveCompProvider>
    );
}