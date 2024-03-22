import { useEffect, useState } from 'react'
import { getAddress } from '../../../utilities/locations-service'

export function SearchItem({ location }) {
    const [address, setAddress] = useState()
    console.log(location)
    const distance = (location.distance * .001).toFixed(2)

    useEffect(() => {
        async function fetchAddress(lat, lng) {
            const address = await getAddress(lat, lng)
            setAddress(address)
    }
    fetchAddress(location.lat, location.lng)
    }, [])
    
    return (
        <div className="d-flex mt-3 align-items-center ">
            {/* <div className="d-flex gap-2">
                <img className="icon-height" src={record.is_favourite ? '/assets/icons/i_saved_active.png' : '/assets/icons/i_saved_inactive.png'} />
                <img className="icon-height" src={record.is_wishlist ? '/assets/icons/i_heart_active.png' : '/assets/icons/i_heart_inactive.png'} />
            </div> */}
            <div className="w-100">
                <div className="d-flex justify-content-between">
                    <div className="mx-4 col-9">
                        <div className="mb-2 fw-semibold">{address}</div>
                        {location.locationData.description && (
                        <div className="mb-2">{location.locationData.description}</div>
                        )}
                        <ul className="mb-2">{location.type_names.map((n) => (
                            <li key={n[1]} className="small">{n[1]}</li>
                        ))}</ul>
                        <div>{distance}km away</div>
                    </div>
                        <div className="btn btn-primary col-2 align-self-end">Add Visit</div>
                </div>
                <div className="linebreak rounded opacity-50 mt-4"></div>
            </div>
        </div>
    )
}