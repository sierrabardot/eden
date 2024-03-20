export function SavedLocations({ location }) {
    return (
        <div>
            <p>{location.locations.city}</p>
            <p>{location.locations.state}</p>
            <button className="btn btn-dark" disabled={location.is_wishlist}>Wishlist</button>
            <button className="btn btn-dark" disabled={location.is_favourite}>Favourite</button>
        </div>
    )
}