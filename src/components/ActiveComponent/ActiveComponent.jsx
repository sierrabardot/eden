import { HistoryLog } from "../HistoryLog/HistoryLog";
import { AddLocationForm } from "../AddLocationForm/AddLocationForm";
import { SavedLocations } from "../SavedLocations/SavedLocations";

export function ActiveComponent({ activeComponent }) {
    return (
        <div>
            {activeComponent === "1_saved" && <SavedLocations />}
            {activeComponent === "3_add_location" && <AddLocationForm />}
            {activeComponent === "4_history" && <HistoryLog />}
        </div>
    )
}