import { useEffect, useState } from 'react'
import { getAddress } from '../../utilities/locations-service'
import { useLoading } from '../../contexts/LoadingProvider'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'
import { updateFavourite } from '../../utilities/user-interactions-service'
import { useSavedLocations } from '../../contexts/SavedLocationsProvider'

export function SavedLocationItem({ location }) {
    const { loading, setLoading } = useLoading()
    const [address, setAddress] = useState()
    const [isFavourite, setIsFavourite] = useState(location.is_favourite)
    const { savedLocations, setSavedLocations } = useSavedLocations()
    
    useEffect(() => {
        async function fetchAddress(lat, lng) {
            const address = await getAddress(lat, lng)
            setAddress(address)
        }
        fetchAddress(location.locations.lat, location.locations.lng)
    }, [])

    async function handleClickIcon() {
        let updatedLocation
        try {
                const value = !isFavourite;
                updatedLocation = await updateFavourite(value, location.locations.api_id, location.id)
                setIsFavourite(updatedLocation.is_favourite)
        } catch (error) {
            console.error('Error handling icon click', error)
        } finally {
            if (updatedLocation) {
                setSavedLocations(savedLocations.map((location) => {
                    return location.id === updatedLocation.id ? updatedLocation : location
                }))
            }
        }
    }

    return (
        <>
        {!loading ? (
            <div className="d-flex mt-4 align-items-center ">
                <div className="d-flex gap-2">
                    <img className="icon-height link" onClick={() => handleClickIcon('favourite')} src={`/assets/icons/i_saved_${isFavourite ? 'active' : 'inactive'}.png`} disabled={loading} alt={isFavourite ? 'Saved Active' : 'Saved Inactive'} />
                </div>
                <div className="w-100 mx-4">
                    <div className="mb-2 fw-semibold">{address}</div>
                    {location.locations.description && (
                    <div className="mb-2">{location.locations.description}</div>
                    )}
                    <ul>{location.locations.type_names.map((n) => (
                        <li key={n[1]} className="small">{n[1]}</li>
                    ))}</ul>
                    
                    <div className="linebreak rounded opacity-50 mt-4" ></div>
                </div>
            </div>
        ) : (
            <LoadingSpinner />
        )}
        </>
    )
}