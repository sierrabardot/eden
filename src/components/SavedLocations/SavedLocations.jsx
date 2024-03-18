import { useEffect, useState } from 'react';
import * as locationsService from '../../utilities/locations-service'

export function SavedLocations() {
    const [savedLocations, setSavedLocations] = useState([])

    useEffect(() => {
        const fetchLocations = async () => {
            const locations = await locationsService.fetchUserLocations();
            setSavedLocations(locations)
        }
        fetchLocations()
        }, [])

    return (
        <div>
            <h1>Saved Locations</h1>
            {savedLocations && (
                <div className="container">
                    {savedLocations.map((location) => (
                        <>
                            <p>{location.lat}</p>
                            <p>{location.lng}</p>
                        </>
                    ))}
                </div>
            )}
        </div>
    )
}