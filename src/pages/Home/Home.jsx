import { useState } from "react"
import { NavigationPanel } from "../../components/NavigationPanel/NavigationPanel"
import { ActivePanel } from "../../components/ActivePanel/ActivePanel"
import { SavedLocationsProvider } from "../../contexts/SavedLocationsProvider"

export function Home() {
    const [activeComponent, setActiveComponent] = useState(null)
    return (
        <SavedLocationsProvider>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-7">
                            <NavigationPanel setActiveComponent={setActiveComponent} />
                    </div>
                    <div className="col-md-5">
                        <ActivePanel activeComponent={activeComponent} />
                    </div>
                </div>
            </div>
        </SavedLocationsProvider>
    )
}