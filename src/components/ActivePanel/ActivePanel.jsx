import { HistoryLog } from "../HistoryLog/HistoryLog";
import { SavedLocations } from "../SavedLocations/SavedLocations";

export function ActivePanel({ activeComponent }) {
    return (
        <div>
            {activeComponent === 2 && <SavedLocations />}
            {activeComponent === 3 && <SavedLocations />}
            {activeComponent === 3 && <HistoryLog />}
        </div>
    )
}