export function AdventureLogItem({ location }) {
    return (
        <div>
            <p>{location.locations.city}</p>
            <p>{location.locations.state}</p>
        </div>
    )
}