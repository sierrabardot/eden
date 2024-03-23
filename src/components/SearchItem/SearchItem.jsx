export function SearchItem({ location, onFaveClick }) {
    const distance = (location.distance * 0.001).toFixed(2);
    return (
        <div className="d-flex my-2 align-items-center ">
        <div className="d-flex m-2">
            <img
            className="icon-height link"
            onClick={onFaveClick}
            src={`/assets/icons/i_saved_${
                location.is_favourite ? "active" : "inactive"
            }.png`}
            alt={location.is_favourite ? "Saved Active" : "Saved Inactive"}
            />
        </div>
        <div className="w-100">
            <div className="d-flex justify-content-between">
            <div className="mx-2">
                {location.locationData.address ? (
                <div className="mb-2">{location.locationData.address}</div>
                ) : (
                <>
                    <div className="mb-2 fw-semibold">
                    {location.locationData.city}, {location.locationData.state}
                    </div>
                </>
                )}
                {location.locationData.description && (
                <div className="mb-2">{location.locationData.description}</div>
                )}
                <ul className="mb-2">
                {location.type_names.map((n) => (
                    <li key={n[1]} className="small">
                    {n[1]}
                    </li>
                ))}
                </ul>
                <div>{distance}km away</div>
            </div>
            </div>
            <div className="linebreak rounded opacity-50 my-2"></div>
        </div>
        </div>
    );
}