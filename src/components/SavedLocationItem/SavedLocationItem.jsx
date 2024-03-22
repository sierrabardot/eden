import { useEffect, useState } from 'react'
import { getAddress } from '../../utilities/locations-service'
import { useLoading } from '../../contexts/LoadingProvider'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'
import { updateFavourite } from '../../utilities/user-interactions-service'
import { updateWishList } from '../../utilities/user-interactions-service'
import { useSavedLocations } from '../../contexts/SavedLocationsProvider'

export function SavedLocationItem({ location }) {
    const { loading, setLoading } = useLoading()
    const [address, setAddress] = useState()
    const [isWishList, setIsWishList] = useState(location.is_wishlist)
    const [isFavourite, setIsFavourite] = useState(location.is_favourite)
    const { savedLocations, setSavedLocations } = useSavedLocations()
    
    // useEffect(() => {
    //     setLoading(true)
    //     async function fetchAddress(lat, lng) {
    //         const address = await getAddress(lat, lng)
    //         setAddress(address)
    //         setLoading(false)
    //     }
    //     fetchAddress(location.locations.lat, location.locations.lng)
    // }, [])

    async function handleClickIcon(interactionType) {
        setLoading(true)
        let updatedLocation
        try {
            if (interactionType === 'favourite') {
                const value = !isFavourite;
                updatedLocation = await updateFavourite(value, location.locations.api_id, location.id)
                setIsFavourite(updatedLocation.is_favourite)
            } else {
                const value = !isWishList;
                updatedLocation = await updateWishList(value, location.locations.api_id, location.id)
                setIsFavourite(updatedLocation.is_wishlist)
            }
        } catch (error) {
            console.error('Error handling icon click', error)
        } finally {
            if (updatedLocation) {
                setSavedLocations(savedLocations.map((location) => {
                    return location.id === updatedLocation.id ? updatedLocation : location
                }))
            }
            setLoading(false)
        }
    }

    return (
        <>
        {!loading ? (
            <div className="d-flex mt-4 align-items-center ">
                <div className="d-flex gap-2">
                    <img className="icon-height" onClick={() => handleClickIcon('wishlist')} src={`/assets/icons/i_saved_${isWishList ? 'active' : 'inactive'}.png`} disabled={loading} alt={isWishList ? 'Saved Active' : 'Saved Inactive'} />
                    <img className="icon-height" onClick={() => handleClickIcon('favourite')} src={`/assets/icons/i_heart_${isFavourite ? 'active' : 'inactive'}.png`} disabled={loading} alt={isFavourite ? 'Saved Active' : 'Saved Inactive'} />
                </div>
                <div className="w-100 mx-4">
                    {/* <div className="mb-2 fw-semibold">{address}</div> */}
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