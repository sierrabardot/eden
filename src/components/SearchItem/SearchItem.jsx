import { useEffect, useState } from 'react'
import { getAddress } from '../../utilities/locations-service'
import { useSavedLocations } from '../../contexts/SavedLocationsProvider'
import { useLoading } from '../../contexts/LoadingProvider'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'
import { updateFavourite } from '../../utilities/user-interactions-service'

export function SearchItem({ location }) {
    const { savedLocations } = useSavedLocations()
    const [address, setAddress] = useState()
    console.log(location)
    const distance = (location.distance * .001).toFixed(2)
    const [isWishList, setIsWishList] = useState(false)
    const [isFavourite, setIsFavourite] = useState(false)
    const { loading, setLoading } = useLoading()

    useEffect(() => {
        setLoading(true)
        function checkIsSaved() {
            savedLocations.forEach((l) => {
                if (l.locations.api_id === location.id) {
                    l.is_wishlist && setIsWishList(true)
                    l.is_favourite && setIsFavourite(true)
                }
            setLoading(false)
            })
        }
        // async function fetchAddress(lat, lng) {
        //     const address = await getAddress(lat, lng)
        //     setAddress(address)
        //     setLoading(false)
        // }
        // fetchAddress(location.lat, location.lng)
        checkIsSaved()
    }, [])

    async function handleClickIcon(interactionType) {
        try {
            if (interactionType === 'favourite') {
                isFavourite ? setIsFavourite(false) : setIsFavourite(true)
                const value = isFavourite;
                await updateFavourite(apiId, value)
            } else {
                isWishList ? setIsWishList(false) : setIsWishList(true)
                const value = isWishList;
                await updateWishlist(apiId, value)
            }
        } catch (error) {
            console.error('Error handling icon click', error)
        }
    }
    
    return (
        <>
        {!loading ? (
            <div className="d-flex my-2 align-items-center ">
                <div className="d-flex gap-2">
                <img className="icon-height link" onClick={() => handleClickIcon('wishlist')} src={`/assets/icons/i_saved_${isWishList ? 'active' : 'inactive'}.png`} alt={isWishList ? 'Saved Active' : 'Saved Inactive'} />
                
                <img className="icon-height link" onClick={() => handleClickIcon('favourite')} src={`/assets/icons/i_heart_${isFavourite ? 'active' : 'inactive'}.png`} alt={isFavourite ? 'Saved Active' : 'Saved Inactive'} />
                </div>
                <div className="w-100">
                    <div className="d-flex justify-content-between">
                        <div className="mx-2">
                            {/* <div className="mb-2 fw-semibold">{address}</div> */}
                            {location.locationData.description && (
                            <div className="mb-2">{location.locationData.description}</div>
                            )}
                            <ul className="mb-2">{location.type_names.map((n) => (
                                <li key={n[1]} className="small">{n[1]}</li>
                            ))}</ul>
                            <div>{distance}km away</div>
                        </div>
                    </div>
                    <div className="linebreak rounded opacity-50 my-2"></div>
                </div>
            </div>
            ) : (
                <LoadingSpinner />
            )}
        </>
    )
}