import { NavigationComponent } from "../../components/NavigationComponent/NavigationComponent"
import { SavedLocationsProvider } from "../../contexts/SavedLocationsProvider"
import { ActiveCompProvider } from "../../contexts/ActiveCompProvider"
import { useUserLocation } from "../../contexts/UserLocationProvider"
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner"
import { NavBar } from "../../components/NavBar/NavBar"
import { Outlet } from "react-router-dom"

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
                        <div className="col-md-5 gradient">
                            <NavigationComponent />
                        </div>
                        <div className="col-md-7 bg-dark-green min-vh text-white">
                            <Outlet />
                        </div>
                    </div>
                </div>
                ) : (
                    <div className="d-flex text-white bg-dark-green min-vh align-items-center flex-column" >
                        <LoadingSpinner className="mt-4" />
                        <p>Please enable location services to continue.</p>
                    </div>
                )}
            </ActiveCompProvider>
        </SavedLocationsProvider>
    )
}