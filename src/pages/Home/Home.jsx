import { NavigationComponent } from "../../components/NavigationComponent/NavigationComponent"
import { ActivePanel } from "../../components/ActivePanel/ActivePanel"
import { SavedLocationsProvider } from "../../contexts/SavedLocationsProvider"
import { ActiveCompProvider } from "../../contexts/ActiveCompProvider"
import { useUserLocation } from "../../contexts/UserLocationProvider"
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner"

export function Home() {
    const { userLocation } = useUserLocation()
    
    return (
        <SavedLocationsProvider>
            <ActiveCompProvider>
                {userLocation ? (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <NavigationComponent />
                        </div>
                        <div className="col-md-8">
                            <ActivePanel />
                        </div>
                    </div>
                </div>
                ) : (
                    <div className="d-flex justify-content-center align-items-center  flex-column " >
                        <LoadingSpinner className="d-flex" />
                        <p>To provide you with the best experience, we need to know where you are!</p>
                        <p>Please allow location services to continue.</p>
                    </div>
                )}
            </ActiveCompProvider>
        </SavedLocationsProvider>
    )
}