export function SavedLocationItem({ location }) {

    return (
        <div>
            <p>{location.locations.city}</p>
            <p>{location.locations.state}</p>
            <p>{location.locations.type_names}</p>
            <button className="btn btn-dark" disabled={location.is_wishlist}>Wishlist</button>
            <button className="btn btn-dark" disabled={location.is_favourite}>Favourite</button>
        </div>
    )
}