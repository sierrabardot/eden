import { Link } from 'react-router-dom';
import { useSavedLocations } from "../../contexts/SavedLocationsProvider"

export function SavedLocations() {
    const { savedLocations } = useSavedLocations()

    return (
        <div>
            <h1>Saved Locations</h1>
            <Link to='/map' className="btn btn-dark">See Locations on Map</Link>
            {savedLocations ? (
                <div className="container">
                    {savedLocations.map((location) => (
                        <div key={location.id}>{location.locations.description}</div>
                    ))}
                </div>
            ) : (
                <p>Loading..</p>
            )}
        </div>
    )
}