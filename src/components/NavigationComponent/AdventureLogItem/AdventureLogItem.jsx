export function AdventureLogItem({ record }) {
    console.log(record)

    return (
        <div className="d-flex mt-3 align-items-center ">
            <div className="d-flex gap-2">
                <img className="icon-height" src={record.is_favourite ? '/assets/icons/i_saved_active.png' : '/assets/icons/i_saved_inactive.png'} />
                <img className="icon-height" src={record.is_wishlist ? '/assets/icons/i_heart_active.png' : '/assets/icons/i_heart_inactive.png'} />
            </div>
            <div className="w-100 mx-4">
                <span className="mb-2 fw-semibold">{record.locations.city}</span>
                {record.locations.description && (
                <div className="mb-1">{record.locations.description}</div>
                )}
                <div><span className="fw-semibold">Plants: </span>{record.locations.type_names.map((n) => (
                    <li key={n[1]} className="small">{n[1]}</li>
                ))}</div>
                
                <div className="linebreak rounded opacity-50 mt-4" ></div>
            </div>
        </div>
    )
}