export function SearchItem({ location }) {
    return (
        <div>
            <p>{location.city}</p>
            <p>{location.state}</p>
        </div>
    )
}