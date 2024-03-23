
   
import { useEffect, useState } from "react";
import { getAddress } from "../../utilities/locations-service";

export function SavedLocationItem({ location, onFaveClick }) {
  const [address, setAddress] = useState("");

  useEffect(() => {
    async function fetchAddress(lat, lng) {
      const address = await getAddress(lat, lng);
      setAddress(address);
    }
    fetchAddress(location.locationData.lat, location.locationData.lng);
  }, []);

  return (
    <div className="d-flex mt-4 align-items-center ">
      <div className="d-flex gap-2">
        <img
          className="icon-height link"
          onClick={onFaveClick}
          src={`/assets/icons/i_saved_${
            location.is_favourite ? "active" : "inactive"
          }.png`}
          alt={location.is_favourite ? "Saved Active" : "Saved Inactive"}
        />
      </div>
      <div className="w-100 mx-4">
        <div className="mb-2 fw-semibold">{address}</div>
        {location.locationData.description && (
          <div className="mb-2">{location.locationData.description}</div>
        )}
        <ul>
          {location.locationData.type_names.map((n) => (
            <li key={n[1]} className="small">
              {n[1]}
            </li>
          ))}
        </ul>

        <div className="linebreak rounded opacity-50 mt-4"></div>
      </div>
    </div>
  );
}