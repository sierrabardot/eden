import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

export function MarkerComponent({ location }) {
    return (
        <AdvancedMarker position={location} onClick={() => setOpen(true)}>
            <Pin background={"gold"} glyphColor={"black"} borderColor={"black"} />
        </AdvancedMarker>
    )
}

// Sample markers - use within Map component
// <AdvancedMarker position={location} onClick={() => setOpen(true)}>
//     <Pin background={"gold"} glyphColor={"black"} borderColor={"black"} />
//     <Pin background={"red"} glyphColor={"black"} borderColor={"black"} />
// </AdvancedMarker>
// {open && <InfoWindow onCloseClick={() => setOpen(false)}><p>Hello from Melbourne!</p></InfoWindow>}