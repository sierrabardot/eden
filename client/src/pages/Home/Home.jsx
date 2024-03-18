import { useState } from "react"
import { NavigationPanel } from "../../components/NavigationPanel/NavigationPanel"
import { ActiveComponent } from "../../components/ActiveComponent/ActiveComponent"

export function Home({ setUser }) {
    const [activeComponent, setActiveComponent] = useState(null)

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-7">
                    <NavigationPanel setUser={setUser} setActiveComponent={setActiveComponent} />
                </div>
                <div className="col-md-5">
                    <ActiveComponent activeComponent={activeComponent} />
                </div>
            </div>
        </div>
    )
}