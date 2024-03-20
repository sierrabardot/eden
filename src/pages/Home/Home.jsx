import { useState } from "react"
import { NavigationPanel } from "../../components/NavigationPanel/NavigationPanel"
import { ActivePanel } from "../../components/ActivePanel/ActivePanel"

export function Home({ setUser }) {
    const [activeComponent, setActiveComponent] = useState(null)

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-7">
                    <NavigationPanel setUser={setUser} setActiveComponent={setActiveComponent} />
                </div>
                <div className="col-md-5">
                    <ActivePanel activeComponent={activeComponent} />
                </div>
            </div>
        </div>
    )
}