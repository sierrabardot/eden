import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as locationsService from '../../utilities/locations-service'

export function SavedLocations() {
    const [savedLocations, setSavedLocations] = useState([])

    useEffect(() => {
        const fetchLocations = async () => {
            const locations = await locationsService.getSavedLocations();
            setSavedLocations(locations)
        }
        fetchLocations()
        }, [])
        console.log(savedLocations)

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