import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as locationsService from "../../utilities/locations-service";
import * as userInteractionsService from "../../utilities/user-interactions-service";
import { useSavedLocations } from "../../contexts/SavedLocationsProvider";
import { SavedLocationItem } from "../SavedLocationItem/SavedLocationItem";
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'

export function SavedLocations() {
    const { savedLocations, setSavedLocations } = useSavedLocations();
    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        async function getSavedLocations() {
        try {
            const data = savedLocations.filter((location) => location.is_favourite);
            const apiLocationData = await Promise.all(
            data.map(async (location) => {
                return {
                ...location,
                locationData: await locationsService.getLocationData(
                    location.loc_id
                ),
                };
            })
            );
            const dataWithPlantNames = await Promise.all(
            apiLocationData.map(async (location) => {
                location.locationData.type_names =
                await locationsService.getPlantNames(
                    location.locationData.type_ids
                );
                return location;
            })
            );
            setLoading(false);
            setLocations(dataWithPlantNames);
        } catch (error) {
            console.error(error);
        }
        }

        setLoading(true);
        getSavedLocations();
    }, [savedLocations]);

    async function handleFaveClick(location) {
        console.log(location);
        let updatedFavourite;
        try {
        const value = !location.is_favourite;
        updatedFavourite = await userInteractionsService.updateFavourite(
            value,
            location.id
        );

        setSavedLocations(
            savedLocations.map((location) => {
            return location.id === updatedFavourite.id
                ? updatedFavourite
                : location;
            })
        );
        setLocations((locations) =>
            locations.map((loc) => {
            if (loc !== location) return loc;
            return { ...loc, is_favourite: value };
            })
        );
        } catch (error) {
        console.error("Error handling icon click", error);
        }
    }

    if (loading) return <p><LoadingSpinner /></p>;

    return (
        <div className="m-md-4 mt-4">
        <h2 className="mb-4">Saved Locations</h2>
        <Link to="/map" className="btn btn-success mb-3">
            View on Map
        </Link>
        {locations.map((location) => (
            <SavedLocationItem
            key={location.id}
            location={location}
            onFaveClick={() => {
                handleFaveClick(location);
            }}
            />
        ))}
        </div>
    );
}