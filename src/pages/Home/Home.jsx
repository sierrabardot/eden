import { NavigationPanel } from "../../components/NavigationPanel/NavigationPanel"
import { ActivePanel } from "../../components/ActivePanel/ActivePanel"
import { SavedLocationsProvider } from "../../contexts/SavedLocationsProvider"
import { ActiveCompProvider } from "../../contexts/ActiveCompProvider"

export function Home() {
    
    return (
        <SavedLocationsProvider>
            <ActiveCompProvider>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <NavigationPanel />
                        </div>
                        <div className="col-md-8">
                            <ActivePanel />
                        </div>
                    </div>
                </div>
            </ActiveCompProvider>
        </SavedLocationsProvider>
    )
}