import { useEffect, useState } from 'react'
import { getAddress } from '../../utilities/locations-service'
import { useLoading } from '../../contexts/LoadingProvider'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'
import { updateFavourite } from '../../utilities/user-interactions-service'
import { useSavedLocations } from '../../contexts/SavedLocationsProvider'
import { useActiveComp } from '../../contexts/ActiveCompProvider'

export function SavedLocationItem({ location }) {
    const { loading, setLoading } = useLoading()
    // const [address, setAddress] = useState()
    const [isFavourite, setIsFavourite] = useState(location.is_favourite)
    const { savedLocations, setSavedLocations } = useSavedLocations()
    const { setData } = useActiveComp()
    console.log(location)
    
    // useEffect(() => {
    //     async function fetchAddress(lat, lng) {
    //         const address = await getAddress(lat, lng)
    //         setAddress(address)
    //     }
    //     fetchAddress(location.locations.lat, location.locations.lng)
    // }, [])

    async function handleClickIcon() {
        let updatedFavourite
        try {
            const value = !isFavourite;
            updatedFavourite = await updateFavourite(value, location.locations.api_id, location.id)
            setIsFavourite(updatedLocation.is_favourite)
        } catch (error) {
            console.error('Error handling icon click', error)
        } finally {
            if (updatedFavourite) {
                setSavedLocations(savedLocations.map((location) => {
                    return location.id === updatedFavourite.id ? updatedFavourite : location
                }))
                setData('Saved Locations', savedLocations)
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
                            {location.locationData.address ? (
                                <div className="mb-2">{location.locationData.address}</div>
                            ) : (
                                <>
                                    <div className="mb-2 fw-semibold">{location.locationData.city}, {location.locationData.state}</div>
                                </>
                            )}
                    {location.locationData.description && (
                    <div className="mb-2">{location.locationData.description}</div>
                    )}
                    <ul>{location.locationData.type_names.map((n) => (
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