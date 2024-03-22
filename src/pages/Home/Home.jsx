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
                        <div className="col-md-5 gradient min-vh-100">
                            <NavigationComponent />
                        </div>
                        <div className="col-md-7 min-vh-100 bg-dark-green text-white">
                            <ActivePanel />
                        </div>
                    </div>
                </div>
                ) : (
                    <div className="d-flex text-white bg-dark-green vh-100 align-items-center flex-column" >
                        <LoadingSpinner className="mt-4" />
                        <p>Please allow location services to continue.</p>
                    </div>
                )}
            </ActiveCompProvider>
        </SavedLocationsProvider>
    )
}