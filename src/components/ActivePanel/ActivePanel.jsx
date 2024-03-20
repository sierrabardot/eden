import { SavedLocations } from "../SavedLocations/SavedLocations";
import { useActiveComp } from "../../contexts/ActiveCompProvider";

export function ActivePanel() {
    const { activeComponent } = useActiveComp()
    return (
        <div>
            {activeComponent ? (
                <div>TODO: create component</div>
            ) : (
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa assumenda nesciunt ipsam eveniet quis dignissimos, perspiciatis accusamus quibusdam sapiente ipsum omnis quod. Minus cupiditate aliquid tempore porro, consequuntur a repellendus.</div>
            )}
        </div>
    )
}