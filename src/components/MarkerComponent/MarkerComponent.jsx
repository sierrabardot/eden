import { AdvancedMarker, InfoWindow, Pin } from "@vis.gl/react-google-maps"
import { useState } from "react";

export function MarkerComponent({ location }) {
    const [open, setOpen] = useState(false)
    return (
        <>
            <AdvancedMarker position={{ lat: location.lat, lng: location.lng }} onClick={() => setOpen(true)}>
            <Pin />
            </AdvancedMarker>

            {open && <InfoWindow position={{ lat: location.lat, lng: location.lng }} onCloseClick={() => {setOpen(false)}}>
                <div className="my-2">{location.locationData.city}, {location.locationData.state}</div>
                <div>{location.locationData.description}</div>
                </InfoWindow>}
        </>
    )
}