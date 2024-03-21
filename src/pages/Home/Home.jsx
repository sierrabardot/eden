import { NavigationComponent } from "../../components/NavigationComponent/NavigationComponent"
import { ActivePanel } from "../../components/ActivePanel/ActivePanel"
import { SavedLocationsProvider } from "../../contexts/SavedLocationsProvider"
import { ActiveCompProvider } from "../../contexts/ActiveCompProvider"
import { useUserLocation } from "../../contexts/UserLocationProvider"
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner"
import { NavBar } from "../../components/NavBar/NavBar"

export function Home() {
    const { userLocation } = useUserLocation()
    
    return (
        <SavedLocationsProvider>
            <ActiveCompProvider>
                <header>
                    <NavBar />
                </header>
                {userLocation ? (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-5">
                            <NavigationComponent />
                        </div>
                        <div className="col-md-7">
                            <ActivePanel />
                        </div>
                    </div>
                </div>
                ) : (
                    <div className="d-flex justify-content-center align-items-center flex-column " >
                        <LoadingSpinner />
                        <p>To provide you with the best experience, we need to know where you are.</p>
                        <p>Please allow location services to continue.</p>
                    </div>
                )}
            </ActiveCompProvider>
        </SavedLocationsProvider>
    )
}