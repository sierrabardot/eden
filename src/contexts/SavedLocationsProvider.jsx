import { createContext, useContext, useState, useEffect } from 'react';
import * as locationsService from '../utilities/locations-service';

const SavedLocationsContext = createContext({});

export const SavedLocationsProvider = ({ children }) => {
    const [savedLocations, setSavedLocations] = useState([]);

    useEffect(() => {
        const fetchSavedLocations = async () => {
            const locations = await locationsService.getSavedLocations();
            setSavedLocations(locations);
        };
        fetchSavedLocations();
    }, []);
    console.log('Set locations provider: ', savedLocations)

    return (
        <SavedLocationsContext.Provider value={{ savedLocations, setSavedLocations }}>
            {children}
        </SavedLocationsContext.Provider>
    );
};

export const useSavedLocations = () => {
    return useContext(SavedLocationsContext);
};