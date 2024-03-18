import { useState } from "react"
import { NavigationPanel } from "../../components/NavigationPanel/NavigationPanel"
import { ActiveComponent } from "../../components/ActiveComponent/ActiveComponent"

export function Home({ setUser }) {
    const [activeComponent, setActiveComponent] = useState(null)
    return (
        <>
            <NavigationPanel setUser={setUser} setActiveComponent={setActiveComponent} activeComponent={activeComponent} />
            <ActiveComponent activeComponent={activeComponent} />
        </>
    )
}