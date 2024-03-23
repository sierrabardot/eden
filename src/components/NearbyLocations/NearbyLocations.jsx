import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserLocation } from "../../contexts/UserLocationProvider";
import { SearchItem } from "../SearchItem/SearchItem";
import * as locationsService from "../../utilities/locations-service";
import * as userInteractionsService from "../../utilities/user-interactions-service";
import { useLoading } from "../../contexts/LoadingProvider";
import { useSavedLocations } from "../../contexts/SavedLocationsProvider";
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'

export function NearbyLocations() {
  const { userLocation } = useUserLocation();
  const { setSavedLocations, savedLocations } = useSavedLocations();
  const [locations, setLocations] = useState([]);
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    async function getNearbyLocations(userLocation) {
      try {
        const nearbyLocations = await locationsService.getNearbyLocations(
          userLocation
        );
        const apiLocationData = await Promise.all(
          nearbyLocations.map(async (location) => {
            return {
              ...location,
              locationData: await locationsService.getLocationData(location.id),
            };
          })
        );
        const dataWithPlantNames = await Promise.all(
          apiLocationData.map(async (location) => {
            location.type_names = await locationsService.getPlantNames(
              location.type_ids
            );
            return location;
          })
        );

        dataWithPlantNames.forEach((location) => {
          const savedLocation = savedLocations.find(
            (s) => s.loc_id === location.id
          );
          location.is_favourite = !!savedLocation?.is_favourite;
        });
        setLocations(dataWithPlantNames);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    setLoading(true);
    getNearbyLocations(userLocation);
  }, []);

  async function handleFaveClick(location) {
    let updatedLocation;
    try {
      updatedLocation = await userInteractionsService.addLocationToFavourites(
        location.id
      );
      setSavedLocations(
        savedLocations.map((location) => {
          return location.id === updatedLocation.id
            ? updatedLocation
            : location;
        })
      );
      setLocations((locations) =>
        locations.map((loc) => {
          if (loc !== location) return loc;
          return { ...loc, is_favourite: true };
        })
      );
    } catch (error) {
      console.error("Error adding location:", error.message);
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="m-md-4 my-4">
      <h2 className="mb-4">Find Nearby Locations</h2>
      <Link to="/map" className="btn btn-success mb-3">
        View on Map
      </Link>
      {locations.map((location) => {
        return (
          <SearchItem
            key={location.id}
            location={location}
            onFaveClick={() => handleFaveClick(location)}
          />
        );
      })}
    </div>
  );
}