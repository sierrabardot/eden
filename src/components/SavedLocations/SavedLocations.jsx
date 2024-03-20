import { Link } from 'react-router-dom';
import { useSavedLocations } from "../../contexts/SavedLocationsProvider"
import { useLoading } from '../../contexts/LoadingProvider'

export function SavedLocations() {
    const { savedLocations } = useSavedLocations()
    const { loading } = useLoading()

    return (
        <div>
            <h1>Saved Locations</h1>
            <Link to='/map' className="btn btn-dark">See Locations on Map</Link>
            {!loading ? (
                <div className="container">
                    {savedLocations.map((location) => (
                        <div key={location.id}>{location.locations.description}</div>
                    ))}
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </div>
    )
}