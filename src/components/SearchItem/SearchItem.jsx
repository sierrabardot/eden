import { useEffect, useState } from 'react'
// import { getAddress } from '../../utilities/locations-service'
import { useSavedLocations } from '../../contexts/SavedLocationsProvider'
import { useLoading } from '../../contexts/LoadingProvider'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'
import * as userInteractionsService from '../../utilities/user-interactions-service'

export function SearchItem({ location }) {
    const { setSavedLocations, savedLocations } = useSavedLocations()
    // const [address, setAddress] = useState()
    const distance = (location.distance * .001).toFixed(2)
    const [isFavourite, setIsFavourite] = useState(false)
    const { loading, setLoading } = useLoading()

    useEffect(() => {
        setLoading(true)
        function checkIsSaved() {
            savedLocations.forEach((l) => {
                if (l.locations.api_id === location.id) {
                    l.is_favourite && setIsFavourite(true)
                }
            setLoading(false)
            })
        }
        // Having issue with rate limit when fetching too many addresses. For now, use data directly from database
        // async function fetchAddress(lat, lng) {
        //     const address = await getAddress(lat, lng)
        //     setAddress(address)
        //     setLoading(false)
        // }
        // fetchAddress(location.lat, location.lng)
        checkIsSaved()
    }, [])

    async function handleClickIcon(interactionType) {
        let newLocation;
        try {
            newLocation = await userInteractionsService.addLocation(location.id, interactionType);
        } catch (error) {
            console.error('Error adding location:', error.message);
        } finally {
            if (newLocation) {
                setSavedLocations(savedLocations.map((location) => {
                    return location.id === newLocation.id ? newLocation : location
                }))
            }
            setLoading(false)
        }
    }
    
    return (
        <>
        {!loading ? (
            <div className="d-flex my-2 align-items-center ">
                <div className="d-flex m-2">
                <img className="icon-height link" onClick={() => handleClickIcon('favourite')} src={`/assets/icons/i_saved_${isFavourite ? 'active' : 'inactive'}.png`} alt={isFavourite ? 'Saved Active' : 'Saved Inactive'} />
                </div>
                <div className="w-100">
                    <div className="d-flex justify-content-between">
                        <div className="mx-2">
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