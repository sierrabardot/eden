import { useEffect, useState } from 'react'
import { getAddress } from '../../utilities/locations-service'

export function SavedLocationItem({ location }) {
    const [address, setAddress] = useState()
    console.log(location)

    useEffect(() => {
        async function fetchAddress(lat, lng) {
            const address = await getAddress(lat, lng)
            setAddress(address)
    }
    fetchAddress(location.locations.lat, location.locations.lng)
    }, [])

    return (
        <div className="d-flex mt-4 align-items-center ">
            <div className="d-flex gap-2">
                <img className="icon-height" src={location.is_favourite ? '/assets/icons/i_saved_active.png' : '/assets/icons/i_saved_inactive.png'} />
                <img className="icon-height" src={location.is_wishlist ? '/assets/icons/i_heart_active.png' : '/assets/icons/i_heart_inactive.png'} />
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
    )
}